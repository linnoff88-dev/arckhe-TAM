import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useConsultationStore } from '../store/consultationStore';
import { usePatientStore } from '../store/patientStore';
import { useToast } from '../store/toastStore';
import {
  User,
  Calendar,
  Clock,
  Heart,
  Activity,
  Thermometer,
  Wind,
  Droplet,
  Scale,
  Ruler,
  FileText,
  Pill,
  TestTube,
  AlertCircle,
  Save,
  CheckCircle,
  ArrowLeft,
  Plus,
  X
} from 'lucide-react';
import { Consultation as ConsultationType, VitalSigns, Prescription } from '../types';

export default function Consultation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedConsultation, fetchConsultationById, updateConsultation, completeConsultation, loading, error } = useConsultationStore();
  const { selectedPatient, fetchPatientById } = usePatientStore();
  const toast = useToast();

  // Estado do formulário
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [symptomDuration, setSymptomDuration] = useState('');
  const [physicalExam, setPhysicalExam] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [icd10, setIcd10] = useState<string[]>([]);
  const [observations, setObservations] = useState('');

  // Sinais vitais
  const [vitalSigns, setVitalSigns] = useState<Partial<VitalSigns>>({
    bloodPressure: { systolic: 0, diastolic: 0 },
    heartRate: 0,
    temperature: 0,
    respiratoryRate: 0,
    oxygenSaturation: 0,
    weight: 0,
    height: 0,
    glucose: 0,
    pain: 0
  });

  // Prescrições
  const [prescriptions, setPrescriptions] = useState<Partial<Prescription>[]>([]);
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);

  // Tabs
  const [activeTab, setActiveTab] = useState<'anamnese' | 'exame' | 'diagnostico' | 'prescricao' | 'historico'>('anamnese');

  useEffect(() => {
    if (id && id !== 'new') {
      loadConsultation(id);
    }
  }, [id]);

  const loadConsultation = async (consultationId: string) => {
    await fetchConsultationById(consultationId);

    if (selectedConsultation) {
      // Carregar dados da consulta
      setChiefComplaint(selectedConsultation.chiefComplaint || '');
      setSymptoms(selectedConsultation.symptoms || []);
      setSymptomDuration(selectedConsultation.symptomDuration || '');
      setPhysicalExam(selectedConsultation.physicalExam || '');
      setDiagnosis(selectedConsultation.diagnosis || '');
      setIcd10(selectedConsultation.icd10 || []);
      setObservations(selectedConsultation.observations || '');

      if (selectedConsultation.vitalSigns) {
        setVitalSigns(selectedConsultation.vitalSigns);
      }

      if (selectedConsultation.prescriptions) {
        setPrescriptions(selectedConsultation.prescriptions);
      }

      // Carregar dados do paciente
      if (selectedConsultation.patientId) {
        await fetchPatientById(selectedConsultation.patientId);
      }
    }
  };

  const handleSave = async () => {
    if (!id) return;

    const updatedConsultation: Partial<ConsultationType> = {
      chiefComplaint,
      symptoms,
      symptomDuration,
      physicalExam,
      diagnosis,
      icd10,
      observations,
      vitalSigns: vitalSigns as VitalSigns,
      prescriptions: prescriptions as Prescription[]
    };

    const success = await updateConsultation(id, updatedConsultation);
    if (success) {
      toast.success('Prontuário salvo', 'As informações foram salvas com sucesso');
    } else {
      toast.error('Erro ao salvar', 'Nêo foi possível salvar o prontuário');
    }
  };

  const handleComplete = async () => {
    if (!id) return;

    await handleSave();
    const success = await completeConsultation(id);

    if (success) {
      toast.success('Consulta finalizada', 'A consulta foi concluída com sucesso');
      setTimeout(() => navigate('/appointments'), 1500);
    } else {
      toast.error('Erro ao finalizar', 'Nêo foi possível finalizar a consulta');
    }
  };

  const addSymptom = (symptom: string) => {
    if (symptom && !symptoms.includes(symptom)) {
      setSymptoms([...symptoms, symptom]);
    }
  };

  const removeSymptom = (symptom: string) => {
    setSymptoms(symptoms.filter(s => s !== symptom));
  };

  const addPrescription = () => {
    setPrescriptions([...prescriptions, {
      medication: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: ''
    }]);
  };

  const updatePrescription = (index: number, field: keyof Prescription, value: string) => {
    const updated = [...prescriptions];
    updated[index] = { ...updated[index], [field]: value };
    setPrescriptions(updated);
  };

  const removePrescription = (index: number) => {
    setPrescriptions(prescriptions.filter((_, i) => i !== index));
  };

  const calculateBMI = () => {
    if (vitalSigns.weight && vitalSigns.height) {
      const heightInMeters = vitalSigns.height / 100;
      return (vitalSigns.weight / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return '--';
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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/appointments')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Atendimento</h1>
            <p className="text-gray-600 mt-1">Prontuário Eletrônico</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Save size={20} />
            Salvar
          </button>
          <button
            onClick={handleComplete}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <CheckCircle size={20} />
            Finalizar Consulta
          </button>
        </div>
      </div>

      {/* Informações do Paciente */}
      {selectedPatient && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center gap-4">
            {selectedPatient.photo ? (
              <img
                src={selectedPatient.photo}
                alt={selectedPatient.name}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                <User size={32} className="text-gray-500" />
              </div>
            )}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{selectedPatient.name}</h2>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <span>{selectedPatient.cpf}</span>
                <span>•</span>
                <span>{new Date().getFullYear() - new Date(selectedPatient.birthDate).getFullYear()} anos</span>
                <span>•</span>
                <span>{selectedPatient.gender === 'M' ? 'Masculino' : 'Feminino'}</span>
                {selectedPatient.bloodType && (
                  <>
                    <span>•</span>
                    <span>Tipo Sanguíneo: {selectedPatient.bloodType}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Alertas médicos */}
          {(selectedPatient.allergies && selectedPatient.allergies.length > 0) ||
           (selectedPatient.chronicDiseases && selectedPatient.chronicDiseases.length > 0) ? (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedPatient.allergies && selectedPatient.allergies.length > 0 && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 text-red-700 font-medium mb-1">
                    <AlertCircle size={16} />
                    Alergias
                  </div>
                  <div className="text-sm text-red-600">
                    {selectedPatient.allergies.join(', ')}
                  </div>
                </div>
              )}
              {selectedPatient.chronicDiseases && selectedPatient.chronicDiseases.length > 0 && (
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center gap-2 text-orange-700 font-medium mb-1">
                    <Heart size={16} />
                    Doenças Crônicas
                  </div>
                  <div className="text-sm text-orange-600">
                    {selectedPatient.chronicDiseases.join(', ')}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('anamnese')}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'anamnese'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Anamnese
            </button>
            <button
              onClick={() => setActiveTab('exame')}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'exame'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Exame Físico
            </button>
            <button
              onClick={() => setActiveTab('diagnostico')}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'diagnostico'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Diagnóstico
            </button>
            <button
              onClick={() => setActiveTab('prescricao')}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'prescricao'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Prescriçêo
            </button>
            <button
              onClick={() => setActiveTab('historico')}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === 'historico'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Histórico
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Tab: Anamnese */}
          {activeTab === 'anamnese' && (
            <div className="space-y-6">
              {/* Sinais Vitais */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Activity className="text-blue-600" size={20} />
                  Sinais Vitais
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Pressêo Arterial */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pressêo Arterial (mmHg)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Sistólica"
                        value={vitalSigns.bloodPressure?.systolic || ''}
                        onChange={(e) => setVitalSigns({
                          ...vitalSigns,
                          bloodPressure: {
                            ...vitalSigns.bloodPressure!,
                            systolic: parseInt(e.target.value) || 0
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                      <span className="text-gray-500">/</span>
                      <input
                        type="number"
                        placeholder="Diastólica"
                        value={vitalSigns.bloodPressure?.diastolic || ''}
                        onChange={(e) => setVitalSigns({
                          ...vitalSigns,
                          bloodPressure: {
                            ...vitalSigns.bloodPressure!,
                            diastolic: parseInt(e.target.value) || 0
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Frequência Cardíaca */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Heart size={16} className="inline mr-1" />
                      FC (bpm)
                    </label>
                    <input
                      type="number"
                      value={vitalSigns.heartRate || ''}
                      onChange={(e) => setVitalSigns({ ...vitalSigns, heartRate: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  {/* Temperatura */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Thermometer size={16} className="inline mr-1" />
                      Temp. (°C)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={vitalSigns.temperature || ''}
                      onChange={(e) => setVitalSigns({ ...vitalSigns, temperature: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  {/* Frequência Respiratória */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Wind size={16} className="inline mr-1" />
                      FR (rpm)
                    </label>
                    <input
                      type="number"
                      value={vitalSigns.respiratoryRate || ''}
                      onChange={(e) => setVitalSigns({ ...vitalSigns, respiratoryRate: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  {/* Saturaçêo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Droplet size={16} className="inline mr-1" />
                      SpO2 (%)
                    </label>
                    <input
                      type="number"
                      value={vitalSigns.oxygenSaturation || ''}
                      onChange={(e) => setVitalSigns({ ...vitalSigns, oxygenSaturation: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  {/* Peso */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Scale size={16} className="inline mr-1" />
                      Peso (kg)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={vitalSigns.weight || ''}
                      onChange={(e) => setVitalSigns({ ...vitalSigns, weight: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  {/* Altura */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Ruler size={16} className="inline mr-1" />
                      Altura (cm)
                    </label>
                    <input
                      type="number"
                      value={vitalSigns.height || ''}
                      onChange={(e) => setVitalSigns({ ...vitalSigns, height: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  {/* IMC */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      IMC
                    </label>
                    <div className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700">
                      {calculateBMI()}
                    </div>
                  </div>
                </div>
              </div>

              <hr />

              {/* Queixa Principal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Queixa Principal
                </label>
                <textarea
                  value={chiefComplaint}
                  onChange={(e) => setChiefComplaint(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Descreva a queixa principal do paciente..."
                />
              </div>

              {/* Sintomas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sintomas
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addSymptom(e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Digite um sintoma e pressione Enter..."
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {symptoms.map((symptom, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {symptom}
                      <button
                        onClick={() => removeSymptom(symptom)}
                        className="hover:bg-blue-200 rounded-full p-0.5"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Duraçêo dos Sintomas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duraçêo dos Sintomas
                </label>
                <input
                  type="text"
                  value={symptomDuration}
                  onChange={(e) => setSymptomDuration(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Ex: 3 dias, 2 semanas, etc."
                />
              </div>
            </div>
          )}

          {/* Tab: Exame Físico */}
          {activeTab === 'exame' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Exame Físico
              </label>
              <textarea
                value={physicalExam}
                onChange={(e) => setPhysicalExam(e.target.value)}
                rows={10}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Descreva os achados do exame físico..."
              />
            </div>
          )}

          {/* Tab: Diagnóstico */}
          {activeTab === 'diagnostico' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Diagnóstico
                </label>
                <textarea
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Descreva o diagnóstico..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CID-10
                </label>
                <input
                  type="text"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const value = e.currentTarget.value.trim();
                      if (value && !icd10.includes(value)) {
                        setIcd10([...icd10, value]);
                      }
                      e.currentTarget.value = '';
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Digite o código CID-10 e pressione Enter..."
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {icd10.map((code, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-mono"
                    >
                      {code}
                      <button
                        onClick={() => setIcd10(icd10.filter((_, i) => i !== index))}
                        className="hover:bg-purple-200 rounded-full p-0.5"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observações
                </label>
                <textarea
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Observações adicionais..."
                />
              </div>
            </div>
          )}

          {/* Tab: Prescriçêo */}
          {activeTab === 'prescricao' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Pill className="text-blue-600" size={20} />
                  Prescrições Médicas
                </h3>
                <button
                  onClick={addPrescription}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus size={18} />
                  Adicionar Medicamento
                </button>
              </div>

              {prescriptions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Pill size={48} className="mx-auto mb-2 text-gray-400" />
                  <p>Nenhuma prescriçêo adicionada</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {prescriptions.map((prescription, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-medium text-gray-900">Medicamento {index + 1}</h4>
                        <button
                          onClick={() => removePrescription(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X size={18} />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="md:col-span-2">
                          <input
                            type="text"
                            placeholder="Nome do medicamento"
                            value={prescription.medication || ''}
                            onChange={(e) => updatePrescription(index, 'medication', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Dosagem (ex: 500mg)"
                          value={prescription.dosage || ''}
                          onChange={(e) => updatePrescription(index, 'dosage', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        <input
                          type="text"
                          placeholder="Frequência (ex: 2x ao dia)"
                          value={prescription.frequency || ''}
                          onChange={(e) => updatePrescription(index, 'frequency', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        <input
                          type="text"
                          placeholder="Duraçêo (ex: 7 dias)"
                          value={prescription.duration || ''}
                          onChange={(e) => updatePrescription(index, 'duration', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        <input
                          type="text"
                          placeholder="Instruções especiais"
                          value={prescription.instructions || ''}
                          onChange={(e) => updatePrescription(index, 'instructions', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab: Histórico */}
          {activeTab === 'historico' && (
            <div className="text-center py-12 text-gray-500">
              <FileText size={48} className="mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Histórico de Consultas</h3>
              <p>O histórico de consultas anteriores do paciente será exibido aqui</p>
            </div>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
