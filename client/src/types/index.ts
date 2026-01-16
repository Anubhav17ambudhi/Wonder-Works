export type UserRole = 'admin' | 'supervisor' | 'citizen';

export type ComplaintStatus = 'pending' | 'in_progress' | 'resolved' | 'escalated';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  areaId?: string;
}

export interface Area {
  id: string;
  name: string;
  localities: Locality[];
}

export interface Locality {
  id: string;
  name: string;
  areaId: string;
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  status: ComplaintStatus;
  areaId: string;
  localityId: string;
  citizenName: string;
  citizenEmail: string;
  citizenPhone: string;
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
  resolvedAt?: Date;
  priority: 'low' | 'medium' | 'high';
}

export interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  createdAt: Date;
}

export interface DashboardStats {
  totalComplaints: number;
  pendingComplaints: number;
  resolvedComplaints: number;
  escalatedComplaints: number;
  inProgressComplaints: number;
}
