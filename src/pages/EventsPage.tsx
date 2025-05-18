
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import EventCard from '@/components/events/EventCard';
import { events, Event } from '@/data/mockData';

const EventsPage = () => {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
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
            
            <div className="flex items-center space-x-2 overflow-x-auto py-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
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
