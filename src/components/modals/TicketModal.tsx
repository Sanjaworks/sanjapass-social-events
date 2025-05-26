
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Ticket } from '@/interfaces/organizer';
import { organizerService } from '@/services/organizerService';

const ticketSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  description: z.string().optional(),
  price: z.number().min(0, 'Preço deve ser maior que zero'),
  quantity: z.number().min(1, 'Quantidade deve ser maior que zero'),
  batch: z.string().min(1, 'Lote é obrigatório'),
  salesStart: z.string().min(1, 'Data de início é obrigatória'),
  salesEnd: z.string().min(1, 'Data de fim é obrigatória'),
  category: z.enum(['standard', 'vip', 'early-bird', 'student', 'group']),
});

type TicketFormData = z.infer<typeof ticketSchema>;

interface TicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  eventId: string;
  ticket?: Ticket;
  onSuccess: () => void;
}

export const TicketModal = ({ open, onOpenChange, eventId, ticket, onSuccess }: TicketModalProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      name: ticket?.name || '',
      description: ticket?.description || '',
      price: ticket?.price || 0,
      quantity: ticket?.quantity || 0,
      batch: ticket?.batch || '1º Lote',
      salesStart: ticket?.salesStart ? new Date(ticket.salesStart).toISOString().slice(0, 16) : '',
      salesEnd: ticket?.salesEnd ? new Date(ticket.salesEnd).toISOString().slice(0, 16) : '',
      category: ticket?.category || 'standard',
    },
  });

  const onSubmit = async (data: TicketFormData) => {
    setLoading(true);
    try {
      const ticketData = {
        ...data,
        remaining: data.quantity,
        isActive: true,
      };

      if (ticket) {
        await organizerService.updateTicket(ticket.id, ticketData);
        toast({
          title: 'Ingresso atualizado',
          description: 'O ingresso foi atualizado com sucesso.',
        });
      } else {
        await organizerService.createTicket(eventId, ticketData);
        toast({
          title: 'Ingresso criado',
          description: 'O ingresso foi criado com sucesso.',
        });
      }
      
      onSuccess();
      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao salvar',
        description: 'Ocorreu um erro ao salvar o ingresso.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {ticket ? 'Editar Ingresso' : 'Novo Ingresso'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Ingresso</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Pista" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="standard">Padrão</SelectItem>
                        <SelectItem value="vip">VIP</SelectItem>
                        <SelectItem value="early-bird">Promoção</SelectItem>
                        <SelectItem value="student">Estudante</SelectItem>
                        <SelectItem value="group">Grupo</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descrição do ingresso e benefícios inclusos"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço (R$)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01"
                        placeholder="0,00"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantidade</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        placeholder="100"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="batch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lote</FormLabel>
                    <FormControl>
                      <Input placeholder="1º Lote" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="salesStart"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Início das Vendas</FormLabel>
                    <FormControl>
                      <Input 
                        type="datetime-local"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="salesEnd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fim das Vendas</FormLabel>
                    <FormControl>
                      <Input 
                        type="datetime-local"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Salvando...' : ticket ? 'Atualizar' : 'Criar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
