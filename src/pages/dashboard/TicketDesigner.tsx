
import { useState, useRef } from 'react';
import { ArrowLeft, Download, Eye, Save, Image, Type, Square, Circle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface DesignElement {
  id: string;
  type: 'text' | 'image' | 'qr' | 'shape';
  x: number;
  y: number;
  width: number;
  height: number;
  content: string;
  style: {
    fontSize?: number;
    fontWeight?: string;
    color?: string;
    backgroundColor?: string;
    borderRadius?: number;
  };
}

const TicketDesigner = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const { toast } = useToast();
  const canvasRef = useRef<HTMLDivElement>(null);
  
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [elements, setElements] = useState<DesignElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [draggedElement, setDraggedElement] = useState<DesignElement | null>(null);

  const templates = [
    { id: 'classic', name: 'Clássico', preview: '/api/placeholder/200/120' },
    { id: 'modern', name: 'Moderno', preview: '/api/placeholder/200/120' },
    { id: 'elegant', name: 'Elegante', preview: '/api/placeholder/200/120' },
    { id: 'festival', name: 'Festival', preview: '/api/placeholder/200/120' },
  ];

  const addElement = (type: DesignElement['type']) => {
    const newElement: DesignElement = {
      id: Date.now().toString(),
      type,
      x: 50,
      y: 50,
      width: type === 'text' ? 200 : 100,
      height: type === 'text' ? 40 : 100,
      content: type === 'text' ? 'Texto do ingresso' : '',
      style: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#000000',
        backgroundColor: type === 'shape' ? '#cccccc' : 'transparent',
        borderRadius: 0,
      },
    };

    setElements([...elements, newElement]);
    setSelectedElement(newElement.id);
  };

  const updateElement = (id: string, updates: Partial<DesignElement>) => {
    setElements(elements.map(el => 
      el.id === id ? { ...el, ...updates } : el
    ));
  };

  const updateElementStyle = (id: string, styleUpdates: Partial<DesignElement['style']>) => {
    setElements(elements.map(el => 
      el.id === id ? { ...el, style: { ...el.style, ...styleUpdates } } : el
    ));
  };

  const deleteElement = (id: string) => {
    setElements(elements.filter(el => el.id !== id));
    setSelectedElement(null);
  };

  const handleDragStart = (e: React.DragEvent, element: DesignElement) => {
    setDraggedElement(element);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedElement || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    updateElement(draggedElement.id, { x, y });
    setDraggedElement(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const saveDesign = () => {
    const design = {
      template: selectedTemplate,
      elements,
      eventId,
    };

    localStorage.setItem(`ticket-design-${eventId}`, JSON.stringify(design));
    
    toast({
      title: 'Design salvo',
      description: 'O design do ingresso foi salvo com sucesso.',
    });
  };

  const previewTicket = () => {
    // Abrir preview em nova aba
    const designData = encodeURIComponent(JSON.stringify({ template: selectedTemplate, elements }));
    window.open(`/ticket-preview?design=${designData}`, '_blank');
  };

  const selectedEl = elements.find(el => el.id === selectedElement);

  return (
    <DashboardLayout userType="organizer">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/organizer/events/${eventId}/edit`)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Designer de Ingressos</h1>
              <p className="text-gray-600 mt-1">Crie e personalize o design dos seus ingressos</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={previewTicket}>
              <Eye className="h-4 w-4 mr-2" />
              Visualizar
            </Button>
            <Button variant="outline" onClick={saveDesign}>
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Ferramentas */}
          <div className="space-y-6">
            <Tabs defaultValue="templates" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="templates">Templates</TabsTrigger>
                <TabsTrigger value="elements">Elementos</TabsTrigger>
              </TabsList>
              
              <TabsContent value="templates" className="space-y-4">
                <div className="space-y-2">
                  <Label>Escolha um Template</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        className={`border rounded-lg p-3 cursor-pointer transition-all ${
                          selectedTemplate === template.id 
                            ? 'border-primary bg-primary/10' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <div className="text-sm font-medium">{template.name}</div>
                        <div className="w-full h-16 bg-gray-100 rounded mt-2"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="elements" className="space-y-4">
                <div className="space-y-2">
                  <Label>Adicionar Elementos</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addElement('text')}
                      className="h-12"
                    >
                      <Type className="h-4 w-4 mb-1" />
                      <span className="text-xs">Texto</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addElement('image')}
                      className="h-12"
                    >
                      <Image className="h-4 w-4 mb-1" />
                      <span className="text-xs">Imagem</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addElement('shape')}
                      className="h-12"
                    >
                      <Square className="h-4 w-4 mb-1" />
                      <span className="text-xs">Forma</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addElement('qr')}
                      className="h-12"
                    >
                      <Square className="h-4 w-4 mb-1" />
                      <span className="text-xs">QR Code</span>
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Propriedades do elemento selecionado */}
            {selectedEl && (
              <div className="space-y-4 border-t pt-4">
                <h3 className="font-medium">Propriedades</h3>
                
                {selectedEl.type === 'text' && (
                  <div className="space-y-2">
                    <Label>Conteúdo</Label>
                    <Input
                      value={selectedEl.content}
                      onChange={(e) => updateElement(selectedEl.id, { content: e.target.value })}
                    />
                    
                    <Label>Tamanho da Fonte</Label>
                    <Input
                      type="number"
                      value={selectedEl.style.fontSize}
                      onChange={(e) => updateElementStyle(selectedEl.id, { fontSize: parseInt(e.target.value) })}
                    />
                    
                    <Label>Cor</Label>
                    <Input
                      type="color"
                      value={selectedEl.style.color}
                      onChange={(e) => updateElementStyle(selectedEl.id, { color: e.target.value })}
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>X</Label>
                    <Input
                      type="number"
                      value={selectedEl.x}
                      onChange={(e) => updateElement(selectedEl.id, { x: parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Y</Label>
                    <Input
                      type="number"
                      value={selectedEl.y}
                      onChange={(e) => updateElement(selectedEl.id, { y: parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteElement(selectedEl.id)}
                  className="w-full"
                >
                  Remover Elemento
                </Button>
              </div>
            )}
          </div>

          {/* Canvas Principal */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Canvas do Ingresso</h2>
                <div className="text-sm text-gray-500">420 x 150 px</div>
              </div>
              
              <div
                ref={canvasRef}
                className="relative border border-gray-300 bg-gray-50 mx-auto"
                style={{ width: '420px', height: '150px' }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => setSelectedElement(null)}
              >
                {/* Background do template */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 rounded"></div>
                
                {/* Elementos do design */}
                {elements.map((element) => (
                  <div
                    key={element.id}
                    className={`absolute cursor-move border-2 ${
                      selectedElement === element.id ? 'border-primary' : 'border-transparent'
                    }`}
                    style={{
                      left: element.x,
                      top: element.y,
                      width: element.width,
                      height: element.height,
                      fontSize: element.style.fontSize,
                      color: element.style.color,
                      backgroundColor: element.style.backgroundColor,
                      borderRadius: element.style.borderRadius,
                    }}
                    draggable
                    onDragStart={(e) => handleDragStart(e, element)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedElement(element.id);
                    }}
                  >
                    {element.type === 'text' && (
                      <div className="p-1 font-medium">{element.content}</div>
                    )}
                    {element.type === 'image' && (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs">
                        Imagem
                      </div>
                    )}
                    {element.type === 'qr' && (
                      <div className="w-full h-full bg-black flex items-center justify-center text-white text-xs">
                        QR
                      </div>
                    )}
                    {element.type === 'shape' && (
                      <div className="w-full h-full"></div>
                    )}
                  </div>
                ))}

                {/* Guias de alinhamento */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-blue-300 opacity-30"></div>
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-blue-300 opacity-30"></div>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-500 text-center">
                Clique e arraste os elementos para posicioná-los. Use as ferramentas da lateral para adicionar novos elementos.
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TicketDesigner;
