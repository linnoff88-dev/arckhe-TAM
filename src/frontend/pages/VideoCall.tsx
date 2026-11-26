import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Monitor,
  MonitorOff,
  Phone,
  MessageSquare,
  Settings,
  Maximize,
  Minimize,
  Volume2,
  VolumeX,
  User,
  Send,
  X,
  Users,
  Clock,
  FileText,
  Save,
  Activity,
  Heart
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'doctor' | 'patient';
  senderName: string;
  text: string;
  timestamp: string;
}

export default function VideoCall() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estado da chamada
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isProntuarioOpen, setIsProntuarioOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);

  // Chat
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'patient',
      senderName: 'José da Silva',
      text: 'Olá doutor, obrigado por me atender!',
      timestamp: new Date(Date.now() - 120000).toISOString()
    },
    {
      id: '2',
      sender: 'doctor',
      senderName: 'Dr. Carlos Silva',
      text: 'Olá José! Como posso ajudá-lo hoje?',
      timestamp: new Date(Date.now() - 60000).toISOString()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Timer
  const [callDuration, setCallDuration] = useState(0);
  const [connectionQuality, setConnectionQuality] = useState<'excellent' | 'good' | 'poor'>('excellent');

  // Dados da consulta (mock)
  const consultation = {
    patientName: 'José da Silva',
    patientAge: 49,
    doctorName: 'Dr. Carlos Silva',
    specialty: 'Clínico Geral',
    appointmentTime: '14:00',
    date: new Date().toLocaleDateString('pt-BR')
  };

  // Dados do prontuário (podem ser editados durante a chamada)
  const [prontuarioData, setProntuarioData] = useState({
    queixaPrincipal: '',
    sintomas: '',
    exameFisico: '',
    pressaoArterial: '',
    frequenciaCardiaca: '',
    temperatura: '',
    diagnostico: '',
    cid10: '',
    prescricao: '',
    observacoes: ''
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    // Simular variaçêo de qualidade de conexêo
    const qualityTimer = setInterval(() => {
      const random = Math.random();
      if (random > 0.8) setConnectionQuality('excellent');
      else if (random > 0.3) setConnectionQuality('good');
      else setConnectionQuality('poor');
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(qualityTimer);
    };
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'doctor',
        senderName: 'Dr. Carlos Silva',
        text: newMessage,
        timestamp: new Date().toISOString()
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleEndCall = () => {
    if (window.confirm('Deseja realmente encerrar a videoconsulta?')) {
      navigate('/appointments');
    }
  };

  const getQualityColor = () => {
    switch (connectionQuality) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-yellow-500';
      case 'poor': return 'bg-red-500';
    }
  };

  const getQualityText = () => {
    switch (connectionQuality) {
      case 'excellent': return 'Excelente';
      case 'good': return 'Boa';
      case 'poor': return 'Ruim';
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${getQualityColor()} animate-pulse`}></div>
            <span className="text-sm">Conexêo: {getQualityText()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span className="text-sm font-mono">{formatDuration(callDuration)}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="font-semibold">{consultation.patientName}</div>
            <div className="text-sm text-gray-400">{consultation.specialty}</div>
          </div>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 hover:bg-gray-700 rounded-lg"
          >
            {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex relative">
        {/* Video Area */}
        <div className="flex-1 relative bg-black">
          {/* Vídeo Principal (Paciente) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900">
              {isVideoOn ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Simulaçêo de vídeo */}
                  <div className="text-center">
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 mx-auto flex items-center justify-center mb-4 animate-pulse">
                      <User size={96} className="text-white" />
                    </div>
                    <p className="text-white text-2xl font-semibold">{consultation.patientName}</p>
                    <p className="text-gray-400">Paciente</p>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <VideoOff size={64} className="text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">Vídeo do paciente desativado</p>
                  </div>
                </div>
              )}

              {/* Overlay de informações */}
              <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-2 rounded-lg flex items-center gap-2">
                <Users size={16} />
                <span className="text-sm">2 participantes</span>
              </div>

              {/* Indicador de áudio */}
              {isAudioOn && (
                <div className="absolute bottom-4 left-4 bg-green-500 text-white px-3 py-2 rounded-lg flex items-center gap-2 animate-pulse">
                  <Volume2 size={16} />
                  <span className="text-sm">Paciente falando</span>
                </div>
              )}
            </div>
          </div>

          {/* Vídeo Secundário (Médico - Picture-in-Picture) */}
          <div className="absolute bottom-4 right-4 w-64 h-48 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg shadow-2xl border-2 border-gray-600 overflow-hidden">
            {isVideoOn ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
                  <User size={48} className="text-white" />
                </div>
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                  Você ({consultation.doctorName})
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <VideoOff size={32} className="text-gray-500" />
              </div>
            )}
          </div>

          {/* Compartilhamento de Tela (se ativo) */}
          {isScreenSharing && (
            <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 animate-pulse">
              <Monitor size={20} />
              <span>Compartilhando tela</span>
            </div>
          )}
        </div>

        {/* Chat Panel */}
        {isChatOpen && (
          <div className="w-96 bg-white flex flex-col border-l border-gray-200">
            {/* Chat Header */}
            <div className="bg-gray-100 p-4 flex items-center justify-between border-b">
              <h3 className="font-semibold flex items-center gap-2">
                <MessageSquare size={20} />
                Chat
              </h3>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'doctor'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-900'
                    }`}
                  >
                    <div className="text-xs opacity-75 mb-1">{message.senderName}</div>
                    <div className="text-sm">{message.text}</div>
                    <div className="text-xs opacity-75 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Prontuário Panel */}
        {isProntuarioOpen && (
          <div className="w-[500px] bg-white flex flex-col border-l border-gray-200">
            {/* Prontuário Header */}
            <div className="bg-green-600 text-white p-4 flex items-center justify-between">
              <h3 className="font-semibold flex items-center gap-2">
                <FileText size={20} />
                Prontuário - {consultation.patientName}
              </h3>
              <button
                onClick={() => setIsProntuarioOpen(false)}
                className="p-1 hover:bg-green-700 rounded"
              >
                <X size={20} />
              </button>
            </div>

            {/* Prontuário Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Informações do Paciente */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-semibold text-sm text-gray-700 mb-2 flex items-center gap-1">
                  <User size={16} />
                  Informações do Paciente
                </h4>
                <div className="text-sm space-y-1">
                  <p><strong>Nome:</strong> {consultation.patientName}</p>
                  <p><strong>Idade:</strong> {consultation.patientAge} anos</p>
                  <p><strong>Data:</strong> {consultation.date}</p>
                  <p><strong>Horário:</strong> {consultation.appointmentTime}</p>
                </div>
              </div>

              {/* Queixa Principal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Queixa Principal *
                </label>
                <textarea
                  value={prontuarioData.queixaPrincipal}
                  onChange={(e) => setProntuarioData({ ...prontuarioData, queixaPrincipal: e.target.value })}
                  placeholder="Descreva a queixa principal do paciente..."
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                />
              </div>

              {/* Sintomas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sintomas
                </label>
                <textarea
                  value={prontuarioData.sintomas}
                  onChange={(e) => setProntuarioData({ ...prontuarioData, sintomas: e.target.value })}
                  placeholder="Liste os sintomas apresentados..."
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                />
              </div>

              {/* Sinais Vitais */}
              <div className="bg-blue-50 p-3 rounded-lg">
                <h4 className="font-semibold text-sm text-gray-700 mb-2 flex items-center gap-1">
                  <Activity size={16} />
                  Sinais Vitais
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Pressêo Arterial</label>
                    <input
                      type="text"
                      value={prontuarioData.pressaoArterial}
                      onChange={(e) => setProntuarioData({ ...prontuarioData, pressaoArterial: e.target.value })}
                      placeholder="120/80"
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Freq. Cardíaca (bpm)</label>
                    <input
                      type="text"
                      value={prontuarioData.frequenciaCardiaca}
                      onChange={(e) => setProntuarioData({ ...prontuarioData, frequenciaCardiaca: e.target.value })}
                      placeholder="72"
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Temperatura (°C)</label>
                    <input
                      type="text"
                      value={prontuarioData.temperatura}
                      onChange={(e) => setProntuarioData({ ...prontuarioData, temperatura: e.target.value })}
                      placeholder="36.5"
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* Exame Físico */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exame Físico
                </label>
                <textarea
                  value={prontuarioData.exameFisico}
                  onChange={(e) => setProntuarioData({ ...prontuarioData, exameFisico: e.target.value })}
                  placeholder="Descreva os achados do exame físico..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                />
              </div>

              {/* Diagnóstico */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Diagnóstico
                </label>
                <textarea
                  value={prontuarioData.diagnostico}
                  onChange={(e) => setProntuarioData({ ...prontuarioData, diagnostico: e.target.value })}
                  placeholder="Diagnóstico clínico..."
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                />
              </div>

              {/* CID-10 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CID-10
                </label>
                <input
                  type="text"
                  value={prontuarioData.cid10}
                  onChange={(e) => setProntuarioData({ ...prontuarioData, cid10: e.target.value })}
                  placeholder="Ex: J00, I10"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                />
              </div>

              {/* Prescriçêo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prescriçêo Médica
                </label>
                <textarea
                  value={prontuarioData.prescricao}
                  onChange={(e) => setProntuarioData({ ...prontuarioData, prescricao: e.target.value })}
                  placeholder="Medicamentos e dosagens..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                />
              </div>

              {/* Observações */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Observações
                </label>
                <textarea
                  value={prontuarioData.observacoes}
                  onChange={(e) => setProntuarioData({ ...prontuarioData, observacoes: e.target.value })}
                  placeholder="Observações adicionais..."
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                />
              </div>
            </div>

            {/* Prontuário Footer - Botêo Salvar */}
            <div className="p-4 border-t bg-gray-50">
              <button
                onClick={() => {
                  // Aqui você salvaria os dados do prontuário
                  alert('Prontuário salvo com sucesso durante a videochamada!');
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                <Save size={20} />
                Salvar Prontuário
              </button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Os dados serêo salvos automaticamente
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Controls Bar */}
      <div className="bg-gray-800 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Left Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-4 rounded-full ${
                isVideoOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
              } text-white transition-colors`}
              title={isVideoOn ? 'Desativar vídeo' : 'Ativar vídeo'}
            >
              {isVideoOn ? <Video size={24} /> : <VideoOff size={24} />}
            </button>

            <button
              onClick={() => setIsAudioOn(!isAudioOn)}
              className={`p-4 rounded-full ${
                isAudioOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
              } text-white transition-colors`}
              title={isAudioOn ? 'Desativar áudio' : 'Ativar áudio'}
            >
              {isAudioOn ? <Mic size={24} /> : <MicOff size={24} />}
            </button>

            <button
              onClick={() => setIsSoundOn(!isSoundOn)}
              className={`p-4 rounded-full ${
                isSoundOn ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
              } text-white transition-colors`}
              title={isSoundOn ? 'Desativar som' : 'Ativar som'}
            >
              {isSoundOn ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </button>
          </div>

          {/* Center Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              className={`px-6 py-3 rounded-lg ${
                isScreenSharing
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-700 hover:bg-gray-600'
              } text-white flex items-center gap-2 transition-colors`}
            >
              {isScreenSharing ? <MonitorOff size={20} /> : <Monitor size={20} />}
              {isScreenSharing ? 'Parar compartilhamento' : 'Compartilhar tela'}
            </button>

            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={`px-6 py-3 rounded-lg ${
                isChatOpen ? 'bg-blue-600' : 'bg-gray-700'
              } hover:bg-gray-600 text-white flex items-center gap-2 transition-colors relative`}
            >
              <MessageSquare size={20} />
              Chat
              {messages.length > 2 && !isChatOpen && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {messages.length - 2}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setIsProntuarioOpen(!isProntuarioOpen);
                setIsChatOpen(false); // Fecha o chat se o prontuário abrir
              }}
              className={`px-6 py-3 rounded-lg ${
                isProntuarioOpen ? 'bg-green-600' : 'bg-gray-700'
              } hover:bg-gray-600 text-white flex items-center gap-2 transition-colors`}
              title="Abrir prontuário do paciente"
            >
              <FileText size={20} />
              Prontuário
            </button>

            <button
              className="px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white flex items-center gap-2 transition-colors"
            >
              <Settings size={20} />
              Configurações
            </button>
          </div>

          {/* Right Controls */}
          <div>
            <button
              onClick={handleEndCall}
              className="px-8 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 transition-colors font-semibold"
            >
              <Phone size={20} className="rotate-135" />
              Encerrar Chamada
            </button>
          </div>
        </div>
      </div>

      {/* Notification Banner */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-bounce">
        <Video size={20} />
        <span>Videoconsulta em andamento com {consultation.patientName}</span>
      </div>
    </div>
  );
}
