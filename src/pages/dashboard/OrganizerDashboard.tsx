
import { useState } from 'react';
import { Calendar, Users, DollarSign, LineChart, Clock } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { events } from '@/data/mockData';

const OrganizerDashboard = () => {
  // For a real implementation, we'd fetch this data from an API
  const totalEvents = events.length;
  const totalTicketsSold = events.reduce(
    (acc, event) => acc + event.tickets.reduce((sum, ticket) => sum + (ticket.quantity - ticket.remaining), 0),
    0
  );
  const totalRevenue = events.reduce(
    (acc, event) => acc + event.tickets.reduce((sum, ticket) => sum + ((ticket.quantity - ticket.remaining) * ticket.price), 0),
    0
  );
  
  return (
    <DashboardLayout userType="organizer">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-2">Painel do Organizador</h1>
          <p className="text-gray-600">
            Gerencie seus eventos, acompanhe vendas e administre ingressos.
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total de Eventos</p>
                <h3 className="text-3xl font-bold">{totalEvents}</h3>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <Calendar className="h-7 w-7 text-primary" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Ingressos Vendidos</p>
                <h3 className="text-3xl font-bold">{totalTicketsSold}</h3>
              </div>
              <div className="bg-secondary/10 p-3 rounded-full">
                <Users className="h-7 w-7 text-secondary" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Faturamento Total</p>
                <h3 className="text-3xl font-bold">R$ {totalRevenue.toFixed(2).replace('.', ',')}</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-7 w-7 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Próximo Evento</p>
                <h3 className="text-lg font-bold truncate">
                  {events[0]?.title || 'Nenhum evento'}
                </h3>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Clock className="h-7 w-7 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Sales Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Vendas de Ingressos</h2>
            <div>
              <select className="input-field text-sm">
                <option value="7d">Últimos 7 dias</option>
                <option value="30d">Últimos 30 dias</option>
                <option value="90d">Últimos 90 dias</option>
              </select>
            </div>
          </div>
          
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <LineChart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                Gráfico de vendas de ingressos seria exibido aqui.
              </p>
            </div>
          </div>
        </div>
        
        {/* Events Table */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Meus Eventos</h2>
            <button className="btn-primary py-2 px-4">
              Novo Evento
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Evento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vendas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {events.map((event) => {
                  const ticketsSold = event.tickets.reduce(
                    (sum, ticket) => sum + (ticket.quantity - ticket.remaining), 
                    0
                  );
                  const totalTickets = event.tickets.reduce(
                    (sum, ticket) => sum + ticket.quantity, 
                    0
                  );
                  const eventDate = new Date(event.date);
                  const today = new Date();
                  
                  let status;
                  if (eventDate < today) {
                    status = 'Concluído';
                    statusClass = 'bg-gray-100 text-gray-800';
                  } else if (ticketsSold >= totalTickets) {
                    status = 'Esgotado';
                    statusClass = 'bg-red-100 text-red-800';
                  } else {
                    status = 'Ativo';
                    statusClass = 'bg-green-100 text-green-800';
                  }
                  
                  let statusClass;
                  
                  return (
                    <tr key={event.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{event.title}</div>
                        <div className="text-sm text-gray-500">{event.location.city}, {event.location.state}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {event.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          {ticketsSold} / {totalTickets} ingressos
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div 
                            className="bg-primary h-1.5 rounded-full" 
                            style={{ width: `${(ticketsSold / totalTickets) * 100}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          status === 'Ativo' ? 'bg-green-100 text-green-800' :
                          status === 'Esgotado' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href={`/organizer/events/${event.id}`} className="text-primary hover:text-primary/80 mr-4">
                          Editar
                        </a>
                        <a href={`/organizer/events/${event.id}/attendees`} className="text-secondary hover:text-secondary/80">
                          Participantes
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OrganizerDashboard;
