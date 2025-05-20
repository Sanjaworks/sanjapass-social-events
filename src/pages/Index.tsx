
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, Users, Image, Instagram, Camera } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import EventCard from '@/components/events/EventCard';
import { HeroParallax } from '@/components/blocks/hero-parallax';
import { events, Event } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { TestimonialsSection } from '@/components/ui/testimonials-with-marquee';
import { EventCategories } from '@/components/ui/event-categories';

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
  
  // Fill with more items if needed to have enough items for duplication
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

  // Mock photos for the Instagram-like feed
  const instaSanjaPhotos = [
    {
      id: 1,
      imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1770&auto=format&fit=crop",
      user: "maria_silva",
      likes: 124,
      eventName: "Rock in Rio"
    },
    {
      id: 2,
      imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1770&auto=format&fit=crop",
      user: "joao_santos",
      likes: 89,
      eventName: "Festival de Verão"
    },
    {
      id: 3,
      imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1770&auto=format&fit=crop",
      user: "ana_costa",
      likes: 156,
      eventName: "Feira Gastronômica"
    },
    {
      id: 4,
      imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1770&auto=format&fit=crop",
      user: "carlos_oliveira",
      likes: 72,
      eventName: "Exposição de Arte"
    },
  ];
  
  // Testimonial data
  const testimonials = [
    {
      author: {
        name: "Mariana Alves",
        handle: "@marialves",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
      },
      text: "O SanjaPass facilitou muito minha vida! Comprei ingressos para 3 eventos diferentes e o processo foi super rápido. Recomendo demais!",
      href: "#"
    },
    {
      author: {
        name: "Ricardo Santos",
        handle: "@ricardinho",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      text: "Como organizador de eventos, o SanjaPass me ajudou a aumentar a visibilidade e as vendas dos meus eventos. A plataforma é incrível!",
      href: "#"
    },
    {
      author: {
        name: "Juliana Ferreira",
        handle: "@juhferreira",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
      },
      text: "Adoro poder compartilhar fotos dos eventos e ver o que outras pessoas estão curtindo. A parte social do SanjaPass é demais!"
    }
  ];

  return (
    <MainLayout>
      {/* Hero Parallax Section - Directly below header */}
      <HeroParallax products={products} />
      
      {/* Event Categories - Now directly below hero */}
      <EventCategories />
      
      <div>
        {/* Featured Events */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Eventos em destaque</h2>
              <Link to="/events" className="text-primary hover:text-primary/80 font-medium">
                Ver todos
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.slice(0, 6).map((event) => (
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
        
        {/* Features Section - How SanjaPass Works */}
        <section className="py-16 bg-page">
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
            
            <div className="mt-10 text-center">
              <Link to="/como-funciona">
                <Button variant="outline" size="lg">
                  Veja como funciona
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section - Moved after How SanjaPass Works */}
        <TestimonialsSection
          title="O que nossos usuários dizem"
          description="Junte-se a milhares de pessoas que já aproveitam a melhor experiência em eventos"
          testimonials={testimonials}
        />
        
        {/* Organizer CTA Section */}
        <section className="py-16 bg-[#f0f0ff]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="flex flex-col space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-purple-700">
                  Crie eventos, divulgue e venda ingressos com facilidade
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Users className="h-6 w-6 text-purple-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Da publicação à venda:</h3>
                      <p className="text-gray-600">suporte em todas as etapas.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <CalendarCheck className="h-6 w-6 text-purple-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Publicação grátis:</h3>
                      <p className="text-gray-600">sem taxa de adesão ou mensalidade.</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" className="bg-[#0057D9] hover:bg-[#0045b0]">
                    Crie seu evento
                  </Button>
                  
                  <Link to="/como-funciona">
                    <Button variant="outline" size="lg" className="border-[#0057D9] text-[#0057D9]">
                      Veja como funciona
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="hidden md:block">
                <img 
                  src="/lovable-uploads/e95d4e59-d092-42db-8844-b741fb63999e.png" 
                  alt="Dashboard de eventos" 
                  className="w-full rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Instagram-like Feed Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold">InstaSanja</h2>
                <p className="text-gray-600 mt-2">Compartilhe suas experiências nos eventos</p>
              </div>
              <Link to="/gallery" className="flex items-center gap-2 text-primary">
                <Instagram className="h-5 w-5" />
                <span>Ver galeria completa</span>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {instaSanjaPhotos.map(photo => (
                <div key={photo.id} className="relative group overflow-hidden rounded-lg">
                  <img 
                    src={photo.imageUrl} 
                    alt={`Foto de ${photo.user}`} 
                    className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">@{photo.user}</span>
                      <span className="text-sm">• {photo.likes} likes</span>
                    </div>
                    <p className="text-sm opacity-90">{photo.eventName}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <Camera className="mr-2 h-4 w-4" />
                Faça upload das suas fotos
              </Button>
            </div>
          </div>
        </section>
        
        {/* Contact Form Section */}
        <section className="py-16 bg-page">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold">Entre em contato</h2>
                <p className="text-gray-600 mt-2">Tire suas dúvidas ou envie sugestões</p>
              </div>
              
              <form className="max-w-2xl mx-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                    <input
                      type="text"
                      id="name"
                      className="input-field w-full"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="input-field w-full"
                      placeholder="seu.email@exemplo.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Assunto</label>
                  <input
                    type="text"
                    id="subject"
                    className="input-field w-full"
                    placeholder="Assunto da mensagem"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
                  <textarea
                    id="message"
                    rows={5}
                    className="input-field w-full resize-none"
                    placeholder="Escreva sua mensagem aqui..."
                  ></textarea>
                </div>
                
                <div className="text-center">
                  <Button className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary/90">
                    Enviar mensagem
                  </Button>
                </div>
              </form>
            </div>
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
