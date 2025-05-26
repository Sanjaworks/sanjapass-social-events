
export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  duration: string;
  location: {
    name: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  capacity: number;
  status: 'draft' | 'published' | 'active' | 'completed' | 'cancelled';
  imageUrl: string;
  organizerId: string;
  organizerName: string;
  tickets: Ticket[];
  salesChannels: SalesChannel[];
  createdAt: string;
  updatedAt: string;
}

export interface Ticket {
  id: string;
  eventId: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  remaining: number;
  batch: string;
  salesStart: string;
  salesEnd: string;
  isActive: boolean;
  category: 'standard' | 'vip' | 'early-bird' | 'student' | 'group';
}

export interface SalesChannel {
  id: string;
  eventId: string;
  name: string;
  type: 'online' | 'physical' | 'partner';
  status: 'active' | 'inactive';
  commission: number;
  contactPerson?: string;
  phone?: string;
  email?: string;
  address?: string;
  credentials?: {
    username?: string;
    password?: string;
    apiKey?: string;
  };
}

export interface FinancialSummary {
  eventId: string;
  totalRevenue: number;
  totalSales: number;
  totalFees: number;
  netRevenue: number;
  ticketsSold: number;
  ticketsRemaining: number;
  salesByChannel: {
    channelId: string;
    channelName: string;
    sales: number;
    revenue: number;
    tickets: number;
  }[];
  salesByTicketType: {
    ticketId: string;
    ticketName: string;
    sold: number;
    revenue: number;
  }[];
}

export interface Sale {
  id: string;
  eventId: string;
  ticketId: string;
  channelId: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  fees: number;
  netAmount: number;
  paymentStatus: 'pending' | 'paid' | 'refunded' | 'cancelled';
  paymentMethod: string;
  saleDate: string;
  checkInStatus: 'pending' | 'checked-in';
  checkInDate?: string;
}
