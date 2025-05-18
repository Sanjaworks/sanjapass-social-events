
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

const AlertsPage = () => {
  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Alertas de Segurança</h1>
          <p className="text-gray-600">Monitore alertas de eventos suspeitos e atividades anômalas</p>
        </div>
        
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle>Alertas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium">Módulo em desenvolvimento</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Esta funcionalidade estará disponível em breve
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AlertsPage;
