# Estudo de Viabilidade Técnica
## Projeto TAM - Telessaúde e Telemedicina Móvel

**Versão:** 1.0
**Data:** Outubro 2025
**Responsável:** Instituto Casa do Pai

---

## Sumário Executivo

Este documento apresenta a análise de viabilidade técnica para implementação do projeto TAM (Telessaúde e Telemedicina Móvel), que visa levar atendimento médico especializado para comunidades vulneráveis através de unidades móveis equipadas com tecnologia de telemedicina.

**Objetivo:** Atender 6.000 pessoas/ano, reduzindo o tempo de espera em 30% e promovendo integração com a rede SUS.

---

## 1. Infraestrutura da Unidade Móvel

### 1.1 Especificações do Veículo

#### Veículo Base Recomendado
- **Modelo:** Fiat Ducato Maxicargo ou Mercedes-Benz Sprinter 415 CDI
- **Comprimento:** 6,0 - 7,0 metros
- **Altura interna:** Mínimo 1,90m
- **Peso bruto:** Até 3.500 kg
- **Motor:** Diesel, mínimo 130 cv

#### Adaptações Necessárias
1. **Acessibilidade**
   - Rampa elétrica de acesso (capacidade 300kg)
   - Piso antiderrapante e nivelado
   - Corrimãos internos
   - Largura mínima de portas: 90cm
   - Conforme NBR 9050 (Acessibilidade)

2. **Divisão Interna**
   - Área de recepção/triagem (2m²)
   - Consultório de atendimento (6m²)
   - Área de equipamentos médicos (2m²)
   - Sanitário adaptado (1,5m²)
   - Área técnica/servidores (1m²)

3. **Sistemas de Climatização**
   - Ar condicionado central 24.000 BTUs
   - Sistema de ventilação forçada
   - Isolamento térmico completo
   - Temperatura controlada: 20-24°C

4. **Sistema Elétrico**
   - Gerador auxiliar 5 KVA
   - Banco de baterias 12V/200Ah
   - Inversores de voltagem 3000W
   - Quadro elétrico com disjuntores
   - Tomadas estabilizadas para equipamentos médicos
   - Nobreak dedicado para equipamentos críticos

5. **Segurança**
   - Sistema de alarme
   - Câmeras de segurança internas
   - Travas de segurança reforçadas
   - Extintor de incêndio tipo ABC
   - Kit de primeiros socorros

### 1.2 Conformidade Regulatória
- **ANVISA:** RDC nº 50/2002 (Estabelecimentos de Saúde)
- **CONTRAN:** Resolução para veículos adaptados
- **ABNT:** NBR 9050 (Acessibilidade)
- **Licenciamento:** Alvará sanitário municipal/estadual

### 1.3 Estimativa de Custos - Unidade Móvel

| Item | Especificação | Custo Estimado (R$) |
|------|---------------|---------------------|
| Veículo base | Fiat Ducato Maxicargo 2024 | 250.000 |
| Adaptações estruturais | Divisórias, piso, isolamento | 80.000 |
| Rampa de acessibilidade | Rampa elétrica automática | 15.000 |
| Sistema elétrico | Gerador, baterias, inversores | 35.000 |
| Climatização | Ar condicionado + ventilação | 18.000 |
| Mobiliário | Maca, cadeiras, armários | 12.000 |
| Sanitário | Instalação completa adaptada | 8.000 |
| **TOTAL UNIDADE MÓVEL** | | **418.000** |

---

## 2. Arquitetura Tecnológica

### 2.1 Hardware - Equipamentos de TI

| Equipamento | Especificação | Qtd | Valor Unit. (R$) | Total (R$) |
|-------------|---------------|-----|------------------|------------|
| Computador All-in-One | Dell OptiPlex 27", i5, 16GB RAM, 512GB SSD | 2 | 4.500 | 9.000 |
| Tablet médico | iPad 10ª geração 64GB + case | 2 | 3.500 | 7.000 |
| Monitor secundário | LG 24" Full HD | 1 | 800 | 800 |
| Webcam 4K | Logitech Brio | 2 | 1.200 | 2.400 |
| Headset médico | Jabra Evolve2 65 | 2 | 1.500 | 3.000 |
| Impressora térmica | Zebra ZD410 (etiquetas/receitas) | 1 | 2.000 | 2.000 |
| Roteador 4G/5G | MikroTik LTE18 kit | 1 | 2.500 | 2.500 |
| Switch gerenciável | TP-Link 8 portas Gigabit | 1 | 400 | 400 |
| No-break | APC 1500VA | 2 | 1.200 | 2.400 |
| HD externo backup | Seagate 2TB | 2 | 400 | 800 |
| **SUBTOTAL HARDWARE TI** | | | | **30.300** |

### 2.2 Equipamentos Médicos e Telemedicina

| Equipamento | Especificação | Qtd | Valor Unit. (R$) | Total (R$) |
|-------------|---------------|-----|------------------|------------|
| Estetoscópio digital | Littmann 3200 | 2 | 3.500 | 7.000 |
| Otoscópio digital | Welch Allyn MacroView | 1 | 2.800 | 2.800 |
| Dermatoscópio digital | Heine Delta 20T | 1 | 4.500 | 4.500 |
| Eletrocardiógrafo | ECG 12 derivações c/ telemedicina | 1 | 8.000 | 8.000 |
| Oxímetro | Oxímetro de pulso de dedo | 3 | 200 | 600 |
| Glicosímetro | Accu-Chek Guide | 2 | 150 | 300 |
| Termômetro digital | Infravermelho sem contato | 2 | 250 | 500 |
| Esfigmomanômetro | Digital automático | 2 | 300 | 600 |
| Balança digital | Com estadiômetro, cap. 200kg | 1 | 800 | 800 |
| Maca hospitalar | Elétrica com regulagem de altura | 1 | 5.000 | 5.000 |
| Foco clínico LED | Portátil com bateria | 1 | 1.200 | 1.200 |
| Nebulizador | Portátil ultrassônico | 1 | 350 | 350 |
| **SUBTOTAL EQUIPAMENTOS MÉDICOS** | | | | **31.650** |

### 2.3 Software e Licenças

| Software | Descrição | Custo Anual (R$) |
|----------|-----------|------------------|
| Sistema de Prontuário Eletrônico | PEP customizado (desenvolvimento) | 80.000 (único) |
| Plataforma de Telemedicina | Zoom Healthcare ou similar | 12.000 |
| Microsoft 365 Business | E-mail, Office, OneDrive (5 usuários) | 3.600 |
| Antivírus Corporativo | ESET Endpoint Security | 1.200 |
| Sistema de Backup Cloud | 1TB Google Workspace ou AWS | 2.400 |
| VPN Corporativa | OpenVPN Enterprise (5 conexões) | 3.000 |
| **TOTAL SOFTWARE (ANUAL)** | | **22.200** |

---

## 3. Conectividade e Infraestrutura de Rede

### 3.1 Soluções de Conectividade

#### Opção Principal: Internet Móvel 4G/5G
- **Provedor:** Vivo, Claro ou TIM (plano empresarial)
- **Plano:** 200GB/mês com prioridade de dados
- **Velocidade mínima:** 10 Mbps download / 5 Mbps upload
- **Custo mensal:** R$ 300

#### Opção Backup: Internet via Satélite
- **Provedor:** Starlink (para áreas remotas)
- **Equipamento:** Kit Starlink Business
- **Custo inicial:** R$ 9.000
- **Mensalidade:** R$ 900
- **Velocidade:** 150-500 Mbps

### 3.2 Requisitos de Largura de Banda

| Aplicação | Largura de Banda Mínima |
|-----------|-------------------------|
| Videoconferência médica (HD) | 3 Mbps up/down |
| Envio de exames/imagens | 2 Mbps upload |
| Acesso PEP cloud | 1 Mbps |
| **Total Recomendado** | **10 Mbps simétrico** |

### 3.3 Segurança de Rede
- VPN dedicada para comunicação com central médica
- Firewall configurado no roteador
- Criptografia end-to-end para videoconferências
- Certificado SSL para sistemas web
- Conformidade com LGPD

### 3.4 Custos de Conectividade

| Item | Custo Mensal (R$) | Custo Anual (R$) |
|------|-------------------|------------------|
| Internet 4G/5G (principal) | 300 | 3.600 |
| Starlink (backup emergencial) | 900 | 10.800 |
| VPN Enterprise | 250 | 3.000 |
| **TOTAL CONECTIVIDADE** | **1.450** | **17.400** |

---

## 4. Sistemas de Informação

### 4.1 Sistema de Prontuário Eletrônico (PEP)

#### Funcionalidades Essenciais
- Cadastro de pacientes
- Registro de anamnese e exame físico
- Prescrição médica eletrônica
- Solicitação de exames
- Histórico de atendimentos
- Integração com e-SUS AB

#### Requisitos Técnicos
- **Arquitetura:** Web-based (PWA - Progressive Web App)
- **Frontend:** React + TypeScript
- **Backend:** Node.js + PostgreSQL
- **Hospedagem:** AWS ou Azure (com certificação HIPAA/ISO 27001)
- **Offline-first:** Funciona sem internet e sincroniza depois
- **Segurança:** Autenticação multi-fator, logs de auditoria

### 4.2 Sistema de Agendamento
- Integração com UBS locais
- Agendamento por telefone/WhatsApp
- Confirmação automática de consultas
- Gestão de fila de espera

### 4.3 Plataforma de Telemedicina
- Videoconferência em alta definição
- Compartilhamento de tela/imagens
- Gravação de consultas (com consentimento)
- Chat seguro médico-paciente

### 4.4 Integração com DATASUS
- **e-SUS AB:** Envio de produções ambulatoriais
- **CNES:** Registro de estabelecimento e profissionais
- **Horus:** Gestão de medicamentos (se aplicável)
- **SISREG:** Regulação de encaminhamentos

### 4.5 Conformidade LGPD
- Termo de consentimento digital
- Criptografia de dados em repouso e em trânsito
- Política de retenção de dados
- Direito ao esquecimento
- DPO (Data Protection Officer) designado

---

## 5. Recursos Humanos Técnicos

### 5.1 Equipe por Unidade Móvel

| Função | Quantidade | Custo Mensal Unit. (R$) | Total Mensal (R$) |
|--------|------------|-------------------------|-------------------|
| Médico remoto (telemedic) | 2 | 8.000 | 16.000 |
| Técnico de enfermagem | 1 | 4.000 | 4.000 |
| Operador de tecnologia | 1 | 3.500 | 3.500 |
| Motorista (CNH D) | 1 | 3.000 | 3.000 |
| **TOTAL RH** | | | **26.500** |

### 5.2 Equipe de Suporte (Centralizada)
| Função | Quantidade | Custo Mensal (R$) |
|--------|------------|-------------------|
| Coordenador técnico | 1 | 6.000 |
| Desenvolvedor/Suporte TI | 1 | 5.500 |
| **TOTAL SUPORTE** | | **11.500** |

---

## 6. Estimativa de Custos Consolidada

### 6.1 CAPEX (Investimento Inicial)

| Categoria | Valor (R$) |
|-----------|------------|
| Unidade Móvel (veículo + adaptações) | 418.000 |
| Hardware e Equipamentos TI | 30.300 |
| Equipamentos Médicos | 31.650 |
| Desenvolvimento de Software (PEP) | 80.000 |
| Infraestrutura inicial (Starlink kit) | 9.000 |
| Contingência (10%) | 56.895 |
| **TOTAL CAPEX** | **625.845** |

### 6.2 OPEX (Custos Operacionais Mensais/Anuais)

| Categoria | Mensal (R$) | Anual (R$) |
|-----------|-------------|------------|
| Recursos Humanos | 38.000 | 456.000 |
| Conectividade | 1.450 | 17.400 |
| Licenças de Software | 1.850 | 22.200 |
| Manutenção veículo | 1.500 | 18.000 |
| Combustível (estimado 2.000km/mês) | 2.000 | 24.000 |
| Manutenção equipamentos | 800 | 9.600 |
| Materiais médicos consumíveis | 2.000 | 24.000 |
| Seguro do veículo | 500 | 6.000 |
| **TOTAL OPEX** | **48.100** | **577.200** |

### 6.3 Custo Total no Primeiro Ano
- **CAPEX:** R$ 625.845
- **OPEX (12 meses):** R$ 577.200
- **TOTAL ANO 1:** R$ 1.203.045

### 6.4 Custo por Atendimento
- **Meta:** 6.000 atendimentos/ano
- **Custo ano 1:** R$ 1.203.045
- **Custo por atendimento:** R$ 200,51

---

## 7. Fornecedores e Parceiros Recomendados

### 7.1 Veículos e Adaptações
- **Veículos:** Fiat, Mercedes-Benz, Iveco
- **Adaptações:** Carboni, Marimar Veículos Especiais, Nortec

### 7.2 Equipamentos Médicos
- **Distribuidores:** Cirúrgica União, SP Medical, Hospmed
- **Telemedicina:** Portal Telemedicina, Morsch, Telelaudo

### 7.3 TI e Conectividade
- **Hardware:** Dell, Lenovo, HP
- **Conectividade:** Vivo Empresas, Claro, Starlink
- **Cloud:** AWS, Azure, Google Cloud

### 7.4 Desenvolvimento de Software
- **Opções:**
  - Desenvolvimento in-house (equipe própria)
  - Contratação de software house especializada em saúde
  - Adaptação de PEP open-source (OpenMRS, Bahmni)

---

## 8. Cronograma de Implementação

### Fase 1: Planejamento e Aquisições (Meses 1-3)
- Mês 1: Finalização de especificações técnicas
- Mês 1-2: Licitação e compra do veículo base
- Mês 2: Contratação de fornecedores de adaptação
- Mês 3: Aquisição de equipamentos médicos e TI

### Fase 2: Desenvolvimento e Adaptações (Meses 3-6)
- Meses 3-6: Adaptação da unidade móvel
- Meses 3-6: Desenvolvimento do sistema PEP
- Mês 5: Instalação de equipamentos
- Mês 6: Integração e testes de sistemas

### Fase 3: Testes e Homologação (Mês 7)
- Testes de campo sem pacientes
- Homologação de sistemas
- Treinamento de equipe
- Licenciamento e alvarás

### Fase 4: Operação Piloto (Mês 8)
- Operação em 1 localidade
- Ajustes e melhorias
- Coleta de feedback

### Fase 5: Operação Plena (Mês 9+)
- Início da operação regular
- Expansão para rotas planejadas

**Tempo total estimado:** 8-9 meses

---

## 9. Análise de Riscos Técnicos

### 9.1 Riscos Identificados

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Falta de conectividade em áreas remotas | Alta | Alto | Starlink como backup + modo offline |
| Falha em equipamentos críticos | Média | Alto | Equipamentos reserva + seguro |
| Atraso no desenvolvimento de software | Média | Médio | Usar solução provisória pronta |
| Quebra do veículo | Média | Alto | Manutenção preventiva + veículo reserva |
| Não conformidade ANVISA | Baixa | Alto | Consultoria especializada prévia |
| Vazamento de dados (LGPD) | Baixa | Alto | Segurança multicamadas + auditoria |

### 9.2 Planos de Contingência
- **Conectividade:** Operar em modo offline + sincronização posterior
- **Energia:** Gerador + banco de baterias (autonomia 4h)
- **Equipamentos:** Kits reserva para itens críticos
- **Veículo:** Contrato de assistência 24h + veículo reserva (após expansão)

---

## 10. Conclusão e Recomendações

### 10.1 Viabilidade Técnica: ✅ POSITIVA

O projeto TAM é **tecnicamente viável** com as seguintes condições:

**Pontos Fortes:**
- Tecnologia madura e disponível no mercado brasileiro
- Fornecedores qualificados identificados
- Conformidade regulatória alcançável
- Modelo operacional testado em projetos similares

**Desafios a Endereçar:**
- Garantir conectividade estável em áreas remotas (solução: Starlink)
- Desenvolver sistema de informação robusto e integrado
- Capacitar equipe para uso de tecnologias
- Manter custos operacionais sustentáveis

### 10.2 Investimento Recomendado

**Cenário Inicial (1 unidade):**
- CAPEX: R$ 625.845
- OPEX anual: R$ 577.200
- Total ano 1: R$ 1.203.045

**ROI Social:**
- 6.000 atendimentos/ano
- Redução de 30% no tempo de espera
- Custo/atendimento: R$ 200,51 (competitivo vs. SUS)

### 10.3 Próximos Passos

1. **Aprovação do projeto e captação de recursos** (1 mês)
2. **Contratação de equipe técnica de gestão** (1 mês)
3. **Início das aquisições e desenvolvimento** (conforme cronograma)
4. **Acompanhamento mensal com KPIs técnicos**

### 10.4 Recomendação Final

✅ **Recomendamos avançar com o projeto**, priorizando:
- Parceria com fornecedores experientes
- Desenvolvimento ágil e iterativo do software
- Piloto bem estruturado antes da expansão
- Plano robusto de manutenção e suporte

---

**Documento preparado por:** Equipe Técnica TAM
**Última atualização:** Outubro 2025
**Versão:** 1.0
