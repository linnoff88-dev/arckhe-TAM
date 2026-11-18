# Módulo de Agendamento - Sistema TAM

## 1. Visão Geral

O Módulo de Agendamento é responsável por gerenciar todo o ciclo de vida das consultas, desde o agendamento inicial até o check-in do paciente na unidade móvel. Ele permite que operadores e técnicos organizem o fluxo de atendimento de forma eficiente, evitando filas e otimizando o tempo dos profissionais de saúde.

## 2. Objetivos

- Permitir agendamento de consultas presenciais e por telemedicina
- Visualizar disponibilidade de horários em tempo real
- Gerenciar agenda de múltiplas unidades móveis
- Enviar notificações e lembretes aos pacientes
- Reduzir no-shows através de confirmações
- Permitir fila de espera para encaixes
- Funcionar offline com sincronização posterior

## 3. Personas Atendidas

- **Operador/Recepcionista**: Agenda consultas, gerencia calendário
- **Técnico de Enfermagem**: Visualiza agenda do dia, faz check-in
- **Coordenador**: Monitora ocupação e performance
- **Paciente**: (indiretamente) recebe confirmações e lembretes

## 4. Funcionalidades Detalhadas

### 4.1 Criar Agendamento

**Descrição**: Permite agendar uma consulta para um paciente em data e horário específicos.

**Fluxo Principal:**
1. Operador acessa módulo de agendamento
2. Busca paciente por CPF/CNS/Nome
   - Se não encontrado, redireciona para cadastro
3. Seleciona tipo de atendimento:
   - Consulta presencial
   - Teleconsulta
   - Procedimento
   - Retorno
4. Escolhe unidade móvel (se múltiplas disponíveis)
5. Visualiza calendário com disponibilidade
6. Seleciona data e horário
7. Define prioridade (Normal, Prioritário, Urgente)
8. Adiciona observações (opcional)
9. Confirma agendamento
10. Sistema envia notificação ao paciente

**Regras de Negócio:**
- Duração padrão: 30 minutos por consulta
- Intervalo mínimo entre consultas: 15 minutos
- Não permitir agendamento em horários já ocupados
- Máximo de 2 agendamentos por paciente no mesmo dia
- Agendamento com até 60 dias de antecedência
- Mínimo 2 horas de antecedência para agendamentos do mesmo dia
- Prioridade "Urgente" pode sobrescrever horários cheios (encaixe)

**Campos:**
- Paciente (obrigatório)
- Data (obrigatório)
- Hora (obrigatório)
- Tipo de atendimento (obrigatório)
- Especialidade (obrigatório)
- Unidade móvel (obrigatório)
- Prioridade (padrão: Normal)
- Motivo/Queixa (opcional)
- Observações (opcional)
- Enviar notificação (padrão: Sim)

**Validações:**
- Data não pode ser no passado
- Horário deve estar dentro do expediente (8h-18h)
- Paciente deve ter cadastro completo
- Unidade móvel deve estar ativa
- Verificar disponibilidade do horário

**Notificações:**
- SMS: "Consulta agendada para [data] às [hora] na Unidade [nome]. Endereço: [local]."
- WhatsApp: Mensagem similar com opção de confirmar/remarcar
- E-mail: (se cadastrado) com convite de calendário

### 4.2 Visualizar Agenda

**Descrição**: Exibe calendário com todos os agendamentos de uma ou mais unidades.

**Visualizações:**

1. **Visão Dia**
   - Lista cronológica de agendamentos
   - Exibe horário, paciente, tipo, status
   - Destaca horário atual
   - Mostra próximo paciente

2. **Visão Semana**
   - Grid com dias da semana
   - Blocos coloridos por tipo de atendimento
   - Taxa de ocupação por dia

3. **Visão Mês**
   - Calendário mensal
   - Indicador de ocupação por dia (%, cor)
   - Datas com vagas limitadas destacadas

**Filtros:**
- Unidade móvel
- Tipo de atendimento
- Status (Agendado, Confirmado, Em atendimento, Concluído, Cancelado)
- Profissional (médico específico)
- Período (data início/fim)

**Ações Rápidas:**
- Criar novo agendamento
- Editar agendamento
- Cancelar agendamento
- Check-in do paciente
- Ver detalhes do paciente

**Indicadores:**
- Total de agendamentos do dia
- Pacientes aguardando
- Em atendimento
- Concluídos
- Cancelados/No-shows
- Taxa de ocupação (%)

### 4.3 Check-in do Paciente

**Descrição**: Confirma presença do paciente na unidade móvel.

**Fluxo:**
1. Técnico busca agendamento do paciente
   - Por nome
   - Por CPF
   - Selecionando da lista do dia
2. Verifica identidade (documento)
3. Confirma ou atualiza dados cadastrais
4. Clica em "Fazer Check-in"
5. Sistema atualiza status para "Aguardando Atendimento"
6. Registra horário de chegada
7. Paciente entra na fila de atendimento

**Regras:**
- Check-in pode ser feito até 15 minutos antes do horário
- Paciente com mais de 15 minutos de atraso: avisar operador
- Mais de 30 minutos de atraso: marcar como no-show
- Permitir check-in sem agendamento (encaixe)

**Campos Atualizados:**
- Status: Aguardando Atendimento
- Horário de chegada
- Tempo de espera (calculado)

### 4.4 Remarcar Consulta

**Descrição**: Permite alterar data/hora de um agendamento existente.

**Fluxo:**
1. Operador localiza agendamento
2. Clica em "Remarcar"
3. Seleciona nova data/hora disponível
4. Informa motivo da remarcação
5. Confirma alteração
6. Sistema notifica paciente

**Regras:**
- Permitir remarcação até 2 horas antes
- Registrar histórico de remarcações
- Máximo de 3 remarcações por agendamento
- Liberar horário anterior para outros agendamentos

**Motivos de Remarcação:**
- Solicitação do paciente
- Indisponibilidade da unidade
- Indisponibilidade do médico
- Emergência
- Outros (especificar)

### 4.5 Cancelar Consulta

**Descrição**: Cancela um agendamento existente.

**Fluxo:**
1. Operador localiza agendamento
2. Clica em "Cancelar"
3. Seleciona motivo do cancelamento
4. Adiciona observações (opcional)
5. Confirma cancelamento
6. Sistema notifica paciente
7. Libera horário para novos agendamentos

**Motivos de Cancelamento:**
- Solicitação do paciente
- Paciente não compareceu (no-show)
- Indisponibilidade da unidade
- Condições climáticas
- Emergência
- Outros (especificar)

**Regras:**
- Cancelamento até 2 horas antes: sem penalidade
- No-show: registrar no histórico do paciente
- 3 no-shows: alertar coordenador
- Registrar em histórico imutável

### 4.6 Fila de Espera

**Descrição**: Gerencia lista de pacientes aguardando vagas.

**Funcionalidades:**
- Adicionar paciente à fila de espera
- Priorizar por urgência/ordem de chegada
- Notificar automaticamente quando vaga surgir
- Paciente tem 2 horas para confirmar
- Se não confirmar, vaga vai para próximo da fila

**Campos:**
- Paciente
- Tipo de atendimento desejado
- Período preferencial (manhã/tarde)
- Prioridade
- Data de inclusão na fila
- Observações

### 4.7 Confirmação de Consulta

**Descrição**: Sistema envia lembretes e solicita confirmação.

**Fluxo Automático:**
- 48 horas antes: Enviar lembrete
- 24 horas antes: Solicitar confirmação
- 2 horas antes: Lembrete final

**Opções para Paciente:**
- Confirmar presença
- Remarcar
- Cancelar

**Ações do Sistema:**
- Se confirmado: marcar como confirmado
- Se não responder: manter agendado, mas alertar equipe
- Se remarcar/cancelar: executar ação correspondente

## 5. Regras de Disponibilidade

### 5.1 Horários de Funcionamento

**Padrão:**
- Segunda a Sexta: 8h às 18h
- Sábado: 8h às 12h
- Domingo: Fechado

**Configurável por Unidade:**
- Horários customizados
- Feriados e pontos facultativos
- Manutenções programadas

### 5.2 Capacidade de Atendimento

**Cálculo Automático:**
```
Capacidade Diária = (Horas de funcionamento × 60) / Duração média consulta
Exemplo: (10h × 60) / 30min = 20 consultas/dia
```

**Fatores:**
- Duração média por tipo de atendimento
- Intervalo entre consultas
- Tempo de setup da unidade
- Tempo de limpeza/higienização

### 5.3 Bloqueio de Horários

**Motivos:**
- Manutenção da unidade
- Indisponibilidade de profissional
- Reunião de equipe
- Falta de insumos
- Condições climáticas adversas

**Ação:**
- Bloquear range de horários
- Reagendar consultas afetadas
- Notificar pacientes

## 6. Integrações

### 6.1 Com Módulo de Pacientes

- Buscar dados cadastrais
- Validar CPF/CNS
- Verificar histórico de atendimentos
- Checar no-shows anteriores

### 6.2 Com Módulo de Atendimento

- Iniciar atendimento a partir do agendamento
- Atualizar status para "Em Atendimento"
- Registrar conclusão

### 6.3 Com Módulo de Notificações

- Enviar SMS de confirmação
- Enviar lembretes automáticos
- Notificar remarcações/cancelamentos
- Alertar sobre vagas na fila de espera

### 6.4 Com e-SUS

- Exportar agendamentos (se exigido)
- Sincronizar dados de estabelecimento
- Validar profissionais e CBO

## 7. Modelo de Dados

### 7.1 Entidade: Appointment (Agendamento)

```typescript
interface Appointment {
  id: string;
  patientId: string;
  mobileUnitId: string;
  appointmentDate: Date;
  appointmentTime: string;
  duration: number; // minutos
  type: AppointmentType;
  specialty: string;
  status: AppointmentStatus;
  priority: Priority;
  chiefComplaint?: string;
  notes?: string;
  checkInTime?: Date;
  startTime?: Date;
  endTime?: Date;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  canceledAt?: Date;
  cancelationReason?: string;
  noShow: boolean;
  confirmed: boolean;
  confirmedAt?: Date;
  remindersSent: number;
  metadata: Record<string, any>;
}

enum AppointmentType {
  IN_PERSON = 'in_person',
  TELEMEDICINE = 'telemedicine',
  PROCEDURE = 'procedure',
  FOLLOW_UP = 'follow_up',
  URGENT = 'urgent'
}

enum AppointmentStatus {
  SCHEDULED = 'scheduled',
  CONFIRMED = 'confirmed',
  CHECKED_IN = 'checked_in',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show',
  RESCHEDULED = 'rescheduled'
}

enum Priority {
  NORMAL = 'normal',
  PRIORITY = 'priority',
  URGENT = 'urgent'
}
```

### 7.2 Entidade: WaitingList (Fila de Espera)

```typescript
interface WaitingList {
  id: string;
  patientId: string;
  appointmentType: AppointmentType;
  specialty: string;
  preferredPeriod: 'morning' | 'afternoon' | 'any';
  priority: Priority;
  notes?: string;
  addedAt: Date;
  notifiedAt?: Date;
  expiresAt?: Date;
  status: 'waiting' | 'notified' | 'scheduled' | 'expired' | 'cancelled';
}
```

### 7.3 Entidade: AppointmentHistory

```typescript
interface AppointmentHistory {
  id: string;
  appointmentId: string;
  action: 'created' | 'updated' | 'rescheduled' | 'cancelled' | 'checked_in' | 'completed';
  performedBy: string;
  performedAt: Date;
  previousData?: Record<string, any>;
  newData?: Record<string, any>;
  reason?: string;
  notes?: string;
}
```

## 8. Telas e Interfaces

### 8.1 Tela: Calendário de Agendamentos

**Componentes:**
- Header com filtros (unidade, data, visualização)
- Navegação de datas (anterior/próximo)
- Grid de agendamentos
- Sidebar com resumo do dia
- Botão flutuante "Novo Agendamento"

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│ [☰] Agendamentos        [Filtros ▼] [Hoje] [← → ]     │
├─────────────────────────────────────────────────────────┤
│                                              │          │
│  08:00 ┌──────────────────────┐             │ Resumo   │
│        │ João Silva           │             │          │
│        │ Consulta Presencial  │             │ 12/20    │
│  08:30 │ ✓ Confirmado         │             │ atend.   │
│        └──────────────────────┘             │          │
│                                              │ 3 aguard.│
│  09:00 ┌──────────────────────┐             │ 5 concl. │
│        │ Maria Santos         │             │          │
│  09:30 │ Teleconsulta         │             │ Taxa:    │
│        │ ⏰ Aguardando        │             │ 60%      │
│        └──────────────────────┘             │          │
│                                              │          │
│  10:00 [+ Horário disponível ]              │          │
│                                              │          │
│  10:30 ┌──────────────────────┐             │          │
│        │ José Oliveira        │             │          │
│  11:00 │ Retorno              │             │          │
│        │ 🔴 Atrasado          │             │          │
│        └──────────────────────┘             │          │
│                                              │          │
└─────────────────────────────────────────────┴──────────┘
                        [+ Novo Agendamento]
```

### 8.2 Modal: Novo Agendamento

```
┌──────────────────────────────────────────┐
│ Novo Agendamento                    [X]  │
├──────────────────────────────────────────┤
│                                          │
│ Paciente *                               │
│ [Buscar por CPF, CNS ou Nome...     🔍] │
│                                          │
│ Tipo de Atendimento *                    │
│ [Consulta Presencial        ▼]           │
│                                          │
│ Especialidade *                          │
│ [Clínico Geral              ▼]           │
│                                          │
│ Unidade Móvel *                          │
│ [Unidade Centro              ▼]          │
│                                          │
│ Data *            Hora *                 │
│ [15/06/2024]      [09:00    ▼]           │
│                                          │
│ Prioridade                               │
│ ○ Normal  ○ Prioritário  ○ Urgente      │
│                                          │
│ Queixa Principal                         │
│ [                                    ]   │
│                                          │
│ Observações                              │
│ [                                    ]   │
│                                          │
│ ☑ Enviar notificação ao paciente        │
│                                          │
│          [Cancelar]  [Agendar]           │
└──────────────────────────────────────────┘
```

### 8.3 Tela: Check-in

```
┌─────────────────────────────────────────────┐
│ Check-in de Pacientes                       │
├─────────────────────────────────────────────┤
│                                             │
│ [Buscar paciente...                    🔍] │
│                                             │
│ Agendamentos de Hoje                        │
│ ┌─────────────────────────────────────────┐ │
│ │ 09:00 - João Silva                      │ │
│ │ Consulta Presencial | CPF: 123.456.789  │ │
│ │              [Fazer Check-in]           │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ 09:30 - Maria Santos                    │ │
│ │ Teleconsulta | CPF: 987.654.321         │ │
│ │ ✓ Check-in realizado às 09:25           │ │
│ └─────────────────────────────────────────┘ │
│                                             │
│ ┌─────────────────────────────────────────┐ │
│ │ [+ Atendimento sem Agendamento]         │ │
│ └─────────────────────────────────────────┘ │
│                                             │
└─────────────────────────────────────────────┘
```

## 9. Validações e Erros

### 9.1 Validações de Agendamento

| Campo | Validação | Mensagem de Erro |
|-------|-----------|------------------|
| Paciente | Obrigatório, deve existir | "Selecione um paciente válido" |
| Data | Não pode ser passado | "Data não pode ser no passado" |
| Hora | Dentro do expediente | "Horário fora do expediente" |
| Tipo | Obrigatório | "Selecione o tipo de atendimento" |
| Unidade | Deve estar ativa | "Unidade não disponível nesta data" |

### 9.2 Conflitos de Horário

**Situação**: Tentar agendar em horário já ocupado

**Ação**:
- Exibir modal: "Horário já ocupado. Deseja encaixar como urgente?"
- Opções: "Sim, encaixar" | "Não, escolher outro horário"

### 9.3 Paciente com No-shows

**Situação**: Paciente tem 3+ no-shows

**Ação**:
- Exibir alerta: "Paciente tem [N] faltas. Confirmar agendamento?"
- Sugerir: Ligar para confirmar antes de agendar

## 10. Métricas e KPIs

### 10.1 Métricas Operacionais

- **Taxa de Ocupação**: (Agendamentos / Capacidade) × 100
- **Taxa de No-show**: (No-shows / Total Agendamentos) × 100
- **Taxa de Confirmação**: (Confirmados / Total Agendamentos) × 100
- **Tempo Médio de Espera**: Diferença entre check-in e início do atendimento
- **Taxa de Remarcação**: (Remarcações / Total Agendamentos) × 100

### 10.2 Metas

| Métrica | Meta |
|---------|------|
| Taxa de Ocupação | > 85% |
| Taxa de No-show | < 10% |
| Taxa de Confirmação | > 90% |
| Tempo Médio de Espera | < 15 minutos |
| Taxa de Remarcação | < 15% |

## 11. Modo Offline

### 11.1 Dados Sincronizados

- Agendamentos dos próximos 7 dias
- Dados básicos dos pacientes agendados
- Configurações da unidade móvel
- Histórico recente de agendamentos

### 11.2 Ações Permitidas Offline

- Visualizar agenda
- Fazer check-in de pacientes
- Adicionar observações
- Marcar no-show
- Criar agendamentos (salvo localmente)

### 11.3 Sincronização

**Quando conexão é restabelecida:**
1. Enviar check-ins realizados
2. Enviar novos agendamentos
3. Baixar atualizações (remarcações, cancelamentos)
4. Resolver conflitos (última alteração vence)
5. Notificar usuário sobre sincronização completa

## 12. Segurança e Auditoria

### 12.1 Controle de Acesso

| Papel | Permissões |
|-------|-----------|
| Operador | Criar, visualizar, editar, cancelar agendamentos |
| Técnico | Visualizar agenda, fazer check-in |
| Médico | Visualizar sua agenda |
| Coordenador | Todas as permissões + relatórios |

### 12.2 Auditoria

Registrar todas as ações:
- Criação de agendamento
- Edição (com diff)
- Cancelamento (com motivo)
- Check-in
- No-show marcado

**Campos de Auditoria:**
- Usuário que realizou ação
- Data/hora
- IP de origem
- Dados anteriores e novos
- Motivo (quando aplicável)

## 13. Testes e Qualidade

### 13.1 Casos de Teste Principais

1. **CT-001**: Criar agendamento com sucesso
2. **CT-002**: Impedir agendamento em horário ocupado
3. **CT-003**: Fazer check-in de paciente agendado
4. **CT-004**: Remarcar consulta
5. **CT-005**: Cancelar consulta
6. **CT-006**: Marcar no-show automaticamente
7. **CT-007**: Adicionar paciente à fila de espera
8. **CT-008**: Enviar lembretes automaticamente
9. **CT-009**: Sincronizar agendamentos offline
10. **CT-010**: Resolver conflito de horário

### 13.2 Testes de Performance

- Carregar agenda de 1 mês com 500 agendamentos: < 2s
- Criar novo agendamento: < 1s
- Fazer check-in: < 500ms
- Sincronizar 100 agendamentos offline: < 10s

## 14. Próximos Passos (Pós-MVP)

### 14.1 Features Futuras

- Agendamento recorrente (pacientes crônicos)
- Integração com WhatsApp Business para confirmações
- Sugestão inteligente de horários (IA)
- Agendamento online pelo paciente
- QR Code para check-in automático
- Análise preditiva de no-shows
- Otimização automática de agenda
- Video-agendamento (paciente agenda direto por vídeo)

### 14.2 Melhorias de UX

- Drag-and-drop para reagendar
- Visualização Kanban de pacientes
- Notificações push no navegador
- Modo escuro
- Atalhos de teclado
- Busca inteligente com autocomplete
