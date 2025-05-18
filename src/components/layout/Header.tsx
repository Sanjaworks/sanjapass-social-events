
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, User, X, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, setUserByRole } = useAuth();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (user) {
      if (user.role === 'customer') {
        navigate('/dashboard');
      } else if (user.role === 'organizer') {
        navigate('/organizer');
      } else if (user.role === 'admin') {
        navigate('/admin');
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold">
              <span className="text-primary">Sanja</span>
              <span className="text-secondary">Pass</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/events" className="hover:text-primary transition-colors">
              Eventos
            </Link>
            <Link to="/gallery" className="hover:text-primary transition-colors">
              Galeria Social
            </Link>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar eventos..."
                className="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 w-64"
              />
            </div>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center space-x-2">
                    <img 
                      src={user.photoUrl} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-medium">{user.name.split(' ')[0]}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  {/* Links específicos para cada tipo de usuário */}
                  {user.role === 'customer' && (
                    <>
                      <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                        Meu Painel
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/dashboard/tickets')}>
                        Meus Ingressos
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/participant/${user.id}`)}>
                        Minha Página NFT
                      </DropdownMenuItem>
                    </>
                  )}
                  
                  {user.role === 'organizer' && (
                    <>
                      <DropdownMenuItem onClick={() => navigate('/organizer')}>
                        Painel do Organizador
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/organizer/checkin')}>
                        Check-in de Eventos
                      </DropdownMenuItem>
                    </>
                  )}
                  
                  {user.role === 'admin' && (
                    <>
                      <DropdownMenuItem onClick={() => navigate('/admin')}>
                        Painel Admin
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/master')}>
                        Painel Master
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/master/organizers')}>
                        Gerenciar Organizadores
                      </DropdownMenuItem>
                    </>
                  )}
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login" className="btn-primary py-2 px-4">
                Entrar
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 animate-fadeIn">
          <div className="flex flex-col space-y-4">
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar eventos..."
                className="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 w-full"
              />
            </div>
            <Link 
              to="/events" 
              className="py-2 px-4 hover:bg-gray-100 rounded-lg transition-colors" 
              onClick={() => setIsMenuOpen(false)}
            >
              Eventos
            </Link>
            <Link 
              to="/gallery" 
              className="py-2 px-4 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Galeria Social
            </Link>
            
            {user ? (
              <>
                <div className="py-2 px-4 flex items-center space-x-2">
                  <img 
                    src={user.photoUrl} 
                    alt={user.name} 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="font-medium">{user.name}</span>
                </div>
                
                {user.role === 'customer' && (
                  <>
                    <Link 
                      to="/dashboard" 
                      className="py-2 px-4 hover:bg-gray-100 rounded-lg transition-colors pl-8"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Meu Painel
                    </Link>
                    <Link 
                      to="/dashboard/tickets" 
                      className="py-2 px-4 hover:bg-gray-100 rounded-lg transition-colors pl-8"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Meus Ingressos
                    </Link>
                    <Link 
                      to={`/participant/${user.id}`} 
                      className="py-2 px-4 hover:bg-gray-100 rounded-lg transition-colors pl-8"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Minha Página NFT
                    </Link>
                  </>
                )}
                
                {user.role === 'organizer' && (
                  <>
                    <Link 
                      to="/organizer" 
                      className="py-2 px-4 hover:bg-gray-100 rounded-lg transition-colors pl-8"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Painel do Organizador
                    </Link>
                    <Link 
                      to="/organizer/checkin" 
                      className="py-2 px-4 hover:bg-gray-100 rounded-lg transition-colors pl-8"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Check-in de Eventos
                    </Link>
                  </>
                )}
                
                {user.role === 'admin' && (
                  <>
                    <Link 
                      to="/admin" 
                      className="py-2 px-4 hover:bg-gray-100 rounded-lg transition-colors pl-8"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Painel Admin
                    </Link>
                    <Link 
                      to="/master" 
                      className="py-2 px-4 hover:bg-gray-100 rounded-lg transition-colors pl-8"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Painel Master
                    </Link>
                  </>
                )}
                
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }} 
                  className="py-2 px-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="btn-primary py-2 px-4 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Entrar
              </Link>
            )}
            
            {/* Demo Links for Development */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Área de desenvolvimento:</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <button 
                  onClick={() => {
                    setUserByRole('customer'); 
                    navigate('/dashboard'); 
                    setIsMenuOpen(false);
                  }}
                  className="py-1 px-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  Acessar como Cliente
                </button>
                <button 
                  onClick={() => {
                    setUserByRole('organizer'); 
                    navigate('/organizer'); 
                    setIsMenuOpen(false);
                  }}
                  className="py-1 px-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  Acessar como Organizador
                </button>
                <button 
                  onClick={() => {
                    setUserByRole('admin'); 
                    navigate('/admin'); 
                    setIsMenuOpen(false);
                  }}
                  className="py-1 px-2 border border-gray-300 rounded hover:bg-gray-100"
                >
                  Acessar como Admin
                </button>
                <button 
                  onClick={() => {
                    setUserByRole('master'); 
                    navigate('/master'); 
                    setIsMenuOpen(false);
                  }}
                  className="py-1 px-2 border border-primary rounded bg-primary/10 text-primary hover:bg-primary/20"
                >
                  Acessar como Master
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
