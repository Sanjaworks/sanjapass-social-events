
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { 
  CalendarDays, 
  PencilRuler, 
  Share2, 
  BarChart3, 
  Banknote,
  Monitor,
  Users,
  Settings,
  ChevronDown
} from 'lucide-react';

const ComoFunciona = () => {
  // Refs for scrolling to sections
  const introRef = useRef<HTMLDivElement>(null);
  const formatoRef = useRef<HTMLDivElement>(null);
  const personalizeRef = useRef<HTMLDivElement>(null);
  const divulgueRef = useRef<HTMLDivElement>(null);
  const gerencieRef = useRef<HTMLDivElement>(null);
  const pagamentosRef = useRef<HTMLDivElement>(null);

  // Function to handle smooth scrolling to sections
  const scrollToSection = (elementRef: React.RefObject<HTMLDivElement>) => {
    if (elementRef.current) {
      window.scrollTo({
        top: elementRef.current.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
        }
      });
    }, { threshold: 0.1 });

    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <MainLayout>
      {/* Navigation menu */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto flex flex-wrap items-center justify-between py-4 px-4">
          <h1 className="text-xl font-bold text-[#0057D9]">Como funciona</h1>
          
          <div className="hidden md:flex space-x-6">
            <button 
              onClick={() => scrollToSection(formatoRef)}
              className="text-sm font-medium text-gray-600 hover:text-[#0057D9] transition-colors"
            >
              Formato
            </button>
            <button 
              onClick={() => scrollToSection(personalizeRef)}
              className="text-sm font-medium text-gray-600 hover:text-[#0057D9] transition-colors"
            >
              Personalize
            </button>
            <button 
              onClick={() => scrollToSection(divulgueRef)}
              className="text-sm font-medium text-gray-600 hover:text-[#0057D9] transition-colors"
            >
              Divulgue
            </button>
            <button 
              onClick={() => scrollToSection(gerencieRef)}
              className="text-sm font-medium text-gray-600 hover:text-[#0057D9] transition-colors"
            >
              Gerencie
            </button>
            <button 
              onClick={() => scrollToSection(pagamentosRef)}
              className="text-sm font-medium text-gray-600 hover:text-[#0057D9] transition-colors"
            >
              Pagamentos
            </button>
          </div>
          
          <Button className="bg-[#0057D9] hover:bg-[#0045b0]">
            Crie seu evento
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-[#f8f9fa]" ref={introRef}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center gap-10">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-[#0057D9] leading-tight">
                Crie e gerencie seus eventos de forma simples
              </h1>
              <p className="text-lg text-gray-700">
                Com a plataforma SanjaPass, você pode criar eventos, vender ingressos online e gerenciar 
                todo o processo em um só lugar, sem complicações.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-[#0057D9] hover:bg-[#0045b0]">
                  Crie seu evento agora
                </Button>
                <Button variant="outline" size="lg">
                  Fale com um consultor
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" 
                alt="Plataforma de eventos" 
                className="w-full rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Escolha o formato */}
      <section className="py-16 bg-white" ref={formatoRef}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10 animate-on-scroll opacity-0">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Formatos de eventos" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            
            <div className="md:w-1/2 space-y-6">
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full">
                <Monitor className="h-6 w-6 text-[#0057D9]" />
              </div>
              
              <h2 className="text-3xl font-bold">Escolha o formato do seu evento</h2>
              
              <p className="text-lg text-gray-700">
                Crie e gerencie eventos presenciais ou online através da nossa plataforma. 
                Temos as ferramentas certas para qualquer formato que você escolher.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="h-5 w-5 text-[#0057D9]" />
                    <h3 className="font-semibold">Eventos Presenciais</h3>
                  </div>
                  <p className="text-gray-600">Gerencie check-in, vendas e relatórios.</p>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Monitor className="h-5 w-5 text-[#0057D9]" />
                    <h3 className="font-semibold">Eventos Online</h3>
                  </div>
                  <p className="text-gray-600">Integração com plataformas de streaming.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Personalize */}
      <section className="py-16 bg-[#f8f9fa]" ref={personalizeRef}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center gap-10 animate-on-scroll opacity-0">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Personalização de eventos" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            
            <div className="md:w-1/2 space-y-6">
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full">
                <PencilRuler className="h-6 w-6 text-[#0057D9]" />
              </div>
              
              <h2 className="text-3xl font-bold">Personalize sua página de evento</h2>
              
              <p className="text-lg text-gray-700">
                Crie uma página de evento atrativa com todas as informações que seu público precisa saber.
                Personalize cada detalhe para refletir a identidade do seu evento.
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-[#0057D9] rounded-full p-1">
                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Adicione banner, descrição e programação</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-[#0057D9] rounded-full p-1">
                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Configure diferentes tipos de ingressos</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-[#0057D9] rounded-full p-1">
                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Personalize formulários de inscrição</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-[#0057D9] rounded-full p-1">
                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Adicione localização e mapa</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Divulgue */}
      <section className="py-16 bg-white" ref={divulgueRef}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10 animate-on-scroll opacity-0">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Divulgação de eventos" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            
            <div className="md:w-1/2 space-y-6">
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full">
                <Share2 className="h-6 w-6 text-[#0057D9]" />
              </div>
              
              <h2 className="text-3xl font-bold">Divulgue e venda seus ingressos</h2>
              
              <p className="text-lg text-gray-700">
                Compartilhe seu evento em todas as redes sociais e comece a vender ingressos 
                imediatamente. Nossa plataforma facilita o processo de divulgação.
              </p>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-5 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Divulgação facilitada</h3>
                  <p>
                    Gere links de divulgação, botões para seu site e QR codes para 
                    compartilhar seu evento com facilidade.
                  </p>
                </div>
                
                <div className="bg-blue-50 p-5 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Vendas em tempo real</h3>
                  <p>
                    Acompanhe as vendas em tempo real e veja o impacto de suas estratégias 
                    de marketing imediatamente.
                  </p>
                </div>
              </div>
              
              <Button className="bg-[#0057D9] hover:bg-[#0045b0]">
                Crie seu evento agora
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Gerencie */}
      <section className="py-16 bg-[#f8f9fa]" ref={gerencieRef}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row-reverse items-center gap-10 animate-on-scroll opacity-0">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Gestão de eventos" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            
            <div className="md:w-1/2 space-y-6">
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full">
                <BarChart3 className="h-6 w-6 text-[#0057D9]" />
              </div>
              
              <h2 className="text-3xl font-bold">Gerencie seu evento</h2>
              
              <p className="text-lg text-gray-700">
                Acesse informações detalhadas sobre vendas, participantes e mais. 
                Tenha controle total sobre seu evento antes, durante e depois.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Settings className="h-5 w-5 text-[#0057D9]" />
                    <h3 className="font-semibold">Dashboard completo</h3>
                  </div>
                  <p className="text-gray-600">Visualize métricas e indicadores importantes.</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-[#0057D9]" />
                    <h3 className="font-semibold">Gestão de participantes</h3>
                  </div>
                  <p className="text-gray-600">Administre inscrições e cancelamentos.</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CalendarDays className="h-5 w-5 text-[#0057D9]" />
                    <h3 className="font-semibold">Check-in digital</h3>
                  </div>
                  <p className="text-gray-600">Controle de entrada eficiente e rápido.</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-5 w-5 text-[#0057D9]" />
                    <h3 className="font-semibold">Relatórios detalhados</h3>
                  </div>
                  <p className="text-gray-600">Exporte dados para análise aprofundada.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Pagamentos */}
      <section className="py-16 bg-white" ref={pagamentosRef}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10 animate-on-scroll opacity-0">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Pagamentos" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            
            <div className="md:w-1/2 space-y-6">
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full">
                <Banknote className="h-6 w-6 text-[#0057D9]" />
              </div>
              
              <h2 className="text-3xl font-bold">Receba seus pagamentos</h2>
              
              <p className="text-lg text-gray-700">
                Gerencie suas receitas e transfira os valores para sua conta bancária 
                com total segurança e transparência.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-green-500 rounded-full p-1">
                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Receba via PIX, cartão ou boleto</h3>
                    <p className="text-gray-600 text-sm">Ofereça múltiplas opções de pagamento para seus clientes</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-green-500 rounded-full p-1">
                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Transferências automáticas</h3>
                    <p className="text-gray-600 text-sm">Configure transferências automáticas para sua conta bancária</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-green-500 rounded-full p-1">
                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Taxas competitivas</h3>
                    <p className="text-gray-600 text-sm">Taxas transparentes e justas para maximizar seu lucro</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-green-500 rounded-full p-1">
                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Relatório financeiro completo</h3>
                    <p className="text-gray-600 text-sm">Acompanhe receitas, despesas e lucros em tempo real</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#0057D9] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para criar seu evento?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Comece agora mesmo e aproveite todas as ferramentas que o SanjaPass oferece 
            para o sucesso do seu evento.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-[#0057D9] hover:bg-gray-100">
              Crie seu evento grátis
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              Fale com um consultor
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Perguntas frequentes</h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="border border-gray-200 rounded-lg">
              <button className="flex justify-between items-center w-full p-5 text-left">
                <h3 className="font-semibold">Quanto custa utilizar o SanjaPass?</h3>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </button>
              <div className="p-5 pt-0 text-gray-700">
                <p>
                  O cadastro e a publicação de eventos na plataforma SanjaPass são gratuitos. 
                  Cobramos apenas uma pequena taxa sobre cada ingresso vendido, que varia de acordo 
                  com o tipo de evento e volume de vendas.
                </p>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg">
              <button className="flex justify-between items-center w-full p-5 text-left">
                <h3 className="font-semibold">Como recebo o dinheiro das vendas?</h3>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </button>
              <div className="p-5 pt-0 text-gray-700">
                <p>
                  Os pagamentos são processados automaticamente e transferidos para sua conta bancária 
                  cadastrada. Você pode configurar transferências automáticas ou solicitar saques manuais 
                  através do seu painel de organizador.
                </p>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg">
              <button className="flex justify-between items-center w-full p-5 text-left">
                <h3 className="font-semibold">Como funciona o check-in no dia do evento?</h3>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </button>
              <div className="p-5 pt-0 text-gray-700">
                <p>
                  O SanjaPass oferece um sistema de check-in digital através de QR codes. 
                  Seus participantes receberão ingressos com QR codes que podem ser escaneados 
                  no dia do evento usando nosso aplicativo de check-in, disponível para Android e iOS.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ComoFunciona;
