import React, { useEffect, useState } from 'react';
import { usePatientStore } from '../store/patientStore';
import { useToast } from '../store/toastStore';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  AlertCircle,
  Heart,
  Pill,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Patient } from '../types';

export default function Patients() {
  const {
    patients,
    loading,
    error,
    pagination,
    fetchPatients,
    deletePatient,
    createPatient,
    updatePatient,
    setSelectedPatient
  } = usePatientStore();

  const toast = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [viewingPatient, setViewingPatient] = useState<Patient | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    cns: '',
    birthDate: '',
    gender: 'M' as 'M' | 'F' | 'Outro',
    phone: '',
    email: '',
    address: {
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: ''
    },
    emergencyContact: {
      name: '',
      relationship: '',
      phone: ''
    },
    bloodType: '',
    allergies: '',
    chronicDiseases: '',
    medications: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchPatients({ page: 1, pageSize: 10 });
  }, [fetchPatients]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    fetchPatients({ page: 1, pageSize: 10, search: value });
  };

  const handleAddPatient = () => {
    setEditingPatient(null);
    setFormData({
      name: '',
      cpf: '',
      cns: '',
      birthDate: '',
      gender: 'M',
      phone: '',
      email: '',
      address: {
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: ''
      },
      emergencyContact: {
        name: '',
        relationship: '',
        phone: ''
      },
      bloodType: '',
      allergies: '',
      chronicDiseases: '',
      medications: ''
    });
    setShowModal(true);
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setFormData({
      name: patient.name,
      cpf: patient.cpf,
      cns: patient.cns || '',
      birthDate: patient.birthDate,
      gender: patient.gender,
      phone: patient.phone,
      email: patient.email || '',
      address: { ...patient.address },
      emergencyContact: patient.emergencyContact || {
        name: '',
        relationship: '',
        phone: ''
      },
      bloodType: patient.bloodType || '',
      allergies: patient.allergies?.join(', ') || '',
      chronicDiseases: patient.chronicDiseases?.join(', ') || '',
      medications: patient.medications?.join(', ') || ''
    });
    setShowModal(true);
  };

  const handleViewPatient = (patient: Patient) => {
    setViewingPatient(patient);
    setShowDetailsModal(true);
  };

  const handleDeletePatient = async (id: string) => {
    const patient = patients.find(p => p.id === id);
    if (window.confirm('Tem certeza que deseja excluir este paciente?')) {
      const success = await deletePatient(id);
      if (success) {
        toast.success('Paciente excluído', `${patient?.name} foi removido com sucesso`);
      } else {
        toast.error('Erro ao excluir', 'Não foi possível excluir o paciente');
      }
    }
  };

  const handlePageChange = (newPage: number) => {
    fetchPatients({ page: newPage, pageSize: 10, search: searchTerm });
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmitPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const patientData: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'> = {
        name: formData.name,
        cpf: formData.cpf,
        cns: formData.cns || undefined,
        birthDate: formData.birthDate,
        gender: formData.gender,
        phone: formData.phone,
        email: formData.email || undefined,
        address: formData.address,
        emergencyContact: formData.emergencyContact.name ? formData.emergencyContact : undefined,
        bloodType: formData.bloodType || undefined,
        allergies: formData.allergies ? formData.allergies.split(',').map(a => a.trim()) : undefined,
        chronicDiseases: formData.chronicDiseases ? formData.chronicDiseases.split(',').map(d => d.trim()) : undefined,
        medications: formData.medications ? formData.medications.split(',').map(m => m.trim()) : undefined
      };

      let success = false;
      if (editingPatient) {
        success = await updatePatient(editingPatient.id, patientData as Patient);
        if (success) {
          toast.success('Paciente atualizado', `${formData.name} foi atualizado com sucesso`);
        }
      } else {
        success = await createPatient(patientData as Patient);
        if (success) {
          toast.success('Paciente cadastrado', `${formData.name} foi cadastrado com sucesso`);
        }
      }

      if (success) {
        setShowModal(false);
        fetchPatients({ page: pagination.page, pageSize: 10, search: searchTerm });
      } else {
        toast.error('Erro ao salvar', 'Não foi possível salvar o paciente');
      }
    } catch (error) {
      toast.error('Erro ao salvar', 'Ocorreu um erro ao salvar o paciente');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pacientes</h1>
          <p className="text-gray-600 mt-1">Gerencie o cadastro de pacientes</p>
        </div>
        <button
          onClick={handleAddPatient}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Novo Paciente
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por nome, CPF ou CNS..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Patients Table */}
      {!loading && patients.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paciente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CPF
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Idade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contato
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cidade
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {patients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          {patient.photo ? (
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={patient.photo}
                              alt={patient.name}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <User size={20} className="text-gray-500" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                          <div className="text-sm text-gray-500">{patient.gender === 'M' ? 'Masculino' : patient.gender === 'F' ? 'Feminino' : 'Outro'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{patient.cpf}</div>
                      {patient.cns && (
                        <div className="text-sm text-gray-500">CNS: {patient.cns}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{calculateAge(patient.birthDate)} anos</div>
                      <div className="text-sm text-gray-500">
                        {new Date(patient.birthDate).toLocaleDateString('pt-BR')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{patient.phone}</div>
                      {patient.email && (
                        <div className="text-sm text-gray-500">{patient.email}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {patient.address.city}/{patient.address.state}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleViewPatient(patient)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="Visualizar"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleEditPatient(patient)}
                          className="text-green-600 hover:text-green-900 p-1"
                          title="Editar"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeletePatient(patient.id)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Excluir"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Mostrando {((pagination.page - 1) * pagination.pageSize) + 1} a{' '}
              {Math.min(pagination.page * pagination.pageSize, pagination.total)} de{' '}
              {pagination.total} pacientes
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-sm text-gray-700">
                Página {pagination.page} de {pagination.totalPages}
              </span>
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && patients.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <User size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum paciente encontrado</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm
              ? 'Tente ajustar sua busca'
              : 'Comece adicionando o primeiro paciente'}
          </p>
          {!searchTerm && (
            <button
              onClick={handleAddPatient}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Plus size={20} />
              Adicionar Paciente
            </button>
          )}
        </div>
      )}

      {/* Patient Details Modal */}
      {showDetailsModal && viewingPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  {viewingPatient.photo ? (
                    <img
                      src={viewingPatient.photo}
                      alt={viewingPatient.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                      <User size={32} className="text-gray-500" />
                    </div>
                  )}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{viewingPatient.name}</h2>
                    <p className="text-gray-600">
                      {calculateAge(viewingPatient.birthDate)} anos •{' '}
                      {viewingPatient.gender === 'M' ? 'Masculino' : viewingPatient.gender === 'F' ? 'Feminino' : 'Outro'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Dados Pessoais */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Dados Pessoais</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar size={18} className="text-gray-400" />
                      <span>Nascimento: {new Date(viewingPatient.birthDate).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <User size={18} className="text-gray-400" />
                      <span>CPF: {viewingPatient.cpf}</span>
                    </div>
                    {viewingPatient.cns && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <User size={18} className="text-gray-400" />
                        <span>CNS: {viewingPatient.cns}</span>
                      </div>
                    )}
                    {viewingPatient.bloodType && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <Heart size={18} className="text-gray-400" />
                        <span>Tipo Sanguíneo: {viewingPatient.bloodType}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contato */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Contato</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Phone size={18} className="text-gray-400" />
                      <span>{viewingPatient.phone}</span>
                    </div>
                    {viewingPatient.email && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <Mail size={18} className="text-gray-400" />
                        <span>{viewingPatient.email}</span>
                      </div>
                    )}
                    <div className="flex items-start gap-2 text-gray-700">
                      <MapPin size={18} className="text-gray-400 mt-0.5" />
                      <span>
                        {viewingPatient.address.street}, {viewingPatient.address.number}
                        {viewingPatient.address.complement && `, ${viewingPatient.address.complement}`}
                        <br />
                        {viewingPatient.address.neighborhood}, {viewingPatient.address.city}/{viewingPatient.address.state}
                        <br />
                        CEP: {viewingPatient.address.zipCode}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Informações Médicas */}
                {(viewingPatient.allergies && viewingPatient.allergies.length > 0) ||
                  (viewingPatient.chronicDiseases && viewingPatient.chronicDiseases.length > 0) ||
                  (viewingPatient.medications && viewingPatient.medications.length > 0) ? (
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold mb-3">Informações Médicas</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {viewingPatient.allergies && viewingPatient.allergies.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-1">
                            <AlertCircle size={16} className="text-red-500" />
                            Alergias
                          </h4>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {viewingPatient.allergies.map((allergy, i) => (
                              <li key={i}>{allergy}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {viewingPatient.chronicDiseases && viewingPatient.chronicDiseases.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-1">
                            <Heart size={16} className="text-orange-500" />
                            Doenças Crônicas
                          </h4>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {viewingPatient.chronicDiseases.map((disease, i) => (
                              <li key={i}>{disease}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {viewingPatient.medications && viewingPatient.medications.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-1">
                            <Pill size={16} className="text-blue-500" />
                            Medicamentos em Uso
                          </h4>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {viewingPatient.medications.map((medication, i) => (
                              <li key={i}>{medication}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ) : null}

                {/* Contato de Emergência */}
                {viewingPatient.emergencyContact && (
                  <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold mb-3">Contato de Emergência</h3>
                    <div className="flex items-center gap-4 text-gray-700">
                      <span className="font-medium">{viewingPatient.emergencyContact.name}</span>
                      <span className="text-gray-500">({viewingPatient.emergencyContact.relationship})</span>
                      <span className="flex items-center gap-1">
                        <Phone size={16} />
                        {viewingPatient.emergencyContact.phone}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Fechar
                </button>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    handleEditPatient(viewingPatient);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Edit size={18} />
                  Editar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Patient Form Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-4xl w-full my-8">
            <form onSubmit={handleSubmitPatient}>
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold">
                  {editingPatient ? 'Editar Paciente' : 'Novo Paciente'}
                </h2>
              </div>

              <div className="p-6 max-h-[70vh] overflow-y-auto">
                {/* Dados Pessoais */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Dados Pessoais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CPF *
                      </label>
                      <input
                        type="text"
                        value={formData.cpf}
                        onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                        placeholder="000.000.000-00"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CNS (Cartão SUS)
                      </label>
                      <input
                        type="text"
                        value={formData.cns}
                        onChange={(e) => setFormData({ ...formData, cns: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Data de Nascimento *
                      </label>
                      <input
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sexo *
                      </label>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'M' | 'F' | 'Outro' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="M">Masculino</option>
                        <option value="F">Feminino</option>
                        <option value="Outro">Outro</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tipo Sanguíneo
                      </label>
                      <select
                        value={formData.bloodType}
                        onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Selecione...</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Contato */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Contato</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(00) 00000-0000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        E-mail
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Endereço */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Endereço</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CEP
                      </label>
                      <input
                        type="text"
                        value={formData.address.zipCode}
                        onChange={(e) => setFormData({ ...formData, address: { ...formData.address, zipCode: e.target.value } })}
                        placeholder="00000-000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Logradouro
                      </label>
                      <input
                        type="text"
                        value={formData.address.street}
                        onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Número
                      </label>
                      <input
                        type="text"
                        value={formData.address.number}
                        onChange={(e) => setFormData({ ...formData, address: { ...formData.address, number: e.target.value } })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Complemento
                      </label>
                      <input
                        type="text"
                        value={formData.address.complement}
                        onChange={(e) => setFormData({ ...formData, address: { ...formData.address, complement: e.target.value } })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bairro
                      </label>
                      <input
                        type="text"
                        value={formData.address.neighborhood}
                        onChange={(e) => setFormData({ ...formData, address: { ...formData.address, neighborhood: e.target.value } })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cidade
                      </label>
                      <input
                        type="text"
                        value={formData.address.city}
                        onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Estado
                      </label>
                      <input
                        type="text"
                        value={formData.address.state}
                        onChange={(e) => setFormData({ ...formData, address: { ...formData.address, state: e.target.value } })}
                        placeholder="UF"
                        maxLength={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Contato de Emergência */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Contato de Emergência</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome
                      </label>
                      <input
                        type="text"
                        value={formData.emergencyContact.name}
                        onChange={(e) => setFormData({ ...formData, emergencyContact: { ...formData.emergencyContact, name: e.target.value } })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Parentesco
                      </label>
                      <input
                        type="text"
                        value={formData.emergencyContact.relationship}
                        onChange={(e) => setFormData({ ...formData, emergencyContact: { ...formData.emergencyContact, relationship: e.target.value } })}
                        placeholder="Ex: Mãe, Pai, Irmão..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        value={formData.emergencyContact.phone}
                        onChange={(e) => setFormData({ ...formData, emergencyContact: { ...formData.emergencyContact, phone: e.target.value } })}
                        placeholder="(00) 00000-0000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Informações Médicas */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Informações Médicas</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Alergias
                      </label>
                      <input
                        type="text"
                        value={formData.allergies}
                        onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                        placeholder="Separe múltiplas alergias por vírgula"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Doenças Crônicas
                      </label>
                      <input
                        type="text"
                        value={formData.chronicDiseases}
                        onChange={(e) => setFormData({ ...formData, chronicDiseases: e.target.value })}
                        placeholder="Separe múltiplas doenças por vírgula"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Medicamentos em Uso
                      </label>
                      <input
                        type="text"
                        value={formData.medications}
                        onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
                        placeholder="Separe múltiplos medicamentos por vírgula"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  disabled={isSaving}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSaving && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  )}
                  {isSaving ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
