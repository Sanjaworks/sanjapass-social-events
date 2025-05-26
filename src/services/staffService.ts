
import { StaffMember, StaffAuth, CheckInRecord } from '@/interfaces/staff';

// Mock data para demonstração
const mockStaff: StaffMember[] = [
  {
    id: '1',
    eventId: '1',
    name: 'João Silva',
    email: 'joao@staff.com',
    phone: '(12) 99999-9999',
    role: 'supervisor',
    isActive: true,
    createdAt: '2025-03-01T10:00:00',
    lastLogin: '2025-03-15T08:30:00'
  }
];

const mockCheckIns: CheckInRecord[] = [];

class StaffService {
  // Staff Management
  async getEventStaff(eventId: string): Promise<StaffMember[]> {
    return mockStaff.filter(staff => staff.eventId === eventId);
  }

  async createStaffMember(eventId: string, staffData: Omit<StaffMember, 'id' | 'eventId' | 'createdAt' | 'isActive'>): Promise<StaffMember> {
    const newStaff: StaffMember = {
      ...staffData,
      id: Date.now().toString(),
      eventId,
      isActive: true,
      createdAt: new Date().toISOString()
    };
    mockStaff.push(newStaff);
    return newStaff;
  }

  async updateStaffMember(staffId: string, staffData: Partial<StaffMember>): Promise<StaffMember | null> {
    const staffIndex = mockStaff.findIndex(staff => staff.id === staffId);
    if (staffIndex === -1) return null;
    
    mockStaff[staffIndex] = { ...mockStaff[staffIndex], ...staffData };
    return mockStaff[staffIndex];
  }

  async deleteStaffMember(staffId: string): Promise<boolean> {
    const staffIndex = mockStaff.findIndex(staff => staff.id === staffId);
    if (staffIndex === -1) return false;
    
    mockStaff.splice(staffIndex, 1);
    return true;
  }

  // Staff Authentication
  async staffLogin(email: string, password: string): Promise<StaffAuth | null> {
    // Simular verificação de login
    const staff = mockStaff.find(s => s.email === email && s.isActive);
    if (!staff) return null;

    // Atualizar último login
    staff.lastLogin = new Date().toISOString();

    return {
      staffId: staff.id,
      eventId: staff.eventId,
      eventTitle: 'Festival SanjaMusic 2025', // Mock
      staffName: staff.name,
      role: staff.role
    };
  }

  // Check-in Management
  async performCheckIn(ticketId: string, staffAuth: StaffAuth): Promise<CheckInRecord> {
    const checkInRecord: CheckInRecord = {
      id: Date.now().toString(),
      ticketId,
      participantName: 'Maria Silva', // Mock - seria obtido do ticket
      staffId: staffAuth.staffId,
      staffName: staffAuth.staffName,
      checkInTime: new Date().toISOString(),
      eventId: staffAuth.eventId
    };
    
    mockCheckIns.push(checkInRecord);
    return checkInRecord;
  }

  async getCheckInHistory(eventId: string): Promise<CheckInRecord[]> {
    return mockCheckIns.filter(record => record.eventId === eventId);
  }

  // Envio de credenciais por email (mock)
  async sendStaffCredentials(staffMember: StaffMember, temporaryPassword: string): Promise<boolean> {
    console.log(`Enviando credenciais para ${staffMember.email}:`);
    console.log(`Email: ${staffMember.email}`);
    console.log(`Senha temporária: ${temporaryPassword}`);
    console.log(`Acesso: /staff/login`);
    return true;
  }
}

export const staffService = new StaffService();
