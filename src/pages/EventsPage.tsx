
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import EventCard from '@/components/events/EventCard';
import { events, Event } from '@/data/mockData';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';

const EventsPage = () => {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Featured events for carousel
  const featuredEvents = events.slice(0, 5);
  
  // Categories
  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'music', name: 'Música' },
    { id: 'business', name: 'Negócios' },
    { id: 'comedy', name: 'Comédia' },
  ];
  
  useEffect(() => {
    // Simulate API fetch
    setAllEvents(events);
    setFilteredEvents(events);
  }, []);
  
  // Filter events when category or search changes
  useEffect(() => {
    let filtered = [...allEvents];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((event) => event.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.location.city.toLowerCase().includes(query)
      );
    }
    
    setFilteredEvents(filtered);
  }, [selectedCategory, searchQuery, allEvents]);
  
  return (
    <MainLayout>
      <div className="bg-page py-12">
        <div className="container mx-auto px-4">
          {/* Banner Carousel */}
          <div className="mb-12">
            <Carousel className="w-full">
              <CarouselContent>
                {featuredEvents.map((event) => (
                  <CarouselItem key={event.id} className="md:basis-2/3 lg:basis-3/4">
                    <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden">
                      <img 
                        src={event.bannerUrl} 
                        alt={event.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">{event.title}</h2>
                        <p className="text-sm md:text-base mb-4">{event.location.city}, {event.date}</p>
                        <a href={`/events/${event.id}`} className="btn-primary inline-block w-max py-2 px-4">
                          Ver detalhes
                        </a>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
          
          <h1 className="text-3xl font-bold mb-8">Todos os Eventos</h1>
          
          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar eventos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field w-full"
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="px-4 py-2 bg-white border border-gray-300 rounded-md flex items-center gap-2">
                {categories.find(c => c.id === selectedCategory)?.name || 'Categorias'}
                <ChevronDown size={16} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {categories.map((category) => (
                  <DropdownMenuItem 
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={selectedCategory === category.id ? "bg-primary/10 font-medium" : ""}
                  >
                    {category.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">Nenhum evento encontrado</h3>
              <p className="text-gray-600">
                Tente ajustar os filtros ou busque por outros termos
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default EventsPage;
