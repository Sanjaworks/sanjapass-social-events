
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { staffService } from '@/services/staffService';
import { StaffMember } from '@/interfaces/staff';

interface StaffModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  events: any[];
  staff?: StaffMember;
  onSuccess: () => void;
}

export const StaffModal = ({
  open,
  onOpenChange,
  events,
  staff,
  onSuccess,
}: StaffModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventId: '',
    role: 'operator' as 'supervisor' | 'operator',
    isActive: true,
  });

  useEffect(() => {
    if (staff) {
      setFormData({
        name: staff.name,
        email: staff.email,
        phone: staff.phone || '',
        eventId: staff.eventId,
        role: staff.role,
        isActive: staff.isActive,
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventId: events.length > 0 ? events[0].id : '',
        role: 'operator',
        isActive: true,
      });
    }
  }, [staff, open, events]);

  const generateTemporaryPassword = () => {
    return Math.random().toString(36).slice(-8);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (staff) {
        await staffService.updateStaffMember(staff.id, formData);
        toast({
          title: 'Staff atualizado',
          description: 'As informações do membro da equipe foram atualizadas.',
        });
      } else {
        const newStaff = await staffService.createStaffMember(formData.eventId, formData);
        const temporaryPassword = generateTemporaryPassword();
        
        // Enviar credenciais por email
        await staffService.sendStaffCredentials(newStaff, temporaryPassword);
        
        toast({
          title: 'Membro da equipe criado',
          description: `Credenciais enviadas para ${formData.email}`,
        });
      }

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Ocorreu um erro ao salvar as informações.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {staff ? 'Editar Membro da Equipe' : 'Novo Membro da Equipe'}
          </DialogTitle>
          <DialogDescription>
            {staff 
              ? 'Edite as informações do membro da equipe.' 
              : 'Adicione um novo membro à equipe de check-in do evento.'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Nome do membro da equipe"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="email@exemplo.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="(00) 00000-0000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="event">Evento</Label>
            <Select
              value={formData.eventId}
              onValueChange={(value) => setFormData({ ...formData, eventId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um evento" />
              </SelectTrigger>
              <SelectContent>
                {events.map((event) => (
                  <SelectItem key={event.id} value={event.id}>
                    {event.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Função</Label>
            <Select
              value={formData.role}
              onValueChange={(value: 'supervisor' | 'operator') => setFormData({ ...formData, role: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="operator">Operador</SelectItem>
                <SelectItem value="supervisor">Supervisor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
            />
            <Label htmlFor="isActive">Membro ativo</Label>
          </div>

          {!staff && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                <strong>Importante:</strong> Após criar o membro da equipe, 
                as credenciais de acesso serão enviadas automaticamente por email.
              </p>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : staff ? 'Atualizar' : 'Criar e Enviar Credenciais'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
