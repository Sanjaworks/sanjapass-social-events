
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Calendar, Image, Share2, BarChart3, CreditCard, ChevronDown, ArrowRight } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';

const ComoFunciona = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const sectionRefs = {
    intro: useRef<HTMLDivElement>(null),
    format: useRef<HTMLDivElement>(null),
    customize: useRef<HTMLDivElement>(null),
    promote: useRef<HTMLDivElement>(null),
    manage: useRef<HTMLDivElement>(null),
    payments: useRef<HTMLDivElement>(null)
  };

  // Intersection observer to update active section based on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const scrollToSection = (id: string) => {
    const section = sectionRefs[id as keyof typeof sectionRefs].current;
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MainLayout>
      {/* Fixed navigation */}
      <nav className="sticky top-0 z-10 bg-white shadow-md py-4">
        <div className="container mx-auto px-4">
          <div className="overflow-x-auto flex space-x-6 scrollbar-hide">
            <button
              onClick={() => scrollToSection('intro')}
              className={`whitespace-nowrap px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeSection === 'intro' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Introdução
            </button>
            <button
              onClick={() => scrollToSection('format')}
              className={`whitespace-nowrap px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeSection === 'format' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Formato do evento
            </button>
            <button
              onClick={() => scrollToSection('customize')}
              className={`whitespace-nowrap px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeSection === 'customize' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Personalização
            </button>
            <button
              onClick={() => scrollToSection('promote')}
              className={`whitespace-nowrap px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeSection === 'promote' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Divulgação e vendas
            </button>
            <button
              onClick={() => scrollToSection('manage')}
              className={`whitespace-nowrap px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeSection === 'manage' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Gerenciamento
            </button>
            <button
              onClick={() => scrollToSection('payments')}
              className={`whitespace-nowrap px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                activeSection === 'payments' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Pagamentos
            </button>
          </div>
        </div>
      </nav>

      {/* Hero section */}
      <section id="intro" ref={sectionRefs.intro} className="bg-[#0057D9] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Como funciona o SanjaPass</h1>
            <p className="text-xl mb-8">Crie e gerencie seus eventos com facilidade em poucos passos</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-[#0057D9] hover:bg-gray-100">
                Crie seu evento agora
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-800">
                Fale com um consultor
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" fill="#ffffff">
            <path d="M0,32L80,42.7C160,53,320,75,480,74.7C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,100L0,100Z"></path>
          </svg>
        </div>
      </section>

      {/* Section 1: Format */}
      <section id="format" ref={sectionRefs.format} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-blue-100 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                Passo 1
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Escolha o formato do seu evento</h2>
              <p className="text-lg text-gray-700 mb-6">
                O SanjaPass permite criar diferentes tipos de eventos para atender a todas as suas necessidades. Você decide o formato que melhor se adapta ao seu público.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg">Eventos presenciais</h4>
                    <p className="text-gray-600">Festas, shows, workshops, conferências e muito mais</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg">Eventos online</h4>
                    <p className="text-gray-600">Webinars, cursos online e transmissões ao vivo</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-primary mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg">Eventos híbridos</h4>
                    <p className="text-gray-600">Combine experiências presenciais e online para seu público</p>
                  </div>
                </li>
              </ul>
              
              <Button className="mt-8" onClick={() => scrollToSection('customize')}>
                Próximo passo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="relative">
              <div className="bg-blue-50 rounded-lg p-8 relative z-10">
                <Calendar className="h-16 w-16 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-4">Eventos para todos os gostos</h3>
                <p className="mb-4 text-gray-700">
                  Nossa plataforma se adapta a qualquer tipo de evento:
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <span className="font-medium">Festas</span>
                  </div>
                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <span className="font-medium">Shows</span>
                  </div>
                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <span className="font-medium">Conferências</span>
                  </div>
                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <span className="font-medium">Workshops</span>
                  </div>
                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <span className="font-medium">Cursos</span>
                  </div>
                  <div className="bg-white p-4 rounded-md shadow-sm">
                    <span className="font-medium">Festivais</span>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-100 rounded-full z-0"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary/10 rounded-full z-0"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section 2: Customize */}
      <section id="customize" ref={sectionRefs.customize} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop" 
                  alt="Customizing event page" 
                  className="rounded-lg shadow-xl w-full"
                />
                <div className="absolute -bottom-8 -right-8 bg-white rounded-lg shadow-lg p-4 w-64">
                  <div className="flex items-center">
                    <div className="bg-primary/10 p-3 rounded-full mr-3">
                      <Image className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Design personalizado</h4>
                      <p className="text-sm text-gray-500">Sua marca, seu estilo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="inline-block bg-blue-100 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                Passo 2
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Personalize sua página</h2>
              <p className="text-lg text-gray-700 mb-6">
                Crie uma experiência única para seus participantes com uma página personalizada que reflete a identidade do seu evento.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-lg mb-2">Informações do evento</h4>
                  <p className="text-gray-600">Adicione título, descrição detalhada, data, horário e localização.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-lg mb-2">Imagens e mídia</h4>
                  <p className="text-gray-600">Faça upload de banners, fotos, vídeos e logotipos para atrair seu público.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-lg mb-2">Tipos de ingressos</h4>
                  <p className="text-gray-600">Configure diferentes categorias, preços, descontos e promoções para seus ingressos.</p>
                </div>
              </div>
              
              <Button className="mt-8" onClick={() => scrollToSection('promote')}>
                Próximo passo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section 3: Promote */}
      <section id="promote" ref={sectionRefs.promote} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-blue-100 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                Passo 3
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Divulgue e venda</h2>
              <p className="text-lg text-gray-700 mb-6">
                Compartilhe seu evento nas redes sociais e comece a vender ingressos imediatamente com nossas ferramentas de marketing integradas.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4 mt-1">
                    <Share2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Compartilhamento fácil</h4>
                    <p className="text-gray-600">Links personalizados para compartilhar em redes sociais, WhatsApp, e-mail e mais.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4 mt-1">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Acompanhamento em tempo real</h4>
                    <p className="text-gray-600">Monitore o desempenho da divulgação com estatísticas detalhadas sobre visualizações e vendas.</p>
                  </div>
                </div>
              </div>
              
              <Button className="mt-8" onClick={() => scrollToSection('manage')}>
                Próximo passo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-sm">
                  <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full mb-4 text-xl font-bold text-primary">FB</div>
                  <h4 className="font-semibold mb-2">Facebook</h4>
                  <p className="text-sm text-gray-600">Integração direta com eventos do Facebook</p>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-lg shadow-sm">
                  <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full mb-4 text-xl font-bold text-pink-500">IG</div>
                  <h4 className="font-semibold mb-2">Instagram</h4>
                  <p className="text-sm text-gray-600">Stories e posts com link direto</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-sm">
                  <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full mb-4 text-xl font-bold text-green-500">WA</div>
                  <h4 className="font-semibold mb-2">WhatsApp</h4>
                  <p className="text-sm text-gray-600">Compartilhamento com um clique</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg shadow-sm">
                  <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full mb-4 text-xl font-bold text-purple-500">E</div>
                  <h4 className="font-semibold mb-2">E-mail</h4>
                  <p className="text-sm text-gray-600">Campanhas de e-mail marketing</p>
                </div>
              </div>
              
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-blue-200 rounded-full z-0"></div>
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-primary/10 rounded-full z-0"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section 4: Manage */}
      <section id="manage" ref={sectionRefs.manage} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop" 
                alt="Event management dashboard" 
                className="rounded-lg shadow-xl"
              />
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="inline-block bg-blue-100 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                Passo 4
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Gerencie seu evento</h2>
              <p className="text-lg text-gray-700 mb-6">
                Tenha controle total do seu evento com nosso painel de administração completo e ferramentas de gestão em tempo real.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-lg mb-2">Lista de participantes</h4>
                  <p className="text-gray-600">Acompanhe quem comprou ingressos e gerencie inscrições.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-lg mb-2">Check-in digital</h4>
                  <p className="text-gray-600">Valide ingressos na entrada do evento com nosso aplicativo de check-in.</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-lg mb-2">Relatórios detalhados</h4>
                  <p className="text-gray-600">Acesse dados e métricas sobre vendas, participantes e desempenho financeiro.</p>
                </div>
              </div>
              
              <Button className="mt-8" onClick={() => scrollToSection('payments')}>
                Próximo passo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section 5: Payments */}
      <section id="payments" ref={sectionRefs.payments} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-blue-100 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                Passo 5
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Receba seus pagamentos</h2>
              <p className="text-lg text-gray-700 mb-6">
                Processo de pagamento seguro e transferência facilitada para sua conta bancária, sem complicações.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4 mt-1">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Múltiplas formas de pagamento</h4>
                    <p className="text-gray-600">Aceite cartões de crédito, débito, boleto bancário, Pix e outros métodos.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4 mt-1">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Transferências programadas</h4>
                    <p className="text-gray-600">Você escolhe quando quer receber os valores das vendas na sua conta.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-full mr-4 mt-1">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Segurança garantida</h4>
                    <p className="text-gray-600">Transações seguras e proteção contra fraudes para você e seus clientes.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-blue-50 rounded-lg p-8 relative">
                <h3 className="text-2xl font-bold mb-6">Tarifas transparentes</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="font-medium">Cartão de crédito</span>
                    <span className="text-lg font-semibold">3,5% + R$1,00</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="font-medium">Boleto bancário</span>
                    <span className="text-lg font-semibold">R$3,50</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span className="font-medium">Pix</span>
                    <span className="text-lg font-semibold">2,0%</span>
                  </div>
                </div>
                <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-600">Sem taxas de ativação, mensalidades ou custos escondidos. Você só paga quando vende!</p>
                </div>
              </div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-100 rounded-full z-0"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to action */}
      <section className="py-16 bg-[#0057D9]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Pronto para criar seu evento?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Comece agora mesmo e veja como é fácil criar, divulgar e gerenciar eventos com o SanjaPass.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-[#0057D9] hover:bg-gray-100">
              Crie seu evento grátis
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-800">
              Ver exemplos de eventos
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Perguntas frequentes</h2>
            <p className="text-lg text-gray-600 mt-4">Tudo o que você precisa saber sobre a plataforma</p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center cursor-pointer">
                <h3 className="font-semibold text-lg">Quanto custa usar o SanjaPass?</h3>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </div>
              <div className="mt-4 text-gray-700">
                <p>O cadastro e a publicação do seu evento são totalmente gratuitos. Você só paga uma pequena taxa sobre cada ingresso vendido, que varia conforme o método de pagamento escolhido pelo comprador.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center cursor-pointer">
                <h3 className="font-semibold text-lg">Quando recebo o dinheiro das vendas?</h3>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </div>
              <div className="mt-4 text-gray-700">
                <p>Você pode escolher receber os valores antes, durante ou após o evento, conforme sua necessidade. O prazo padrão é de D+14 (14 dias após a compra), mas também oferecemos opções de antecipação.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center cursor-pointer">
                <h3 className="font-semibold text-lg">Como funciona o check-in no dia do evento?</h3>
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </div>
              <div className="mt-4 text-gray-700">
                <p>Você pode fazer o check-in dos participantes usando nosso aplicativo móvel para escanear os QR codes dos ingressos, ou acessar a lista de presença pelo computador. O sistema valida os ingressos automaticamente e evita duplicidades.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ComoFunciona;
