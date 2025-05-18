
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PhotoGrid from '@/components/gallery/PhotoGrid';
import { events, galleryPhotos, Photo } from '@/data/mockData';

const GalleryPage = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>('all');
  
  useEffect(() => {
    // Combine all event gallery photos with additional gallery photos
    const allPhotos = [
      ...galleryPhotos,
      ...events.flatMap((event) => event.gallery),
    ];
    
    setPhotos(allPhotos);
  }, []);
  
  const filteredPhotos = selectedEvent === 'all'
    ? photos
    : photos.filter((photo) => photo.eventId === selectedEvent);
  
  return (
    <MainLayout>
      <div className="bg-page py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Galeria Social</h1>
          
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
            <div className="flex-1 w-full md:w-auto">
              <select
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="input-field w-full"
              >
                <option value="all">Todos os eventos</option>
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.title}
                  </option>
                ))}
              </select>
            </div>
            
            <button className="btn-primary py-2 px-6 w-full md:w-auto">
              Enviar minha foto
            </button>
          </div>
          
          {/* Photos Grid */}
          {filteredPhotos.length > 0 ? (
            <PhotoGrid photos={filteredPhotos} />
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">Nenhuma foto encontrada</h3>
              <p className="text-gray-600">
                Seja o primeiro a compartilhar suas fotos deste evento!
              </p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default GalleryPage;
