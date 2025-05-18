
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Calendar, Clock, Users, Image, Info } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import MainLayout from '@/components/layout/MainLayout';
import EventDetailHero from '@/components/events/EventDetailHero';
import TicketList from '@/components/events/TicketList';
import PhotoGrid from '@/components/gallery/PhotoGrid';
import { events, Event } from '@/data/mockData';

const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'tickets' | 'gallery'>('info');
  
  useEffect(() => {
    // Simulate API fetch for event detail
    const foundEvent = events.find((e) => e.id === id);
    if (foundEvent) {
      setEvent(foundEvent);
    }
  }, [id]);
  
  if (!event) {
    return (
      <MainLayout>
        <div className="min-h-[50vh] flex items-center justify-center">
          <p className="text-gray-500">Carregando detalhes do evento...</p>
        </div>
      </MainLayout>
    );
  }
  
  // Format date
  const formattedDate = format(new Date(event.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  
  return (
    <MainLayout>
      <EventDetailHero event={event} />
      
      <div className="container mx-auto px-4 pb-16">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mt-6 mb-8">
          <button
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'info'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('info')}
          >
            <div className="flex items-center">
              <Info className="h-4 w-4 mr-2" />
              Sobre
            </div>
          </button>
          
          <button
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'tickets'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('tickets')}
          >
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Ingressos
            </div>
          </button>
          
          <button
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'gallery'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('gallery')}
          >
            <div className="flex items-center">
              <Image className="h-4 w-4 mr-2" />
              Galeria
            </div>
          </button>
        </div>
        
        {/* Tab Content */}
        <div>
          {/* Info Tab */}
          {activeTab === 'info' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-6">Sobre o evento</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
              
              <div className="bg-white shadow-md rounded-lg p-6 h-fit">
                <h3 className="text-lg font-semibold mb-4">Detalhes</h3>
                
                <div className="space-y-4">
                  <div className="flex">
                    <Calendar className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <p className="text-sm font-medium">Data</p>
                      <p className="text-gray-600">{formattedDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <Clock className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <p className="text-sm font-medium">Horário</p>
                      <p className="text-gray-600">{event.startTime} - {event.endTime}</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <MapPin className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <p className="text-sm font-medium">Local</p>
                      <p className="text-gray-600">{event.location.name}</p>
                      <p className="text-gray-600 text-sm">{event.location.address}</p>
                      <p className="text-gray-600 text-sm">{event.location.city}, {event.location.state}</p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <Users className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <p className="text-sm font-medium">Organizador</p>
                      <p className="text-gray-600">{event.organizer.name}</p>
                    </div>
                  </div>
                </div>
                
                {/* Simple Map Placeholder */}
                <div className="mt-6 bg-gray-200 rounded-lg overflow-hidden">
                  <img 
                    src={`https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-s+F7931E(${event.location.coordinates.lng},${event.location.coordinates.lat})/${event.location.coordinates.lng},${event.location.coordinates.lat},13,0/400x200@2x?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw`}
                    alt="Mapa do local"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}
          
          {/* Tickets Tab */}
          {activeTab === 'tickets' && (
            <TicketList tickets={event.tickets} eventId={event.id} />
          )}
          
          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Galeria de fotos</h2>
                {event.gallery.length > 0 ? (
                  <PhotoGrid photos={event.gallery} />
                ) : (
                  <p className="text-gray-500 text-center py-12">
                    Ainda não há fotos para este evento.
                  </p>
                )}
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-4">Compartilhe suas melhores fotos</h3>
                <p className="text-gray-600 mb-4">
                  Participe da galeria social do SanjaPass enviando suas fotos deste evento.
                </p>
                <button className="btn-primary py-2 px-6">
                  Enviar foto
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default EventDetailPage;
