import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, Users, Image } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import EventCard from '@/components/events/EventCard';
import { HeroParallax } from '@/components/blocks/hero-parallax';
import { events, Event } from '@/data/mockData';

const Index = () => {
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);
  
  useEffect(() => {
    // Simulate fetching events
    setFeaturedEvents(events);
  }, []);
  
  // Convert events to the HeroParallax expected format
  const heroProducts = events.map(event => ({
    title: event.title,
    link: `/events/${event.id}`,
    thumbnail: event.bannerUrl
  }));
  
  // Fill with more items if needed to have 15 items
  const fillerItems = [
    {
      title: "SanjaPass Festival",
      link: "/events",
      thumbnail: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1770&auto=format&fit=crop"
    },
    {
      title: "Shows de Verão",
      link: "/events",
      thumbnail: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1770&auto=format&fit=crop"
    },
    {
      title: "Feira Gastronômica",
      link: "/events",
      thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1770&auto=format&fit=crop"
    }
  ];
  
  const products = [...heroProducts];
  while (products.length < 15) {
    products.push(fillerItems[products.length % fillerItems.length]);
  }
  
  return (
    <MainLayout>
      {/* Hero Parallax Section - Directly below header */}
      <HeroParallax products={products} />
      
      <div className="mt-[140vh]"> {/* Space for the parallax */}
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Como funciona o SanjaPass</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="flex flex-col items-center text-center p-6 animate-fadeIn">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <CalendarCheck className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Escolha seu evento</h3>
                <p className="text-gray-600">
                  Navegue por eventos de diversos tipos e compre ingressos com praticidade e segurança.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Viva a experiência</h3>
                <p className="text-gray-600">
                  Aproveite o evento com entrada facilitada via QR Code e acompanhamento em tempo real.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <Image className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Compartilhe momentos</h3>
                <p className="text-gray-600">
                  Publique suas fotos na nossa galeria social e faça parte da comunidade SanjaPass.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Events */}
        <section className="py-16 bg-page">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Eventos em destaque</h2>
              <Link to="/events" className="text-primary hover:text-primary/80 font-medium">
                Ver todos
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            
            {featuredEvents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Carregando eventos...</p>
              </div>
            )}
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-secondary text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 md:max-w-xl">
                <h2 className="text-3xl font-bold mb-4">Você é um organizador de eventos?</h2>
                <p className="text-xl mb-6">
                  Gerencie seus eventos, venda ingressos e acompanhe check-ins em tempo real com SanjaPass.
                </p>
                <Link to="/organizers" className="btn-primary py-3 px-6">
                  Saiba mais
                </Link>
              </div>
              
              <div className="w-full md:w-auto">
                <img 
                  src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                  alt="Organizadores de eventos" 
                  className="rounded-lg shadow-lg w-full md:w-80 lg:w-96 h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
