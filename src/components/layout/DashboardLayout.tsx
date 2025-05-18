
import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Users, Settings, ChevronRight, LogOut, Menu, X } from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
  userType: 'customer' | 'organizer' | 'admin';
}

const DashboardLayout = ({ children, userType }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Define navigation items based on user type
  const getNavItems = () => {
    switch (userType) {
      case 'customer':
        return [
          { name: 'Início', path: '/dashboard', icon: Home },
          { name: 'Meus Ingressos', path: '/dashboard/tickets', icon: Calendar },
          { name: 'Fotos', path: '/dashboard/photos', icon: Users },
          { name: 'Configurações', path: '/dashboard/settings', icon: Settings },
        ];
      case 'organizer':
        return [
          { name: 'Início', path: '/organizer', icon: Home },
          { name: 'Meus Eventos', path: '/organizer/events', icon: Calendar },
          { name: 'Participantes', path: '/organizer/attendees', icon: Users },
          { name: 'Configurações', path: '/organizer/settings', icon: Settings },
        ];
      case 'admin':
        return [
          { name: 'Início', path: '/admin', icon: Home },
          { name: 'Eventos', path: '/admin/events', icon: Calendar },
          { name: 'Usuários', path: '/admin/users', icon: Users },
          { name: 'Configurações', path: '/admin/settings', icon: Settings },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();
  
  // Helper function to determine active route
  const isActive = (path: string) => location.pathname === path;

  // Dashboard title based on user type
  const getDashboardTitle = () => {
    switch (userType) {
      case 'customer':
        return 'Minha Conta';
      case 'organizer':
        return 'Painel do Organizador';
      case 'admin':
        return 'Painel Administrativo';
      default:
        return 'Painel';
    }
  };

  return (
    <div className="flex h-screen bg-page">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-full bg-white shadow-md text-text"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside 
        className={`bg-white shadow-md fixed md:relative z-40 w-64 transition-transform duration-300 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">
              <span className="text-primary">Sanja</span>
              <span className="text-secondary">Pass</span>
            </h2>
            <p className="text-sm text-gray-500 mt-1">{getDashboardTitle()}</p>
          </div>

          <nav className="py-6 flex-grow">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={`flex items-center px-6 py-3 text-sm ${
                        active
                          ? 'bg-primary/10 text-primary border-r-4 border-primary font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.name}
                      {active && <ChevronRight className="ml-auto h-4 w-4" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-6 border-t">
            <Link
              to="/"
              className="flex items-center text-sm text-gray-600 hover:text-primary"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sair
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold">{getDashboardTitle()}</h2>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
