import {
  User,
  Patient,
  Appointment,
  Consultation,
  VitalSigns,
  Prescription,
  DashboardMetrics,
  AppointmentStats,
  Notification
} from '../types';

// Usuários (médicos, enfermeiros, etc)
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Carlos Silva',
    email: 'carlos.silva@tam.com',
    role: 'doctor',
    crm: 'CRM-SP 123456',
    phone: '(11) 98765-4321',
    specialization: 'Clínico Geral',
    avatar: 'https://i.pravatar.cc/150?img=12'
  },
  {
    id: '2',
    name: 'Dra. Maria Santos',
    email: 'maria.santos@tam.com',
    role: 'doctor',
    crm: 'CRM-SP 654321',
    phone: '(11) 98765-1234',
    specialization: 'Pediatria',
    avatar: 'https://i.pravatar.cc/150?img=47'
  },
  {
    id: '3',
    name: 'Dr. João Oliveira',
    email: 'joao.oliveira@tam.com',
    role: 'doctor',
    crm: 'CRM-SP 789012',
    phone: '(11) 98765-5678',
    specialization: 'Cardiologia',
    avatar: 'https://i.pravatar.cc/150?img=33'
  },
  {
    id: '4',
    name: 'Enf. Ana Paula',
    email: 'ana.paula@tam.com',
    role: 'nurse',
    coren: 'COREN-SP 456789',
    phone: '(11) 98765-9012',
    avatar: 'https://i.pravatar.cc/150?img=48'
  },
  {
    id: '5',
    name: 'Recep. Julia Costa',
    email: 'julia.costa@tam.com',
    role: 'receptionist',
    phone: '(11) 98765-3456',
    avatar: 'https://i.pravatar.cc/150?img=45'
  }
];

// Pacientes
export const mockPatients: Patient[] = [
  {
    id: 'p1',
    name: 'José da Silva',
    cpf: '123.456.789-00',
    cns: '123456789012345',
    birthDate: '1975-05-15',
    gender: 'M',
    phone: '(11) 91234-5678',
    email: 'jose.silva@email.com',
    address: {
      street: 'Rua das Flores',
      number: '123',
      complement: 'Apt 45',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567'
    },
    emergencyContact: {
      name: 'Maria Silva',
      relationship: 'Esposa',
      phone: '(11) 91234-8765'
    },
    allergies: ['Dipirona', 'Penicilina'],
    chronicDiseases: ['Hipertensão', 'Diabetes Tipo 2'],
    medications: ['Losartana 50mg', 'Metformina 850mg'],
    bloodType: 'O+',
    photo: 'https://i.pravatar.cc/150?img=60',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-10-20T15:30:00Z'
  },
  {
    id: 'p2',
    name: 'Maria Santos',
    cpf: '987.654.321-00',
    cns: '987654321098765',
    birthDate: '1988-08-22',
    gender: 'F',
    phone: '(11) 92345-6789',
    email: 'maria.santos@email.com',
    address: {
      street: 'Av. Paulista',
      number: '1000',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100'
    },
    emergencyContact: {
      name: 'João Santos',
      relationship: 'Marido',
      phone: '(11) 92345-9876'
    },
    allergies: [],
    chronicDiseases: [],
    medications: [],
    bloodType: 'A+',
    photo: 'https://i.pravatar.cc/150?img=44',
    createdAt: '2024-02-10T14:20:00Z',
    updatedAt: '2024-10-25T09:15:00Z'
  },
  {
    id: 'p3',
    name: 'Pedro Oliveira',
    cpf: '456.789.123-00',
    cns: '456789123045678',
    birthDate: '1995-03-10',
    gender: 'M',
    phone: '(11) 93456-7890',
    email: 'pedro.oliveira@email.com',
    address: {
      street: 'Rua Augusta',
      number: '500',
      neighborhood: 'Consolação',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01305-000'
    },
    allergies: ['Ácido Acetilsalicílico'],
    chronicDiseases: ['Asma'],
    medications: ['Bombinha de Salbutamol'],
    bloodType: 'B+',
    photo: 'https://i.pravatar.cc/150?img=15',
    createdAt: '2024-03-05T11:00:00Z',
    updatedAt: '2024-10-28T16:45:00Z'
  },
  {
    id: 'p4',
    name: 'Ana Costa',
    cpf: '321.654.987-00',
    cns: '321654987032165',
    birthDate: '2010-12-05',
    gender: 'F',
    phone: '(11) 94567-8901',
    email: 'ana.costa@email.com',
    address: {
      street: 'Rua Vergueiro',
      number: '2000',
      neighborhood: 'Vila Mariana',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '04101-000'
    },
    emergencyContact: {
      name: 'Carla Costa',
      relationship: 'Mãe',
      phone: '(11) 94567-1098'
    },
    allergies: [],
    chronicDiseases: [],
    medications: [],
    bloodType: 'AB+',
    photo: 'https://i.pravatar.cc/150?img=23',
    createdAt: '2024-04-12T08:30:00Z',
    updatedAt: '2024-10-29T10:20:00Z'
  },
  {
    id: 'p5',
    name: 'Roberto Ferreira',
    cpf: '789.123.456-00',
    cns: '789123456078912',
    birthDate: '1960-07-18',
    gender: 'M',
    phone: '(11) 95678-9012',
    email: 'roberto.ferreira@email.com',
    address: {
      street: 'Rua da Consolação',
      number: '1500',
      neighborhood: 'Consolação',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01301-100'
    },
    emergencyContact: {
      name: 'Lucia Ferreira',
      relationship: 'Filha',
      phone: '(11) 95678-2109'
    },
    allergies: [],
    chronicDiseases: ['Hipertensão', 'Colesterol Alto'],
    medications: ['Enalapril 10mg', 'Sinvastatina 20mg'],
    bloodType: 'O-',
    photo: 'https://i.pravatar.cc/150?img=51',
    createdAt: '2024-05-20T13:45:00Z',
    updatedAt: '2024-10-30T14:00:00Z'
  }
];

// Agendamentos
export const mockAppointments: Appointment[] = [
  {
    id: 'a1',
    patientId: 'p1',
    patientName: 'José da Silva',
    doctorId: '1',
    doctorName: 'Dr. Carlos Silva',
    date: '2025-10-30',
    time: '09:00',
    duration: 30,
    type: 'presencial',
    specialty: 'Clínico Geral',
    status: 'scheduled',
    location: 'Unidade Móvel 01 - Zona Leste',
    notes: 'Consulta de retorno - ajuste de medicação',
    createdAt: '2025-10-20T10:00:00Z',
    updatedAt: '2025-10-20T10:00:00Z'
  },
  {
    id: 'a2',
    patientId: 'p2',
    patientName: 'Maria Santos',
    doctorId: '2',
    doctorName: 'Dra. Maria Santos',
    date: '2025-10-30',
    time: '10:00',
    duration: 30,
    type: 'telemedicina',
    specialty: 'Pediatria',
    status: 'confirmed',
    notes: 'Primeira consulta',
    createdAt: '2025-10-22T14:20:00Z',
    updatedAt: '2025-10-28T09:00:00Z'
  },
  {
    id: 'a3',
    patientId: 'p3',
    patientName: 'Pedro Oliveira',
    doctorId: '1',
    doctorName: 'Dr. Carlos Silva',
    date: '2025-10-30',
    time: '11:00',
    duration: 30,
    type: 'presencial',
    specialty: 'Clínico Geral',
    status: 'in_progress',
    location: 'Unidade Móvel 01 - Zona Leste',
    notes: 'Paciente com sintomas gripais',
    createdAt: '2025-10-28T08:30:00Z',
    updatedAt: '2025-10-30T11:00:00Z'
  },
  {
    id: 'a4',
    patientId: 'p4',
    patientName: 'Ana Costa',
    doctorId: '2',
    doctorName: 'Dra. Maria Santos',
    date: '2025-10-30',
    time: '14:00',
    duration: 30,
    type: 'presencial',
    specialty: 'Pediatria',
    status: 'scheduled',
    location: 'Unidade Móvel 02 - Zona Sul',
    notes: 'Vacinação + consulta de rotina',
    createdAt: '2025-10-25T16:45:00Z',
    updatedAt: '2025-10-25T16:45:00Z'
  },
  {
    id: 'a5',
    patientId: 'p5',
    patientName: 'Roberto Ferreira',
    doctorId: '3',
    doctorName: 'Dr. João Oliveira',
    date: '2025-10-30',
    time: '15:00',
    duration: 45,
    type: 'telemedicina',
    specialty: 'Cardiologia',
    status: 'scheduled',
    notes: 'Consulta de acompanhamento cardiológico',
    createdAt: '2025-10-27T10:20:00Z',
    updatedAt: '2025-10-27T10:20:00Z'
  },
  {
    id: 'a6',
    patientId: 'p1',
    patientName: 'José da Silva',
    doctorId: '1',
    doctorName: 'Dr. Carlos Silva',
    date: '2025-10-31',
    time: '09:00',
    duration: 30,
    type: 'presencial',
    specialty: 'Clínico Geral',
    status: 'scheduled',
    location: 'Unidade Móvel 01 - Zona Leste',
    createdAt: '2025-10-29T15:00:00Z',
    updatedAt: '2025-10-29T15:00:00Z'
  },
  {
    id: 'a7',
    patientId: 'p2',
    patientName: 'Maria Santos',
    doctorId: '1',
    doctorName: 'Dr. Carlos Silva',
    date: '2025-11-02',
    time: '10:30',
    duration: 30,
    type: 'telemedicina',
    specialty: 'Clínico Geral',
    status: 'scheduled',
    createdAt: '2025-10-29T16:30:00Z',
    updatedAt: '2025-10-29T16:30:00Z'
  }
];

// Consultas
export const mockConsultations: Consultation[] = [
  {
    id: 'c1',
    appointmentId: 'a1',
    patientId: 'p1',
    patientName: 'José da Silva',
    doctorId: '1',
    doctorName: 'Dr. Carlos Silva',
    date: '2025-10-15',
    type: 'presencial',
    status: 'completed',
    chiefComplaint: 'Dor de cabeça e tontura',
    symptoms: ['Dor de cabeça', 'Tontura', 'Náusea'],
    symptomDuration: '3 dias',
    physicalExam: 'Paciente consciente, orientado. Mucosas hidratadas. AC: RCR 2T BNF. AP: MVU sem RA.',
    vitalSigns: {
      id: 'vs1',
      consultationId: 'c1',
      patientId: 'p1',
      timestamp: '2025-10-15T09:15:00Z',
      bloodPressure: { systolic: 150, diastolic: 95 },
      heartRate: 82,
      temperature: 36.5,
      respiratoryRate: 16,
      oxygenSaturation: 98,
      weight: 85,
      height: 175,
      bmi: 27.8,
      glucose: 145,
      recordedBy: 'Enf. Ana Paula'
    },
    diagnosis: 'Hipertensão arterial sistêmica descompensada',
    icd10: ['I10'],
    prescriptions: [
      {
        id: 'pr1',
        consultationId: 'c1',
        medication: 'Losartana Potássica',
        dosage: '50mg',
        frequency: '1x ao dia',
        duration: '30 dias',
        instructions: 'Tomar pela manhã, em jejum',
        quantity: 30,
        continuousUse: true
      },
      {
        id: 'pr2',
        consultationId: 'c1',
        medication: 'Hidroclorotiazida',
        dosage: '25mg',
        frequency: '1x ao dia',
        duration: '30 dias',
        instructions: 'Tomar junto com Losartana',
        quantity: 30,
        continuousUse: true
      }
    ],
    examRequests: [
      {
        id: 'ex1',
        consultationId: 'c1',
        examType: 'Laboratorial',
        examName: 'Hemograma completo + Glicemia + Colesterol total e frações',
        urgency: 'routine',
        requestDate: '2025-10-15',
        status: 'pending'
      }
    ],
    observations: 'Orientado sobre dieta hipossódica e controle de peso. Retorno em 30 dias com exames.',
    createdAt: '2025-10-15T09:00:00Z',
    updatedAt: '2025-10-15T09:45:00Z',
    completedAt: '2025-10-15T09:45:00Z'
  },
  {
    id: 'c2',
    patientId: 'p3',
    patientName: 'Pedro Oliveira',
    doctorId: '1',
    doctorName: 'Dr. Carlos Silva',
    date: '2025-10-20',
    type: 'telemedicina',
    status: 'completed',
    chiefComplaint: 'Tosse e falta de ar',
    symptoms: ['Tosse seca', 'Dispneia', 'Chiado no peito'],
    symptomDuration: '2 dias',
    diagnosis: 'Crise asmática leve',
    icd10: ['J45.9'],
    prescriptions: [
      {
        id: 'pr3',
        consultationId: 'c2',
        medication: 'Salbutamol (Aerolin)',
        dosage: '100mcg',
        frequency: '2 puffs a cada 6h se necessário',
        duration: '7 dias',
        instructions: 'Usar com espaçador',
        continuousUse: false
      },
      {
        id: 'pr4',
        consultationId: 'c2',
        medication: 'Prednisolona',
        dosage: '20mg',
        frequency: '1x ao dia',
        duration: '5 dias',
        instructions: 'Tomar após café da manhã',
        quantity: 5,
        continuousUse: false
      }
    ],
    observations: 'Orientado a evitar exposição a alérgenos. Retornar se piorar.',
    createdAt: '2025-10-20T14:00:00Z',
    updatedAt: '2025-10-20T14:30:00Z',
    completedAt: '2025-10-20T14:30:00Z'
  }
];

// Métricas do Dashboard
export const mockDashboardMetrics: DashboardMetrics = {
  todayAppointments: 7,
  todayCompletedAppointments: 2,
  waitingPatients: 1,
  inProgressConsultations: 1,
  totalPatientsMonth: 245,
  totalPatientsYear: 2847,
  averageWaitTime: 15,
  satisfactionRate: 92
};

// Estatísticas de agendamentos (últimos 7 dias)
export const mockAppointmentStats: AppointmentStats[] = [
  { date: '2025-10-24', scheduled: 12, completed: 10, cancelled: 1, noShow: 1 },
  { date: '2025-10-25', scheduled: 15, completed: 14, cancelled: 1, noShow: 0 },
  { date: '2025-10-26', scheduled: 10, completed: 9, cancelled: 0, noShow: 1 },
  { date: '2025-10-27', scheduled: 8, completed: 8, cancelled: 0, noShow: 0 },
  { date: '2025-10-28', scheduled: 13, completed: 11, cancelled: 2, noShow: 0 },
  { date: '2025-10-29', scheduled: 16, completed: 14, cancelled: 1, noShow: 1 },
  { date: '2025-10-30', scheduled: 7, completed: 2, cancelled: 0, noShow: 0 }
];

// Notificações
export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'warning',
    title: 'Paciente aguardando',
    message: 'José da Silva está aguardando atendimento há 20 minutos',
    read: false,
    createdAt: '2025-10-30T11:20:00Z',
    link: '/patients/p1'
  },
  {
    id: 'n2',
    type: 'info',
    title: 'Novo agendamento',
    message: 'Maria Santos agendou consulta para amanhã às 10h',
    read: false,
    createdAt: '2025-10-30T10:30:00Z',
    link: '/appointments/a6'
  },
  {
    id: 'n3',
    type: 'success',
    title: 'Consulta finalizada',
    message: 'Consulta de Pedro Oliveira foi finalizada com sucesso',
    read: true,
    createdAt: '2025-10-30T09:45:00Z',
    link: '/consultations/c2'
  }
];
