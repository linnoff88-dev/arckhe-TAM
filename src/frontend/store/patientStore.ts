import { create } from 'zustand';
import { Patient, PaginatedResponse } from '../types';
import { patientsApi } from '../services/api';

interface PatientState {
  patients: Patient[];
  selectedPatient: Patient | null;
  loading: boolean;
  error: string | null;
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };

  // Actions
  fetchPatients: (params?: { page?: number; pageSize?: number; search?: string }) => Promise<void>;
  fetchPatientById: (id: string) => Promise<void>;
  createPatient: (patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) => Promise<boolean>;
  updatePatient: (id: string, patient: Partial<Patient>) => Promise<boolean>;
  deletePatient: (id: string) => Promise<boolean>;
  setSelectedPatient: (patient: Patient | null) => void;
  clearError: () => void;
}

export const usePatientStore = create<PatientState>((set, get) => ({
  patients: [],
  selectedPatient: null,
  loading: false,
  error: null,
  pagination: {
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 0
  },

  fetchPatients: async (params) => {
    set({ loading: true, error: null });

    try {
      const response = await patientsApi.getAll(params);

      if (response.success && response.data) {
        set({
          patients: response.data.data,
          pagination: {
            total: response.data.total,
            page: response.data.page,
            pageSize: response.data.pageSize,
            totalPages: response.data.totalPages
          },
          loading: false
        });
      } else {
        set({ error: response.error || 'Erro ao carregar pacientes', loading: false });
      }
    } catch (error) {
      set({ error: 'Erro ao carregar pacientes', loading: false });
    }
  },

  fetchPatientById: async (id) => {
    set({ loading: true, error: null });

    try {
      const response = await patientsApi.getById(id);

      if (response.success && response.data) {
        set({ selectedPatient: response.data, loading: false });
      } else {
        set({ error: response.error || 'Paciente não encontrado', loading: false });
      }
    } catch (error) {
      set({ error: 'Erro ao carregar paciente', loading: false });
    }
  },

  createPatient: async (patient) => {
    set({ loading: true, error: null });

    try {
      const response = await patientsApi.create(patient);

      if (response.success) {
        // Recarregar lista de pacientes
        await get().fetchPatients({ page: 1 });
        set({ loading: false });
        return true;
      } else {
        set({ error: response.error || 'Erro ao criar paciente', loading: false });
        return false;
      }
    } catch (error) {
      set({ error: 'Erro ao criar paciente', loading: false });
      return false;
    }
  },

  updatePatient: async (id, patient) => {
    set({ loading: true, error: null });

    try {
      const response = await patientsApi.update(id, patient);

      if (response.success) {
        // Atualizar paciente na lista
        set(state => ({
          patients: state.patients.map(p => p.id === id ? response.data! : p),
          selectedPatient: state.selectedPatient?.id === id ? response.data! : state.selectedPatient,
          loading: false
        }));
        return true;
      } else {
        set({ error: response.error || 'Erro ao atualizar paciente', loading: false });
        return false;
      }
    } catch (error) {
      set({ error: 'Erro ao atualizar paciente', loading: false });
      return false;
    }
  },

  deletePatient: async (id) => {
    set({ loading: true, error: null });

    try {
      const response = await patientsApi.delete(id);

      if (response.success) {
        // Remover paciente da lista
        set(state => ({
          patients: state.patients.filter(p => p.id !== id),
          selectedPatient: state.selectedPatient?.id === id ? null : state.selectedPatient,
          loading: false
        }));
        return true;
      } else {
        set({ error: response.error || 'Erro ao remover paciente', loading: false });
        return false;
      }
    } catch (error) {
      set({ error: 'Erro ao remover paciente', loading: false });
      return false;
    }
  },

  setSelectedPatient: (patient) => set({ selectedPatient: patient }),

  clearError: () => set({ error: null })
}));
