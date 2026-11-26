import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppointmentStore } from '../store/appointmentStore';
import { usePatientStore } from '../store/patientStore';
import { useToast } from '../store/toastStore';
import {
  Calendar as CalendarIcon,
  Plus,
  Filter,
  Clock,
  User,
  Video,
  MapPin,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Appointment } from '../types';

export default function Appointments() {
  const {
    appointments,
    loading,
    error,
    fetchAppointments,
    updateStatus,
    createAppointment,
    updateAppointment,
    deleteAppointment
  } = useAppointmentStore();

  const { patients, fetchPatients } = usePatientStore();
  const toast = useToast();
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [showNewModal, setShowNewModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: 'doc001',
    date: '',
    time: '',
    type: 'presencial' as 'presencial' | 'telemedicina',
    specialty: 'Clínica Geral',
    duration: 30,
    location: '',
    notes: ''
  });

  // Calendário simples
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await fetchAppointments();
    await fetchPatients({ page: 1, pageSize: 100 });
  };

  const handleFilterChange = () => {
    const params: any = {};

    if (filterStatus !== 'all') {
      params.status = filterStatus;
    }

    fetchAppointments(params);
  };

  useEffect(() => {
    handleFilterChange();
  }, [filterStatus, filterType]);

  const handleCancelAppointment = async (id: string) => {
    const appointment = appointments.find(a => a.id === id);
    if (window.confirm('Tem certeza que deseja cancelar este agendamento?')) {
      const success = await updateStatus(id, 'cancelled');
      if (success) {
        toast.success(
          'Agendamento cancelado',
          `Agendamento de ${appointment?.patientName} foi cancelado`
        );
      } else {
        toast.error('Erro ao cancelar', 'Nêo foi possível cancelar o agendamento');
      }
    }
  };

  const handleConfirmAppointment = async (id: string) => {
    const appointment = appointments.find(a => a.id === id);
    const success = await updateStatus(id, 'confirmed');
    if (success) {
      toast.success(
        'Agendamento confirmado',
        `Agendamento de ${appointment?.patientName} confirmado para ${appointment?.time}`
      );
    } else {
      toast.error('Erro ao confirmar', 'Nêo foi possível confirmar o agendamento');
    }
  };

  const handleNewAppointment = () => {
    setSelectedAppointment(null);
    setFormData({
      patientId: '',
      doctorId: 'doc001',
      date: '',
      time: '',
      type: 'presencial',
      specialty: 'Clínica Geral',
      duration: 30,
      location: '',
      notes: ''
    });
    setShowNewModal(true);
  };

  const handleEditAppointmentForm = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setFormData({
      patientId: appointment.patientId,
      doctorId: appointment.doctorId,
      date: appointment.date,
      time: appointment.time,
      type: appointment.type,
      specialty: appointment.specialty,
      duration: appointment.duration,
      location: appointment.location || '',
      notes: appointment.notes || ''
    });
    setShowNewModal(true);
  };

  const handleSubmitAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const patient = patients.find(p => p.id === formData.patientId);
      if (!patient) {
        toast.error('Erro', 'Paciente nêo encontrado');
        return;
      }

      const appointmentData: any = {
        ...formData,
        patientName: patient.name,
        doctorName: 'Dr. Carlos Silva',
        status: 'scheduled' as const
      };

      let success = false;
      if (selectedAppointment) {
        success = await updateAppointment(selectedAppointment.id, appointmentData);
        if (success) {
          toast.success('Agendamento atualizado', 'O agendamento foi atualizado com sucesso');
        }
      } else {
        success = await createAppointment(appointmentData);
        if (success) {
          toast.success('Agendamento criado', 'O agendamento foi criado com sucesso');
        }
      }

      if (success) {
        setShowNewModal(false);
        fetchAppointments();
      } else {
        toast.error('Erro ao salvar', 'Nêo foi possível salvar o agendamento');
      }
    } catch (error) {
      toast.error('Erro ao salvar', 'Ocorreu um erro ao salvar o agendamento');
    } finally {
      setIsSaving(false);
    }
  };

  const handleStartVideoCall = (appointmentId: string) => {
    navigate(`/videochamada/${appointmentId}`);
  };

  const filteredAppointments = appointments.filter(apt => {
    if (filterType !== 'all' && apt.type !== filterType) return false;
    return true;
  });

  const getStatusBadge = (status: Appointment['status']) => {
    const badges = {
      scheduled: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Agendado' },
      confirmed: { bg: 'bg-green-100', text: 'text-green-700', label: 'Confirmado' },
      in_progress: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Em Andamento' },
      completed: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Concluído' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-700', label: 'Cancelado' },
      no_show: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Nêo Compareceu' }
    };

    const badge = badges[status];
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${badge.bg} ${badge.text}`}>
        {badge.label}
      </span>
    );
  };

  // Funções do calendário
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const getAppointmentsForDate = (date: string) => {
    return appointments.filter(apt => apt.date === date);
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const formatDateForCalendar = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${year}-${month}-${dayStr}`;
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Agendamentos</h1>
          <p className="text-gray-600 mt-1">Gerencie agendamentos e consultas</p>
        </div>
        <button
          onClick={handleNewAppointment}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Novo Agendamento
        </button>
      </div>

      {/* Filtros e Visualizaçêo */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            {/* Modo de visualizaçêo */}
            <div className="flex items-center gap-2 border rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Lista
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'calendar'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Calendário
              </button>
            </div>

            {/* Filtro de Status */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos os Status</option>
              <option value="scheduled">Agendado</option>
              <option value="confirmed">Confirmado</option>
              <option value="in_progress">Em Andamento</option>
              <option value="completed">Concluído</option>
              <option value="cancelled">Cancelado</option>
            </select>

            {/* Filtro de Tipo */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos os Tipos</option>
              <option value="presencial">Presencial</option>
              <option value="telemedicina">Telemedicina</option>
            </select>
          </div>

          <div className="text-sm text-gray-600">
            Total: <span className="font-semibold">{filteredAppointments.length}</span> agendamentos
          </div>
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

      {/* Lista de Agendamentos */}
      {!loading && viewMode === 'list' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paciente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Médico
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data/Hora
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User size={18} className="text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {appointment.patientName}
                          </div>
                          <div className="text-sm text-gray-500">{appointment.specialty}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{appointment.doctorName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <CalendarIcon size={16} className="mr-2 text-gray-400" />
                        {new Date(appointment.date).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock size={16} className="mr-2 text-gray-400" />
                        {appointment.time} ({appointment.duration}min)
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {appointment.type === 'telemedicina' ? (
                          <>
                            <Video size={16} className="text-green-600" />
                            <span className="text-sm text-gray-900">Telemedicina</span>
                          </>
                        ) : (
                          <>
                            <MapPin size={16} className="text-blue-600" />
                            <span className="text-sm text-gray-900">Presencial</span>
                          </>
                        )}
                      </div>
                      {appointment.location && (
                        <div className="text-xs text-gray-500 mt-1">{appointment.location}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(appointment.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        {appointment.type === 'telemedicina' && (appointment.status === 'confirmed' || appointment.status === 'in_progress') && (
                          <button
                            onClick={() => handleStartVideoCall(appointment.id)}
                            className="text-purple-600 hover:text-purple-900 p-1"
                            title="Iniciar Videochamada"
                          >
                            <Video size={18} />
                          </button>
                        )}
                        {appointment.status === 'scheduled' && (
                          <button
                            onClick={() => handleConfirmAppointment(appointment.id)}
                            className="text-green-600 hover:text-green-900 p-1"
                            title="Confirmar"
                          >
                            <CheckCircle size={18} />
                          </button>
                        )}
                        {(appointment.status === 'scheduled' || appointment.status === 'confirmed') && (
                          <>
                            <button
                              onClick={() => handleEditAppointmentForm(appointment)}
                              className="text-blue-600 hover:text-blue-900 p-1"
                              title="Editar"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleCancelAppointment(appointment.id)}
                              className="text-red-600 hover:text-red-900 p-1"
                              title="Cancelar"
                            >
                              <XCircle size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAppointments.length === 0 && (
            <div className="text-center py-12">
              <CalendarIcon size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum agendamento encontrado</h3>
              <p className="text-gray-600">
                {filterStatus !== 'all' || filterType !== 'all'
                  ? 'Tente ajustar os filtros'
                  : 'Comece criando um novo agendamento'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Visualizaçêo de Calendário */}
      {!loading && viewMode === 'calendar' && (
        <div className="bg-white rounded-lg shadow p-6">
          {/* Cabeçalho do Calendário */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={previousMonth}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setCurrentMonth(new Date())}
                className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                Hoje
              </button>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Grid do Calendário */}
          <div className="grid grid-cols-7 gap-2">
            {/* Dias da semana */}
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
              <div key={day} className="text-center font-semibold text-gray-700 py-2">
                {day}
              </div>
            ))}

            {/* Dias vazios antes do primeiro dia */}
            {[...Array(startingDayOfWeek)].map((_, i) => (
              <div key={`empty-${i}`} className="h-24 bg-gray-50 rounded-lg"></div>
            ))}

            {/* Dias do mês */}
            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1;
              const dateStr = formatDateForCalendar(day);
              const dayAppointments = getAppointmentsForDate(dateStr);
              const isToday = dateStr === new Date().toISOString().split('T')[0];

              return (
                <div
                  key={day}
                  className={`h-24 border rounded-lg p-2 hover:bg-gray-50 cursor-pointer ${
                    isToday ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedDate(dateStr)}
                >
                  <div className={`text-sm font-semibold ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
                    {day}
                  </div>
                  <div className="mt-1 space-y-1">
                    {dayAppointments.slice(0, 2).map(apt => (
                      <div
                        key={apt.id}
                        className={`text-xs px-2 py-1 rounded truncate ${
                          apt.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                          apt.status === 'completed' ? 'bg-purple-100 text-purple-700' :
                          apt.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        }`}
                        title={`${apt.time} - ${apt.patientName}`}
                      >
                        {apt.time} {apt.patientName.split(' ')[0]}
                      </div>
                    ))}
                    {dayAppointments.length > 2 && (
                      <div className="text-xs text-gray-500 pl-2">
                        +{dayAppointments.length - 2} mais
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal: Appointment Form */}
      {showNewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-2xl w-full my-8">
            <form onSubmit={handleSubmitAppointment}>
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold">
                  {selectedAppointment ? 'Editar Agendamento' : 'Novo Agendamento'}
                </h2>
              </div>

              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Paciente */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Paciente *
                    </label>
                    <select
                      value={formData.patientId}
                      onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Selecione um paciente...</option>
                      {patients.map(patient => (
                        <option key={patient.id} value={patient.id}>
                          {patient.name} - {patient.cpf}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Data */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Data *
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  {/* Horário */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Horário *
                    </label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  {/* Tipo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tipo de Atendimento *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as 'presencial' | 'telemedicina' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="presencial">Presencial</option>
                      <option value="telemedicina">Telemedicina</option>
                    </select>
                  </div>

                  {/* Especialidade */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Especialidade *
                    </label>
                    <select
                      value={formData.specialty}
                      onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="Clínica Geral">Clínica Geral</option>
                      <option value="Cardiologia">Cardiologia</option>
                      <option value="Pediatria">Pediatria</option>
                      <option value="Ortopedia">Ortopedia</option>
                      <option value="Dermatologia">Dermatologia</option>
                      <option value="Psiquiatria">Psiquiatria</option>
                      <option value="Ginecologia">Ginecologia</option>
                    </select>
                  </div>

                  {/* Duraçêo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duraçêo (minutos) *
                    </label>
                    <select
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="15">15 minutos</option>
                      <option value="30">30 minutos</option>
                      <option value="45">45 minutos</option>
                      <option value="60">60 minutos</option>
                    </select>
                  </div>

                  {/* Local (se presencial) */}
                  {formData.type === 'presencial' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Local
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Ex: Consultório 2, Sala 105"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  )}

                  {/* Observações */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Observações
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={3}
                      placeholder="Informações adicionais sobre o agendamento..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
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
                  {isSaving ? 'Salvando...' : (selectedAppointment ? 'Atualizar' : 'Agendar')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
