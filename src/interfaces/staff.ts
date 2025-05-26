
export interface StaffMember {
  id: string;
  eventId: string;
  name: string;
  email: string;
  phone?: string;
  role: 'supervisor' | 'operator';
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface StaffAuth {
  staffId: string;
  eventId: string;
  eventTitle: string;
  staffName: string;
  role: 'supervisor' | 'operator';
}

export interface CheckInRecord {
  id: string;
  ticketId: string;
  participantName: string;
  staffId: string;
  staffName: string;
  checkInTime: string;
  eventId: string;
}
