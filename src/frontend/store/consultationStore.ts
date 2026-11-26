import { create } from 'zustand';
import { Consultation } from '../types';
import { consultationsApi } from '../services/api';

interface ConsultationState {
  consultations: Consultation[];
  selectedConsultation: Consultation | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchConsultations: (params?: { status?: string }) => Promise<void>;
  fetchConsultationById: (id: string) => Promise<void>;
  createConsultation: (consultation: Omit<Consultation, 'id' | 'createdAt' | 'updatedAt'>) => Promise<boolean>;
  updateConsultation: (id: string, consultation: Partial<Consultation>) => Promise<boolean>;
  completeConsultation: (id: string) => Promise<boolean>;
  setSelectedConsultation: (consultation: Consultation | null) => void;
  clearError: () => void;
}

export const useConsultationStore = create<ConsultationState>((set, get) => ({
  consultations: [],
  selectedConsultation: null,
  loading: false,
  error: null,

  fetchConsultations: async (params) => {
    set({ loading: true, error: null });

    try {
      const response = await consultationsApi.getAll(params);

      if (response.success && response.data) {
        set({ consultations: response.data.data, loading: false });
      } else {
        set({ error: response.error || 'Erro ao carregar consultas', loading: false });
      }
    } catch (error) {
      set({ error: 'Erro ao carregar consultas', loading: false });
    }
  },

  fetchConsultationById: async (id) => {
    set({ loading: true, error: null });

    try {
      const response = await consultationsApi.getById(id);

      if (response.success && response.data) {
        set({ selectedConsultation: response.data, loading: false });
      } else {
        set({ error: response.error || 'Consulta nêo encontrada', loading: false });
      }
    } catch (error) {
      set({ error: 'Erro ao carregar consulta', loading: false });
    }
  },

  createConsultation: async (consultation) => {
    set({ loading: true, error: null });

    try {
      const response = await consultationsApi.create(consultation);

      if (response.success) {
        await get().fetchConsultations();
        set({ loading: false });
        return true;
      } else {
        set({ error: response.error || 'Erro ao criar consulta', loading: false });
        return false;
      }
    } catch (error) {
      set({ error: 'Erro ao criar consulta', loading: false });
      return false;
    }
  },

  updateConsultation: async (id, consultation) => {
    set({ loading: true, error: null });

    try {
      const response = await consultationsApi.update(id, consultation);

      if (response.success) {
        set(state => ({
          consultations: state.consultations.map(c => c.id === id ? response.data! : c),
          selectedConsultation: state.selectedConsultation?.id === id ? response.data! : state.selectedConsultation,
          loading: false
        }));
        return true;
      } else {
        set({ error: response.error || 'Erro ao atualizar consulta', loading: false });
        return false;
      }
    } catch (error) {
      set({ error: 'Erro ao atualizar consulta', loading: false });
      return false;
    }
  },

  completeConsultation: async (id) => {
    set({ loading: true, error: null });

    try {
      const response = await consultationsApi.complete(id);

      if (response.success) {
        set(state => ({
          consultations: state.consultations.map(c => c.id === id ? response.data! : c),
          loading: false
        }));
        return true;
      } else {
        set({ error: response.error || 'Erro ao finalizar consulta', loading: false });
        return false;
      }
    } catch (error) {
      set({ error: 'Erro ao finalizar consulta', loading: false });
      return false;
    }
  },

  setSelectedConsultation: (consultation) => set({ selectedConsultation: consultation }),

  clearError: () => set({ error: null })
}));
