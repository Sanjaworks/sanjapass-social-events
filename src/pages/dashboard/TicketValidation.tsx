
import { useState, useEffect } from 'react';
import { Search, CheckCircle, XCircle, AlertTriangle, Eye, Ban } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface TicketValidation {
  id: string;
  ticketCode: string;
  participantName: string;
  eventName: string;
  ticketType: string;
  purchaseDate: string;
  status: 'valid' | 'used' | 'invalid' | 'cancelled';
  checkInDate?: string;
  staffName?: string;
}

const TicketValidation = () => {
  const { toast } = useToast();
  const [tickets, setTickets] = useState<TicketValidation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<TicketValidation | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock data
  useEffect(() => {
    const mockTickets: TicketValidation[] = [
      {
        id: '1',
        ticketCode: 'TKT-2025-001',
        participantName: 'João Silva',
        eventName: 'Festival de Música 2025',
        ticketType: 'VIP',
        purchaseDate: '2025-03-10T15:30:00',
        status: 'valid',
      },
      {
        id: '2',
        ticketCode: 'TKT-2025-002',
        participantName: 'Maria Santos',
        eventName: 'Festival de Música 2025',
        ticketType: 'Pista',
        purchaseDate: '2025-03-12T10:20:00',
        status: 'used',
        checkInDate: '2025-03-15T18:45:00',
        staffName: 'Pedro Oliveira',
      },
      {
        id: '3',
        ticketCode: 'TKT-2025-003',
        participantName: 'Carlos Rocha',
        eventName: 'Festival de Música 2025',
        ticketType: 'Pista',
        purchaseDate: '2025-03-08T14:15:00',
        status: 'cancelled',
      },
    ];
    setTickets(mockTickets);
  }, []);

  const validateTicket = async (ticketCode: string) => {
    setLoading(true);
    try {
      // Simular validação
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const ticket = tickets.find(t => 
        t.ticketCode.toLowerCase().includes(ticketCode.toLowerCase())
      );

      if (ticket) {
        setSelectedTicket(ticket);
        setDetailsOpen(true);
      } else {
        toast({
          variant: 'destructive',
          title: 'Ingresso não encontrado',
          description: 'Código de ingresso inválido ou não existe.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro na validação',
        description: 'Não foi possível validar o ingresso.',
      });
    } finally {
      setLoading(false);
    }
  };

  const invalidateTicket = async (ticketId: string) => {
    if (confirm('Tem certeza que deseja invalidar este ingresso?')) {
      try {
        setTickets(tickets.map(t => 
          t.id === ticketId ? { ...t, status: 'invalid' as const } : t
        ));
        toast({
          title: 'Ingresso invalidado',
          description: 'O ingresso foi marcado como inválido.',
        });
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Erro ao invalidar',
          description: 'Não foi possível invalidar o ingresso.',
        });
      }
    }
  };

  const revalidateTicket = async (ticketId: string) => {
    try {
      setTickets(tickets.map(t => 
        t.id === ticketId ? { ...t, status: 'valid' as const } : t
      ));
      toast({
        title: 'Ingresso revalidado',
        description: 'O ingresso foi marcado como válido novamente.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao revalidar',
        description: 'Não foi possível revalidar o ingresso.',
      });
    }
  };

  const getStatusBadge = (status: TicketValidation['status']) => {
    const config = {
      valid: { label: 'Válido', variant: 'default' as const, icon: CheckCircle },
      used: { label: 'Utilizado', variant: 'secondary' as const, icon: CheckCircle },
      invalid: { label: 'Inválido', variant: 'destructive' as const, icon: XCircle },
      cancelled: { label: 'Cancelado', variant: 'outline' as const, icon: Ban },
    };
    
    const { label, variant, icon: Icon } = config[status];
    return (
      <Badge variant={variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {label}
      </Badge>
    );
  };

  const filteredTickets = tickets.filter(ticket =>
    ticket.ticketCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.eventName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  return (
    <>
      <DashboardLayout userType="organizer">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Validação de Ingressos</h1>
            <p className="text-gray-600 mt-1">Gerencie e valide ingressos dos seus eventos</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total de Ingressos</p>
                  <h3 className="text-2xl font-bold">{tickets.length}</h3>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Válidos</p>
                  <h3 className="text-2xl font-bold text-green-600">
                    {tickets.filter(t => t.status === 'valid').length}
                  </h3>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Utilizados</p>
                  <h3 className="text-2xl font-bold text-blue-600">
                    {tickets.filter(t => t.status === 'used').length}
                  </h3>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Inválidos</p>
                  <h3 className="text-2xl font-bold text-red-600">
                    {tickets.filter(t => t.status === 'invalid' || t.status === 'cancelled').length}
                  </h3>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </div>
          </div>

          {/* Search and Validation */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Validar Ingresso</h2>
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Digite o código do ingresso para validar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && searchTerm.trim()) {
                      validateTicket(searchTerm.trim());
                    }
                  }}
                />
              </div>
              <Button 
                onClick={() => validateTicket(searchTerm.trim())}
                disabled={!searchTerm.trim() || loading}
              >
                <Search className="h-4 w-4 mr-2" />
                {loading ? 'Validando...' : 'Validar'}
              </Button>
            </div>
          </div>

          {/* Tickets Table */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Histórico de Ingressos</h2>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Participante</TableHead>
                  <TableHead>Evento</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data de Compra</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell>
                      <div className="font-mono text-sm">{ticket.ticketCode}</div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{ticket.participantName}</div>
                    </TableCell>
                    <TableCell>{ticket.eventName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{ticket.ticketType}</Badge>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(ticket.status)}
                    </TableCell>
                    <TableCell>{formatDate(ticket.purchaseDate)}</TableCell>
                    <TableCell>
                      {ticket.checkInDate ? (
                        <div className="text-sm">
                          <div>{formatDate(ticket.checkInDate)}</div>
                          <div className="text-gray-500">{ticket.staffName}</div>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedTicket(ticket);
                            setDetailsOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {ticket.status === 'valid' || ticket.status === 'used' ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => invalidateTicket(ticket.id)}
                          >
                            <Ban className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => revalidateTicket(ticket.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredTickets.length === 0 && (
              <div className="text-center py-12">
                <AlertTriangle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum ingresso encontrado</h3>
                <p className="text-gray-500">Nenhum ingresso corresponde aos critérios de busca.</p>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>

      {/* Ticket Details Modal */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Detalhes do Ingresso</DialogTitle>
            <DialogDescription>
              Informações completas sobre o ingresso selecionado.
            </DialogDescription>
          </DialogHeader>

          {selectedTicket && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Código</label>
                  <div className="font-mono text-sm">{selectedTicket.ticketCode}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <div>{getStatusBadge(selectedTicket.status)}</div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Participante</label>
                <div className="font-medium">{selectedTicket.participantName}</div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Evento</label>
                <div>{selectedTicket.eventName}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Tipo de Ingresso</label>
                  <div>{selectedTicket.ticketType}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Data de Compra</label>
                  <div className="text-sm">{formatDate(selectedTicket.purchaseDate)}</div>
                </div>
              </div>

              {selectedTicket.checkInDate && (
                <div className="border-t pt-4">
                  <label className="text-sm font-medium text-gray-500">Informações de Check-in</label>
                  <div className="mt-1">
                    <div className="text-sm">{formatDate(selectedTicket.checkInDate)}</div>
                    <div className="text-sm text-gray-500">Staff: {selectedTicket.staffName}</div>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-4">
                {selectedTicket.status === 'valid' || selectedTicket.status === 'used' ? (
                  <Button
                    variant="destructive"
                    onClick={() => {
                      invalidateTicket(selectedTicket.id);
                      setDetailsOpen(false);
                    }}
                  >
                    <Ban className="h-4 w-4 mr-2" />
                    Invalidar
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      revalidateTicket(selectedTicket.id);
                      setDetailsOpen(false);
                    }}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Revalidar
                  </Button>
                )}
                <Button variant="outline" onClick={() => setDetailsOpen(false)}>
                  Fechar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TicketValidation;
