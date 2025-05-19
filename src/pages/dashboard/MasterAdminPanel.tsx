
import { useNavigate } from 'react-router-dom';
import { 
  Users, DollarSign, CheckCircle, FileText, 
  AlertTriangle, BarChart2, Calendar
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const MasterAdminPanel = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Estatísticas mock para o dashboard
  const stats = {
    totalUsers: 8562,
    activeOrganizers: 124,
    pendingApprovals: 37,
    totalRevenue: 284750.56,
    commissions: 28475.05,
    alertsCount: 5,
    eventsThisMonth: 42
  };

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Painel Administrativo Master</h1>
            <p className="text-gray-600 mt-1">
              Bem-vindo(a), {user?.name || 'Administrador'}
            </p>
          </div>
          <img 
            src={user?.photoUrl || 'https://i.pravatar.cc/150'} 
            alt={user?.name || 'Admin'}
            className="w-16 h-16 rounded-full border-4 border-primary"
          />
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Usuários Totais</p>
                <h3 className="text-2xl font-bold mt-1">{stats.totalUsers.toLocaleString('pt-BR')}</h3>
              </div>
              <div className="rounded-full p-3 bg-blue-100">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Organizadores Ativos</p>
                <h3 className="text-2xl font-bold mt-1">{stats.activeOrganizers}</h3>
              </div>
              <div className="rounded-full p-3 bg-green-100">
                <Users className="w-5 h-5 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Eventos Aguardando</p>
                <h3 className="text-2xl font-bold mt-1">{stats.pendingApprovals}</h3>
              </div>
              <div className="rounded-full p-3 bg-yellow-100">
                <CheckCircle className="w-5 h-5 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Eventos este Mês</p>
                <h3 className="text-2xl font-bold mt-1">{stats.eventsThisMonth}</h3>
              </div>
              <div className="rounded-full p-3 bg-purple-100">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Admin Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-1 md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Gerenciar Organizadores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Aprovar novos organizadores, visualizar estatísticas e gerenciar permissões.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total de Organizadores</span>
                  <span className="font-medium">{stats.activeOrganizers}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Aguardando Aprovação</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Novos no Último Mês</span>
                  <span className="font-medium">24</span>
                </div>
              </div>
              <Button className="w-full mt-4" onClick={() => navigate('/master/organizers')}>
                Ver Todos
              </Button>
            </CardContent>
          </Card>
          
          <Card className="col-span-1 md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Comissões e Financeiro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Acompanhe receitas, comissões e transações financeiras da plataforma.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Faturamento Total</span>
                  <span className="font-medium">R$ {stats.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Comissões</span>
                  <span className="font-medium">R$ {stats.commissions.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Repasses (Mês)</span>
                  <span className="font-medium">32</span>
                </div>
              </div>
              <Button className="w-full mt-4" onClick={() => navigate('/master/financial')}>
                Ver Dashboard
              </Button>
            </CardContent>
          </Card>
          
          <Card className="col-span-1 md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Aprovar Eventos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Revisar e aprovar novos eventos submetidos pelos organizadores.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Aguardando Aprovação</span>
                  <span className="font-medium">{stats.pendingApprovals}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Aprovados Hoje</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Rejeitados (Semana)</span>
                  <span className="font-medium">5</span>
                </div>
              </div>
              <Button className="w-full mt-4" onClick={() => navigate('/master/approve')}>
                Ver Pendentes
              </Button>
            </CardContent>
          </Card>
          
          <Card className="col-span-1 md:col-span-3">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Sistema Financeiro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium mb-2 flex items-center">
                    <BarChart2 className="w-4 h-4 mr-2" />
                    Dashboard Financeiro
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Visão geral das finanças, gráficos e métricas importantes.
                  </p>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/master/financial')}>
                    Visualizar
                  </Button>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium mb-2 flex items-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Transações
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Gerenciar todas as transações financeiras realizadas na plataforma.
                  </p>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/master/transactions')}>
                    Visualizar
                  </Button>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium mb-2 flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Repasses aos Organizadores
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Gerenciar pagamentos e repasses financeiros para organizadores.
                  </p>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/master/payouts')}>
                    Visualizar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1 md:col-span-3">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Relatórios e Análises
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium mb-2 flex items-center">
                    <BarChart2 className="w-4 h-4 mr-2" />
                    Relatórios por Cidade
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Visualize estatísticas e performance por cidade e região.
                  </p>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/master/reports?filter=city')}>
                    Visualizar
                  </Button>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Relatórios por Data
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Analise tendências por período e sazonalidade.
                  </p>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/master/reports?filter=date')}>
                    Visualizar
                  </Button>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium mb-2 flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Relatórios por Tipo de Evento
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Compare performance entre categorias e tipos de eventos.
                  </p>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/master/reports?filter=type')}>
                    Visualizar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1 md:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Alertas de Segurança
              </CardTitle>
              <div className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {stats.alertsCount} novos alertas
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-red-50 p-3 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-1" />
                    <div>
                      <h4 className="font-medium">Transações suspeitas detectadas</h4>
                      <p className="text-sm text-gray-600">
                        Múltiplas compras de ingressos com o mesmo cartão em eventos diferentes
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Ver</Button>
                </div>
                
                <div className="flex items-center justify-between bg-yellow-50 p-3 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-1" />
                    <div>
                      <h4 className="font-medium">Evento com descrição questionável</h4>
                      <p className="text-sm text-gray-600">
                        Evento "Festa Secreta" contém detalhes imprecisos e potencialmente suspeitos
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Ver</Button>
                </div>
                
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-gray-600 mt-1" />
                    <div>
                      <h4 className="font-medium">Organizador com reportes negativos</h4>
                      <p className="text-sm text-gray-600">
                        3 usuários reportaram problemas com o organizador "Festas Elite"
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Ver</Button>
                </div>
              </div>
              
              <Button 
                className="w-full mt-4" 
                variant="outline" 
                onClick={() => navigate('/master/alerts')}
              >
                Ver Todos os Alertas
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MasterAdminPanel;
