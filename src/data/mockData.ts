
export interface Event {
  id: string;
  title: string;
  description: string;
  bannerUrl: string;
  location: {
    name: string;
    address: string;
    city: string;
    state: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  date: string; // ISO date string
  startTime: string;
  endTime: string;
  category: string;
  organizer: {
    id: string;
    name: string;
  };
  tickets: Ticket[];
  gallery: Photo[];
}

export interface Ticket {
  id: string;
  name: string;
  price: number;
  quantity: number;
  remaining: number;
  batch: string;
  description?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  photoUrl: string;
  role: 'customer' | 'organizer' | 'admin';
  tickets: PurchasedTicket[];
}

export interface PurchasedTicket {
  id: string;
  eventId: string;
  eventTitle: string;
  ticketId: string;
  ticketName: string;
  price: number;
  purchaseDate: string;
  status: 'active' | 'used' | 'cancelled';
  qrCode: string;
  observation?: string;
}

export interface Photo {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  photoUrl: string;
  caption?: string;
  likes: number;
  uploadDate: string;
}

// Mock Events Data
export const events: Event[] = [
  {
    id: '1',
    title: 'Festival SanjaMusic 2025',
    description: 'O maior festival de música de São José dos Campos! Três dias de shows com os melhores artistas nacionais e internacionais em um ambiente incrível com muita música, arte e diversão para todos os gostos.',
    bannerUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    location: {
      name: 'Parque da Cidade',
      address: 'Avenida Olivo Gomes, 100',
      city: 'São José dos Campos',
      state: 'SP',
      coordinates: {
        lat: -23.221112,
        lng: -45.908814,
      },
    },
    date: '2025-07-15',
    startTime: '16:00',
    endTime: '23:00',
    category: 'music',
    organizer: {
      id: '1',
      name: 'EventPro Produções',
    },
    tickets: [
      {
        id: '101',
        name: 'Ingresso Comum',
        price: 150,
        quantity: 5000,
        remaining: 2340,
        batch: '1º Lote',
      },
      {
        id: '102',
        name: 'Ingresso VIP',
        price: 300,
        quantity: 1000,
        remaining: 430,
        batch: '1º Lote',
        description: 'Área exclusiva com open bar',
      },
      {
        id: '103',
        name: 'Camarote Premium',
        price: 500,
        quantity: 200,
        remaining: 45,
        batch: 'Lote Único',
        description: 'Acesso ao camarote com open bar e food',
      },
    ],
    gallery: [
      {
        id: '201',
        eventId: '1',
        userId: '1001',
        userName: 'Maria Silva',
        photoUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        caption: 'Melhor show da minha vida!',
        likes: 45,
        uploadDate: '2024-07-16T14:22:00Z',
      },
      {
        id: '202',
        eventId: '1',
        userId: '1002',
        userName: 'João Pereira',
        photoUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        likes: 32,
        uploadDate: '2024-07-16T18:15:00Z',
      },
      {
        id: '203',
        eventId: '1',
        userId: '1003',
        userName: 'Ana Souza',
        photoUrl: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        caption: 'Noite inesquecível!',
        likes: 78,
        uploadDate: '2024-07-17T10:05:00Z',
      },
    ],
  },
  {
    id: '2',
    title: 'Congresso Tech+',
    description: 'O maior congresso de tecnologia do Vale do Paraíba. Palestras, workshops e networking com os principais nomes do mercado de tecnologia do Brasil e do mundo.',
    bannerUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    location: {
      name: 'Centro de Convenções',
      address: 'Av. São João, 2200',
      city: 'São José dos Campos',
      state: 'SP',
      coordinates: {
        lat: -23.179076,
        lng: -45.884109,
      },
    },
    date: '2025-06-10',
    startTime: '08:00',
    endTime: '18:00',
    category: 'business',
    organizer: {
      id: '2',
      name: 'TechVale Group',
    },
    tickets: [
      {
        id: '201',
        name: 'Credencial Basic',
        price: 290,
        quantity: 1000,
        remaining: 320,
        batch: '2º Lote',
      },
      {
        id: '202',
        name: 'Credencial Full',
        price: 590,
        quantity: 500,
        remaining: 125,
        batch: '2º Lote',
        description: 'Acesso a todas as palestras e workshops',
      },
      {
        id: '203',
        name: 'Credencial Premium',
        price: 990,
        quantity: 100,
        remaining: 15,
        batch: 'Lote Final',
        description: 'Acesso completo + networking dinner + certificado',
      },
    ],
    gallery: [
      {
        id: '204',
        eventId: '2',
        userId: '1004',
        userName: 'Carlos Mendes',
        photoUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        caption: 'Palestra incrível sobre IA!',
        likes: 54,
        uploadDate: '2024-06-10T16:22:00Z',
      },
      {
        id: '205',
        eventId: '2',
        userId: '1005',
        userName: 'Patricia Lima',
        photoUrl: 'https://images.unsplash.com/photo-1558008258-3256797b43f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1331&q=80',
        caption: 'Networking de alto nível!',
        likes: 41,
        uploadDate: '2024-06-11T09:15:00Z',
      },
    ],
  },
  {
    id: '3',
    title: 'Stand-Up Night',
    description: 'Uma noite de muitas risadas com os melhores comediantes do Brasil. Venha se divertir com a melhor comédia stand-up em um ambiente descontraído e animado.',
    bannerUrl: 'https://images.unsplash.com/photo-1586523969132-7e160b554ae2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1253&q=80',
    location: {
      name: 'Teatro Municipal',
      address: 'Rua Rubião Júnior, 84',
      city: 'São José dos Campos',
      state: 'SP',
      coordinates: {
        lat: -23.194254,
        lng: -45.901537,
      },
    },
    date: '2025-08-25',
    startTime: '20:00',
    endTime: '22:30',
    category: 'comedy',
    organizer: {
      id: '3',
      name: 'Risos Produções',
    },
    tickets: [
      {
        id: '301',
        name: 'Plateia',
        price: 80,
        quantity: 300,
        remaining: 145,
        batch: '1º Lote',
      },
      {
        id: '302',
        name: 'Plateia VIP',
        price: 120,
        quantity: 100,
        remaining: 37,
        batch: '1º Lote',
        description: 'Primeiras fileiras com melhor visão',
      },
    ],
    gallery: [
      {
        id: '206',
        eventId: '3',
        userId: '1006',
        userName: 'Fernanda Castro',
        photoUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        caption: 'Noite de risadas!',
        likes: 67,
        uploadDate: '2024-08-26T10:42:00Z',
      },
      {
        id: '207',
        eventId: '3',
        userId: '1007',
        userName: 'Rafael Santos',
        photoUrl: 'https://images.unsplash.com/photo-1606639401613-4ed1e5c63c97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        likes: 30,
        uploadDate: '2024-08-26T09:15:00Z',
      },
    ],
  },
];

// Mock Users Data
export const users: User[] = [
  {
    id: '1001',
    name: 'Maria Silva',
    email: 'maria@example.com',
    cpf: '123.456.789-00',
    photoUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
    role: 'customer',
    tickets: [
      {
        id: 'pur101',
        eventId: '1',
        eventTitle: 'Festival SanjaMusic 2025',
        ticketId: '101',
        ticketName: 'Ingresso Comum',
        price: 150,
        purchaseDate: '2024-05-12T10:22:00Z',
        status: 'active',
        qrCode: 'pur101-qrcode',
      },
      {
        id: 'pur102',
        eventId: '2',
        eventTitle: 'Congresso Tech+',
        ticketId: '201',
        ticketName: 'Credencial Basic',
        price: 290,
        purchaseDate: '2024-04-15T14:30:00Z',
        status: 'active',
        qrCode: 'pur102-qrcode',
      },
    ],
  },
  {
    id: '1002',
    name: 'João Pereira',
    email: 'joao@example.com',
    cpf: '987.654.321-00',
    photoUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
    role: 'customer',
    tickets: [
      {
        id: 'pur103',
        eventId: '1',
        eventTitle: 'Festival SanjaMusic 2025',
        ticketId: '102',
        ticketName: 'Ingresso VIP',
        price: 300,
        purchaseDate: '2024-05-10T09:15:00Z',
        status: 'active',
        qrCode: 'pur103-qrcode',
      },
    ],
  },
  {
    id: '2001',
    name: 'Ana Oliveira',
    email: 'ana@eventpro.com',
    cpf: '111.222.333-44',
    photoUrl: 'https://randomuser.me/api/portraits/women/34.jpg',
    role: 'organizer',
    tickets: [],
  },
  {
    id: '3001',
    name: 'Carlos Admin',
    email: 'admin@sanjapass.com',
    cpf: '555.666.777-88',
    photoUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
    role: 'admin',
    tickets: [],
  },
];

// More Gallery Photos
export const galleryPhotos: Photo[] = [
  {
    id: '301',
    eventId: '1',
    userId: '1001',
    userName: 'Maria Silva',
    photoUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    caption: 'Momentos inesquecíveis',
    likes: 87,
    uploadDate: '2024-07-16T15:30:00Z',
  },
  {
    id: '302',
    eventId: '1',
    userId: '1002',
    userName: 'João Pereira',
    photoUrl: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    likes: 54,
    uploadDate: '2024-07-16T17:45:00Z',
  },
  {
    id: '303',
    eventId: '1',
    userId: '1003',
    userName: 'Ana Souza',
    photoUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    caption: 'Show incrível!',
    likes: 92,
    uploadDate: '2024-07-17T09:15:00Z',
  },
  {
    id: '304',
    eventId: '2',
    userId: '1004',
    userName: 'Carlos Mendes',
    photoUrl: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    caption: 'Palestra inspiradora',
    likes: 61,
    uploadDate: '2024-06-10T19:22:00Z',
  },
  {
    id: '305',
    eventId: '2',
    userId: '1005',
    userName: 'Patricia Lima',
    photoUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    caption: 'Conheci pessoas incríveis!',
    likes: 49,
    uploadDate: '2024-06-11T10:30:00Z',
  },
  {
    id: '306',
    eventId: '3',
    userId: '1006',
    userName: 'Fernanda Castro',
    photoUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    caption: 'Melhor stand-up!',
    likes: 73,
    uploadDate: '2024-08-26T11:15:00Z',
  },
];

// Generate a mock QR code URL
export const generateQRCode = (ticketId: string) => {
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${ticketId}`;
};
