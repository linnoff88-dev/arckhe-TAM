// Serviços de API Mock para demonstração

import {
  mockUsers,
  mockPatients,
  mockAppointments,
  mockConsultations,
  mockDashboardMetrics,
  mockAppointmentStats,
  mockNotifications
} from '../data/mockData';

import {
  User,
  Patient,
  Appointment,
  Consultation,
  DashboardMetrics,
  AppointmentStats,
  Notification,
  ApiResponse,
  PaginatedResponse
} from '../types';

// Simula delay de rede
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Helper para simular erro ocasional (5% de chance)
const shouldSimulateError = () => Math.random() < 0.05;

// ========== AUTH API ==========
export const authApi = {
  login: async (email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> => {
    await delay(800);

    // Mock: aceita qualquer senha para demo
    const user = mockUsers.find(u => u.email === email);

    if (!user) {
      return {
        success: false,
        error: 'Usuário não encontrado'
      };
    }

    return {
      success: true,
      data: {
        user,
        token: 'mock-jwt-token-' + Date.now()
      }
    };
  },

  logout: async (): Promise<ApiResponse<void>> => {
    await delay(300);
    return { success: true };
  },

  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    await delay(400);
    return {
      success: true,
      data: mockUsers[0] // Mock: sempre retorna o primeiro usuário
    };
  }
};

// ========== PATIENTS API ==========
export const patientsApi = {
  getAll: async (params?: {
    page?: number;
    pageSize?: number;
    search?: string;
  }): Promise<ApiResponse<PaginatedResponse<Patient>>> => {
    await delay();

    let filtered = [...mockPatients];

    // Filtrar por busca
    if (params?.search) {
      const search = params.search.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(search) ||
        p.cpf.includes(search) ||
        p.cns?.includes(search)
      );
    }

    // Paginação
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedData = filtered.slice(start, end);

    return {
      success: true,
      data: {
        data: paginatedData,
        total: filtered.length,
        page,
        pageSize,
        totalPages: Math.ceil(filtered.length / pageSize)
      }
    };
  },

  getById: async (id: string): Promise<ApiResponse<Patient>> => {
    await delay();

    const patient = mockPatients.find(p => p.id === id);

    if (!patient) {
      return {
        success: false,
        error: 'Paciente não encontrado'
      };
    }

    return {
      success: true,
      data: patient
    };
  },

  create: async (patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Patient>> => {
    await delay(1000);

    if (shouldSimulateError()) {
      return {
        success: false,
        error: 'Erro ao criar paciente. Tente novamente.'
      };
    }

    const newPatient: Patient = {
      ...patient,
      id: 'p' + (mockPatients.length + 1),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    mockPatients.push(newPatient);

    return {
      success: true,
      data: newPatient,
      message: 'Paciente criado com sucesso!'
    };
  },

  update: async (id: string, patient: Partial<Patient>): Promise<ApiResponse<Patient>> => {
    await delay(800);

    const index = mockPatients.findIndex(p => p.id === id);

    if (index === -1) {
      return {
        success: false,
        error: 'Paciente não encontrado'
      };
    }

    mockPatients[index] = {
      ...mockPatients[index],
      ...patient,
      updatedAt: new Date().toISOString()
    };

    return {
      success: true,
      data: mockPatients[index],
      message: 'Paciente atualizado com sucesso!'
    };
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    await delay(600);

    const index = mockPatients.findIndex(p => p.id === id);

    if (index === -1) {
      return {
        success: false,
        error: 'Paciente não encontrado'
      };
    }

    mockPatients.splice(index, 1);

    return {
      success: true,
      message: 'Paciente removido com sucesso!'
    };
  },

  getConsultationHistory: async (patientId: string): Promise<ApiResponse<Consultation[]>> => {
    await delay();

    const consultations = mockConsultations.filter(c => c.patientId === patientId);

    return {
      success: true,
      data: consultations
    };
  }
};

// ========== APPOINTMENTS API ==========
export const appointmentsApi = {
  getAll: async (params?: {
    page?: number;
    pageSize?: number;
    date?: string;
    status?: string;
    doctorId?: string;
  }): Promise<ApiResponse<PaginatedResponse<Appointment>>> => {
    await delay();

    let filtered = [...mockAppointments];

    // Filtros
    if (params?.date) {
      filtered = filtered.filter(a => a.date === params.date);
    }
    if (params?.status) {
      filtered = filtered.filter(a => a.status === params.status);
    }
    if (params?.doctorId) {
      filtered = filtered.filter(a => a.doctorId === params.doctorId);
    }

    // Ordenar por data e hora
    filtered.sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });

    // Paginação
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 20;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedData = filtered.slice(start, end);

    return {
      success: true,
      data: {
        data: paginatedData,
        total: filtered.length,
        page,
        pageSize,
        totalPages: Math.ceil(filtered.length / pageSize)
      }
    };
  },

  getById: async (id: string): Promise<ApiResponse<Appointment>> => {
    await delay();

    const appointment = mockAppointments.find(a => a.id === id);

    if (!appointment) {
      return {
        success: false,
        error: 'Agendamento não encontrado'
      };
    }

    return {
      success: true,
      data: appointment
    };
  },

  create: async (appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Appointment>> => {
    await delay(1000);

    const newAppointment: Appointment = {
      ...appointment,
      id: 'a' + (mockAppointments.length + 1),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    mockAppointments.push(newAppointment);

    return {
      success: true,
      data: newAppointment,
      message: 'Agendamento criado com sucesso!'
    };
  },

  update: async (id: string, appointment: Partial<Appointment>): Promise<ApiResponse<Appointment>> => {
    await delay(800);

    const index = mockAppointments.findIndex(a => a.id === id);

    if (index === -1) {
      return {
        success: false,
        error: 'Agendamento não encontrado'
      };
    }

    mockAppointments[index] = {
      ...mockAppointments[index],
      ...appointment,
      updatedAt: new Date().toISOString()
    };

    return {
      success: true,
      data: mockAppointments[index],
      message: 'Agendamento atualizado com sucesso!'
    };
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    await delay(600);

    const index = mockAppointments.findIndex(a => a.id === id);

    if (index === -1) {
      return {
        success: false,
        error: 'Agendamento não encontrado'
      };
    }

    mockAppointments.splice(index, 1);

    return {
      success: true,
      message: 'Agendamento cancelado com sucesso!'
    };
  },

  updateStatus: async (id: string, status: Appointment['status']): Promise<ApiResponse<Appointment>> => {
    await delay(500);

    const index = mockAppointments.findIndex(a => a.id === id);

    if (index === -1) {
      return {
        success: false,
        error: 'Agendamento não encontrado'
      };
    }

    mockAppointments[index].status = status;
    mockAppointments[index].updatedAt = new Date().toISOString();

    return {
      success: true,
      data: mockAppointments[index]
    };
  }
};

// ========== CONSULTATIONS API ==========
export const consultationsApi = {
  getAll: async (params?: {
    page?: number;
    pageSize?: number;
    status?: string;
  }): Promise<ApiResponse<PaginatedResponse<Consultation>>> => {
    await delay();

    let filtered = [...mockConsultations];

    if (params?.status) {
      filtered = filtered.filter(c => c.status === params.status);
    }

    const page = params?.page || 1;
    const pageSize = params?.pageSize || 20;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedData = filtered.slice(start, end);

    return {
      success: true,
      data: {
        data: paginatedData,
        total: filtered.length,
        page,
        pageSize,
        totalPages: Math.ceil(filtered.length / pageSize)
      }
    };
  },

  getById: async (id: string): Promise<ApiResponse<Consultation>> => {
    await delay();

    const consultation = mockConsultations.find(c => c.id === id);

    if (!consultation) {
      return {
        success: false,
        error: 'Consulta não encontrada'
      };
    }

    return {
      success: true,
      data: consultation
    };
  },

  create: async (consultation: Omit<Consultation, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Consultation>> => {
    await delay(1000);

    const newConsultation: Consultation = {
      ...consultation,
      id: 'c' + (mockConsultations.length + 1),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    mockConsultations.push(newConsultation);

    return {
      success: true,
      data: newConsultation,
      message: 'Consulta iniciada com sucesso!'
    };
  },

  update: async (id: string, consultation: Partial<Consultation>): Promise<ApiResponse<Consultation>> => {
    await delay(800);

    const index = mockConsultations.findIndex(c => c.id === id);

    if (index === -1) {
      return {
        success: false,
        error: 'Consulta não encontrada'
      };
    }

    mockConsultations[index] = {
      ...mockConsultations[index],
      ...consultation,
      updatedAt: new Date().toISOString()
    };

    return {
      success: true,
      data: mockConsultations[index],
      message: 'Consulta atualizada com sucesso!'
    };
  },

  complete: async (id: string): Promise<ApiResponse<Consultation>> => {
    await delay(1000);

    const index = mockConsultations.findIndex(c => c.id === id);

    if (index === -1) {
      return {
        success: false,
        error: 'Consulta não encontrada'
      };
    }

    mockConsultations[index].status = 'completed';
    mockConsultations[index].completedAt = new Date().toISOString();
    mockConsultations[index].updatedAt = new Date().toISOString();

    return {
      success: true,
      data: mockConsultations[index],
      message: 'Consulta finalizada com sucesso!'
    };
  }
};

// ========== DASHBOARD API ==========
export const dashboardApi = {
  getMetrics: async (): Promise<ApiResponse<DashboardMetrics>> => {
    await delay();

    return {
      success: true,
      data: mockDashboardMetrics
    };
  },

  getAppointmentStats: async (days: number = 7): Promise<ApiResponse<AppointmentStats[]>> => {
    await delay();

    // Retorna os últimos N dias
    return {
      success: true,
      data: mockAppointmentStats.slice(-days)
    };
  }
};

// ========== NOTIFICATIONS API ==========
export const notificationsApi = {
  getAll: async (): Promise<ApiResponse<Notification[]>> => {
    await delay(300);

    return {
      success: true,
      data: mockNotifications
    };
  },

  markAsRead: async (id: string): Promise<ApiResponse<void>> => {
    await delay(200);

    const notification = mockNotifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
    }

    return {
      success: true
    };
  },

  markAllAsRead: async (): Promise<ApiResponse<void>> => {
    await delay(300);

    mockNotifications.forEach(n => n.read = true);

    return {
      success: true
    };
  }
};

// ========== USERS API ==========
export const usersApi = {
  getAll: async (): Promise<ApiResponse<User[]>> => {
    await delay();

    return {
      success: true,
      data: mockUsers
    };
  },

  getDoctors: async (): Promise<ApiResponse<User[]>> => {
    await delay();

    return {
      success: true,
      data: mockUsers.filter(u => u.role === 'doctor')
    };
  }
};
