export interface PaymentMethod {
  id: string;
  name: string;
  provider: string;
  type: 'credit_card' | 'bank_transfer' | 'digital_wallet' | 'cash';
  status: 'active' | 'inactive';
  isDefault: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualifications: string;
  experience: string;
  education: string;
  rating: number;
}

export interface Appointment {
  id: string;
  userId: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  reason: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  paymentMethodId?: string;
  paymentStatus?: 'pending' | 'paid' | 'failed';
}
