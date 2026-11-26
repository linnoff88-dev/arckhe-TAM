import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatsCard from '../components/StatsCard';
import {
  Users,
  Calendar,
  Activity,
  TrendingUp,
  Clock,
  CheckCircle,
  Video,
  MapPin,
  FileText
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { dashboardApi, appointmentsApi } from '../services/api';
import { useAppointmentStore } from '../store/appointmentStore';
import { DashboardMetrics, AppointmentStats } from '../types';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [stats, setStats] = useState<AppointmentStats[]>([]);
  const [loading, setLoading] = useState(true);
  const { appointments, fetchAppointments } = useAppointmentStore();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [metricsRes, statsRes] = await Promise.all([
        dashboardApi.getMetrics(),
        dashboardApi.getAppointmentStats(7)
      ]);

      if (metricsRes.success && metricsRes.data) {
        setMetrics(metricsRes.data);
      }

      if (statsRes.success && statsRes.data) {
        setStats(statsRes.data);
      }

      // Carregar agendamentos de hoje
      const today = new Date().toISOString().split('T')[0];
      await fetchAppointments({ date: today });
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const todayAppointments = appointments.filter(
    a => a.status === 'scheduled' || a.status === 'confirmed' || a.status === 'in_progress'
  );

  // Dados para gráfico de pizza (distribuiçêo de tipos de consulta)
  const appointmentTypeData = [
    { name: 'Presencial', value: appointments.filter(a => a.type === 'presencial').length, color: '#3b82f6' },
    { name: 'Telemedicina', value: appointments.filter(a => a.type === 'telemedicina').length, color: '#10b981' }
  ];

  const handleStartConsultation = (appointmentId: string) => {
    // Navegar para a página de consulta/prontuário
    navigate(`/atendimento/${appointmentId}`);
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Visêo geral do sistema de telemedicina</p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Agendamentos Hoje"
          value={metrics?.todayAppointments.toString() || '0'}
          icon={<Calendar className="w-6 h-6" />}
          trend="+12%"
          trendUp={true}
        />
        <StatsCard
          title="Consultas Concluídas"
          value={metrics?.todayCompletedAppointments.toString() || '0'}
          icon={<CheckCircle className="w-6 h-6" />}
          trend="+8%"
          trendUp={true}
        />
        <StatsCard
          title="Pacientes Aguardando"
          value={metrics?.waitingPatients.toString() || '0'}
          icon={<Clock className="w-6 h-6" />}
          trend="-5%"
          trendUp={false}
        />
        <StatsCard
          title="Em Atendimento"
          value={metrics?.inProgressConsultations.toString() || '0'}
          icon={<Activity className="w-6 h-6" />}
          trend="0%"
          trendUp={true}
        />
      </div>

      {/* Estatísticas Mensais e Anuais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">Pacientes/Mês</p>
              <p className="text-3xl font-bold">{metrics?.totalPatientsMonth || 0}</p>
            </div>
            <Users className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm mb-1">Pacientes/Ano</p>
              <p className="text-3xl font-bold">{metrics?.totalPatientsYear || 0}</p>
            </div>
            <TrendingUp className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm mb-1">Satisfaçêo</p>
              <p className="text-3xl font-bold">{metrics?.satisfactionRate || 0}%</p>
            </div>
            <Activity className="w-12 h-12 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Gráfico de Linha - Agendamentos dos últimos 7 dias */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Agendamentos - Últimos 7 Dias</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(value) => new Date(value).toLocaleDateString('pt-BR')}
              />
              <Legend />
              <Line type="monotone" dataKey="scheduled" stroke="#3b82f6" name="Agendados" strokeWidth={2} />
              <Line type="monotone" dataKey="completed" stroke="#10b981" name="Concluídos" strokeWidth={2} />
              <Line type="monotone" dataKey="cancelled" stroke="#ef4444" name="Cancelados" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Barras - Status dos Agendamentos */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Status dos Agendamentos</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(value) => new Date(value).toLocaleDateString('pt-BR')}
              />
              <Legend />
              <Bar dataKey="completed" fill="#10b981" name="Concluídos" />
              <Bar dataKey="cancelled" fill="#ef4444" name="Cancelados" />
              <Bar dataKey="noShow" fill="#f59e0b" name="Faltou" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tipo de Consulta e Agenda de Hoje */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gráfico de Pizza - Tipos de Consulta */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Tipos de Consulta</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={appointmentTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {appointmentTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {appointmentTypeData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span>{item.name}</span>
                </div>
                <span className="font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Agenda de Hoje */}
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Agenda de Hoje</h2>
          <div className="space-y-3 max-h-[350px] overflow-y-auto">
            {todayAppointments.length > 0 ? (
              todayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className="font-medium">{appointment.patientName}</p>
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        {appointment.type === 'telemedicina' ? (
                          <Video size={14} />
                        ) : (
                          <MapPin size={14} />
                        )}
                        {appointment.type === 'telemedicina' ? 'Telemedicina' : 'Presencial'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <p className="text-sm text-gray-500">
                        <Clock size={14} className="inline mr-1" />
                        {appointment.time} - Dr. {appointment.doctorName.split(' ')[1]}
                      </p>
                      <p className="text-sm text-gray-500">{appointment.specialty}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        appointment.status === 'in_progress'
                          ? 'bg-blue-100 text-blue-700'
                          : appointment.status === 'confirmed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {appointment.status === 'in_progress' ? 'Em Atendimento' :
                       appointment.status === 'confirmed' ? 'Confirmado' : 'Agendado'}
                    </span>
                    <button
                      onClick={() => handleStartConsultation(appointment.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm transition-colors"
                      title="Abrir prontuário"
                    >
                      <FileText size={16} />
                      {appointment.status === 'in_progress' ? 'Continuar' : 'Iniciar'}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar size={48} className="mx-auto mb-2 text-gray-400" />
                <p>Nenhum agendamento para hoje</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
