
import { useState } from 'react';
import { Search, Check, X, RefreshCw } from 'lucide-react';

const CheckinPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [scanStatus, setScanStatus] = useState<'none' | 'valid' | 'used' | 'invalid'>('none');
  const [loading, setLoading] = useState(false);
  
  // Mock attendee data
  const mockAttendee = {
    name: 'Maria Silva',
    cpf: '123.456.789-00',
    email: 'maria@example.com',
    photo: 'https://randomuser.me/api/portraits/women/12.jpg',
    eventName: 'Festival SanjaMusic 2025',
    ticketType: 'Ingresso Comum',
    ticketBatch: '1º Lote',
    scanTime: new Date().toISOString(),
    observation: '',
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery) return;
    
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // For the demo, we'll just check if the query includes certain keywords
      if (searchQuery.includes('valid')) {
        setScanStatus('valid');
      } else if (searchQuery.includes('used')) {
        setScanStatus('used');
      } else if (searchQuery.includes('invalid')) {
        setScanStatus('invalid');
      } else {
        // Default to valid for demo purposes
        setScanStatus('valid');
      }
      
      setLoading(false);
    }, 1000);
  };
  
  const resetScan = () => {
    setScanStatus('none');
    setSearchQuery('');
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-primary text-white shadow-md py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">SanjaPass - Controle de Acesso</h1>
            <button className="bg-white/20 hover:bg-white/30 text-white py-1 px-4 rounded-lg text-sm">
              Sair
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          {/* Search Bar */}
          <form 
            onSubmit={handleSearch}
            className={`p-6 ${scanStatus !== 'none' ? 'border-b border-gray-200' : ''}`}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Escaneie o QR Code ou digite o código do ingresso..."
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  disabled={loading}
                />
              </div>
              <button
                type="submit"
                className="btn-primary py-3 px-6 flex-shrink-0"
                disabled={loading || !searchQuery}
              >
                {loading ? (
                  <div className="flex items-center">
                    <RefreshCw className="animate-spin h-4 w-4 mr-2" />
                    Verificando...
                  </div>
                ) : (
                  'Verificar'
                )}
              </button>
            </div>
          </form>
          
          {/* Scan Results */}
          {scanStatus !== 'none' && (
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Result Status */}
                <div className="md:w-1/3 flex flex-col items-center justify-center p-4">
                  {scanStatus === 'valid' && (
                    <div className="text-center">
                      <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                        <Check className="h-12 w-12 text-green-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-green-600 mt-4">Ingresso Válido</h2>
                      <p className="text-gray-600 mt-2">O ingresso pode ser utilizado.</p>
                    </div>
                  )}
                  
                  {scanStatus === 'used' && (
                    <div className="text-center">
                      <div className="h-24 w-24 rounded-full bg-yellow-100 flex items-center justify-center mx-auto">
                        <X className="h-12 w-12 text-yellow-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-yellow-600 mt-4">Já Utilizado</h2>
                      <p className="text-gray-600 mt-2">Este ingresso já foi utilizado.</p>
                    </div>
                  )}
                  
                  {scanStatus === 'invalid' && (
                    <div className="text-center">
                      <div className="h-24 w-24 rounded-full bg-red-100 flex items-center justify-center mx-auto">
                        <X className="h-12 w-12 text-red-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-red-600 mt-4">Ingresso Inválido</h2>
                      <p className="text-gray-600 mt-2">Este ingresso não é válido.</p>
                    </div>
                  )}
                  
                  <button 
                    className={`mt-6 py-2 px-6 rounded-lg ${
                      scanStatus === 'valid'
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-gray-600 hover:bg-gray-700'
                    } text-white`}
                  >
                    {scanStatus === 'valid' ? 'Marcar Entrada' : 'Voltar'}
                  </button>
                </div>
                
                {/* Attendee Details */}
                <div className="md:w-2/3 md:border-l md:pl-6">
                  <h3 className="text-xl font-semibold mb-4">Detalhes do Participante</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div className="col-span-2 flex items-center">
                      <img 
                        src={mockAttendee.photo}
                        alt="Foto do participante"
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                      />
                      <div className="ml-4">
                        <h4 className="font-medium text-lg">{mockAttendee.name}</h4>
                        <p className="text-gray-600 text-sm">{mockAttendee.email}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">CPF</p>
                      <p className="font-medium">{mockAttendee.cpf}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Evento</p>
                      <p className="font-medium">{mockAttendee.eventName}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Tipo de Ingresso</p>
                      <p className="font-medium">{mockAttendee.ticketType}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Lote</p>
                      <p className="font-medium">{mockAttendee.ticketBatch}</p>
                    </div>
                    
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500">Observações</p>
                      <p className="font-medium">
                        {mockAttendee.observation || 'Nenhuma observação'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 mt-6 pt-6 text-center">
                <button
                  onClick={resetScan}
                  className="text-primary hover:text-primary/80"
                >
                  Verificar outro ingresso
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckinPage;
