import { create } from 'zustand';
import { Appointment } from '../types';
import { appointmentsApi } from '../services/api';

interface AppointmentState {
  appointments: Appointment[];
  selectedAppointment: Appointment | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchAppointments: (params?: { date?: string; status?: string; doctorId?: string }) => Promise<void>;
  fetchAppointmentById: (id: string) => Promise<void>;
  createAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => Promise<boolean>;
  updateAppointment: (id: string, appointment: Partial<Appointment>) => Promise<boolean>;
  updateStatus: (id: string, status: Appointment['status']) => Promise<boolean>;
  deleteAppointment: (id: string) => Promise<boolean>;
  setSelectedAppointment: (appointment: Appointment | null) => void;
  clearError: () => void;
}

export const useAppointmentStore = create<AppointmentState>((set, get) => ({
  appointments: [],
  selectedAppointment: null,
  loading: false,
  error: null,

  fetchAppointments: async (params) => {
    set({ loading: true, error: null });

    try {
      const response = await appointmentsApi.getAll(params);

      if (response.success && response.data) {
        set({ appointments: response.data.data, loading: false });
      } else {
        set({ error: response.error || 'Erro ao carregar agendamentos', loading: false });
      }
    } catch (error) {
      set({ error: 'Erro ao carregar agendamentos', loading: false });
    }
  },

  fetchAppointmentById: async (id) => {
    set({ loading: true, error: null });

    try {
      const response = await appointmentsApi.getById(id);

      if (response.success && response.data) {
        set({ selectedAppointment: response.data, loading: false });
      } else {
        set({ error: response.error || 'Agendamento nêo encontrado', loading: false });
      }
    } catch (error) {
      set({ error: 'Erro ao carregar agendamento', loading: false });
    }
  },

  createAppointment: async (appointment) => {
    set({ loading: true, error: null });

    try {
      const response = await appointmentsApi.create(appointment);

      if (response.success) {
        await get().fetchAppointments();
        set({ loading: false });
        return true;
      } else {
        set({ error: response.error || 'Erro ao criar agendamento', loading: false });
        return false;
      }
    } catch (error) {
      set({ error: 'Erro ao criar agendamento', loading: false });
      return false;
    }
  },

  updateAppointment: async (id, appointment) => {
    set({ loading: true, error: null });

    try {
      const response = await appointmentsApi.update(id, appointment);

      if (response.success) {
        set(state => ({
          appointments: state.appointments.map(a => a.id === id ? response.data! : a),
          selectedAppointment: state.selectedAppointment?.id === id ? response.data! : state.selectedAppointment,
          loading: false
        }));
        return true;
      } else {
        set({ error: response.error || 'Erro ao atualizar agendamento', loading: false });
        return false;
      }
    } catch (error) {
      set({ error: 'Erro ao atualizar agendamento', loading: false });
      return false;
    }
  },

  updateStatus: async (id, status) => {
    set({ loading: true, error: null });

    try {
      const response = await appointmentsApi.updateStatus(id, status);

      if (response.success) {
        set(state => ({
          appointments: state.appointments.map(a => a.id === id ? response.data! : a),
          loading: false
        }));
        return true;
      } else {
        set({ error: response.error || 'Erro ao atualizar status', loading: false });
        return false;
      }
    } catch (error) {
      set({ error: 'Erro ao atualizar status', loading: false });
      return false;
    }
  },

  deleteAppointment: async (id) => {
    set({ loading: true, error: null });

    try {
      const response = await appointmentsApi.delete(id);

      if (response.success) {
        set(state => ({
          appointments: state.appointments.filter(a => a.id !== id),
          selectedAppointment: state.selectedAppointment?.id === id ? null : state.selectedAppointment,
          loading: false
        }));
        return true;
      } else {
        set({ error: response.error || 'Erro ao cancelar agendamento', loading: false });
        return false;
      }
    } catch (error) {
      set({ error: 'Erro ao cancelar agendamento', loading: false });
      return false;
    }
  },

  setSelectedAppointment: (appointment) => set({ selectedAppointment: appointment }),

  clearError: () => set({ error: null })
}));
