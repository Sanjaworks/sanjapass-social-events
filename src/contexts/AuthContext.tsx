
import { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { users } from '@/data/mockData';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'organizer' | 'admin';
  photoUrl: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  // Check if user is already logged in from localStorage
  useState(() => {
    const savedUser = localStorage.getItem('sanjapass_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  });

  const login = async (email: string, password: string) => {
    try {
      // Simulate API request delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Find user with matching email (password is not checked in this mock)
      const foundUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      
      if (foundUser) {
        const userData = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role,
          photoUrl: foundUser.photoUrl,
        };
        
        setUser(userData);
        localStorage.setItem('sanjapass_user', JSON.stringify(userData));
        
        toast({
          title: 'Login realizado com sucesso',
          description: `Bem-vindo(a) de volta, ${userData.name}!`,
        });
        
        return true;
      } else {
        toast({
          variant: 'destructive',
          title: 'Erro ao fazer login',
          description: 'Email ou senha incorretos.',
        });
        return false;
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao fazer login',
        description: 'Ocorreu um erro ao processar sua solicitação.',
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sanjapass_user');
    toast({
      title: 'Logout realizado',
      description: 'Você foi desconectado com sucesso.',
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
