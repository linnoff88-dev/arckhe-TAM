// Types para o sistema TAM

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'nurse' | 'receptionist';
  avatar?: string;
  crm?: string; // Para médicos
  coren?: string; // Para enfermeiros
  phone?: string;
  specialization?: string;
}

export interface Patient {
  id: string;
  name: string;
  cpf: string;
  cns?: string; // Cartão Nacional de Saúde
  birthDate: string;
  gender: 'M' | 'F' | 'Outro';
  phone: string;
  email?: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  allergies?: string[];
  chronicDiseases?: string[];
  medications?: string[];
  bloodType?: string;
  photo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  duration: number; // em minutos
  type: 'presencial' | 'telemedicina';
  specialty: string;
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
  location?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VitalSigns {
  id: string;
  consultationId: string;
  patientId: string;
  timestamp: string;
  bloodPressure?: {
    systolic: number;
    diastolic: number;
  };
  heartRate?: number; // bpm
  temperature?: number; // celsius
  respiratoryRate?: number; // rpm
  oxygenSaturation?: number; // %
  weight?: number; // kg
  height?: number; // cm
  bmi?: number;
  glucose?: number; // mg/dL
  pain?: number; // escala 0-10
  recordedBy: string;
}

export interface Consultation {
  id: string;
  appointmentId?: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  type: 'presencial' | 'telemedicina';
  status: 'waiting' | 'in_progress' | 'completed' | 'cancelled';

  // Triagem
  chiefComplaint?: string; // Queixa principal
  symptoms?: string[];
  symptomDuration?: string;

  // Exame físico
  physicalExam?: string;

  // Sinais vitais
  vitalSigns?: VitalSigns;

  // Diagnóstico
  diagnosis?: string;
  icd10?: string[];

  // Prescrição
  prescriptions?: Prescription[];

  // Exames solicitados
  examRequests?: ExamRequest[];

  // Procedimentos
  procedures?: string[];

  // Observações
  observations?: string;

  // Anexos
  attachments?: Attachment[];

  // Encaminhamento
  referral?: {
    specialty: string;
    reason: string;
    urgency: 'routine' | 'priority' | 'urgent';
  };

  // Atestado
  medicalCertificate?: {
    days: number;
    cid: string;
    observations?: string;
  };

  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface Prescription {
  id: string;
  consultationId: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
  quantity?: number;
  continuousUse?: boolean;
}

export interface ExamRequest {
  id: string;
  consultationId: string;
  examType: string;
  examName: string;
  urgency: 'routine' | 'priority' | 'urgent';
  instructions?: string;
  requestDate: string;
  status: 'pending' | 'scheduled' | 'completed' | 'cancelled';
  result?: {
    date: string;
    summary: string;
    attachments: string[];
  };
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
  uploadedAt: string;
  uploadedBy: string;
}

export interface DashboardMetrics {
  todayAppointments: number;
  todayCompletedAppointments: number;
  waitingPatients: number;
  inProgressConsultations: number;
  totalPatientsMonth: number;
  totalPatientsYear: number;
  averageWaitTime: number; // minutos
  satisfactionRate: number; // %
}

export interface AppointmentStats {
  date: string;
  scheduled: number;
  completed: number;
  cancelled: number;
  noShow: number;
}

export interface Report {
  id: string;
  title: string;
  type: 'production' | 'patients' | 'appointments' | 'financial';
  period: {
    start: string;
    end: string;
  };
  generatedAt: string;
  generatedBy: string;
  data: any;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
