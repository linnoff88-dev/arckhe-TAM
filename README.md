ï»¿# ê°Å¸ÂÂ¥ Sistema TAM - TelessaêÂºde e Telemedicina MêÂ³vel

Sistema integrado para gestêÂ£o de atendimentos de telessaêÂºde em unidades mêÂ³veis, conectando pacientes em comunidades vulnerêÂ¡veis com mêÂ©dicos especialistas remotos.

## ê°Å¸ââ¹ Sobre o Projeto

O Sistema TAM êÂ© uma plataforma completa que permite:
- ê¢Åâ¦ Atendimento mêÂ©dico remoto via telemedicina
- ê¢Åâ¦ ProntuêÂ¡rio eletrêÂ´nico do paciente (PEP)
- ê¢Åâ¦ Funcionamento offline em êÂ¡reas remotas
- ê¢Åâ¦ IntegraêÂ§êÂ£o com e-SUS e DATASUS
- ê¢Åâ¦ GestêÂ£o de agendamentos e relatêÂ³rios

**Meta**: Atender 6.000 pessoas/ano, reduzindo tempo de espera em 30%

## ê°Å¸âÅ¡ DocumentaêÂ§êÂ£o

- [Viabilidade TêÂ©cnica](./docs/viabilidade-tecnica.md) - AnêÂ¡lise completa de viabilidade
- [PRD - Product Requirements](./docs/prd.md) - Requisitos do produto
- [Arquitetura](./docs/architecture.md) - Arquitetura do sistema
- [Tech Stack](./docs/tech-stack.md) - Stack tecnolêÂ³gico

## ê°Å¸Å¡â¬ Quick Start

### PrêÂ©-requisitos
- Node.js 20+
- PostgreSQL 15+
- Redis 7+
- Docker (opcional, mas recomendado)

### InstalaêÂ§êÂ£o com Docker

```bash
# Clone o repositêÂ³rio
git clone https://github.com/seu-org/tam.git
cd tam

# Inicie com Docker Compose
docker-compose up -d

# Acesse:
# Frontend: http://localhost:3000
# API: http://localhost:4000
```

### InstalaêÂ§êÂ£o Manual

```bash
# Instale dependêÂªncias
npm install

# Configure variêÂ¡veis de ambiente
cp .env.example .env
# Edite .env com suas configuraêÂ§êÂµes

# Execute migrations
npm run migration:run

# Inicie em desenvolvimento
npm run dev
```

## ê°Å¸Ââê¯Â¸Â Estrutura do Projeto

```
tam/
ê¢âÅê¢ââ¬ê¢ââ¬ src/
ê¢ââ   ê¢âÅê¢ââ¬ê¢ââ¬ frontend/          # AplicaêÂ§êÂ£o React
ê¢ââ   ê¢ââ   ê¢âÅê¢ââ¬ê¢ââ¬ components/    # Componentes React
ê¢ââ   ê¢ââ   ê¢âÅê¢ââ¬ê¢ââ¬ pages/         # PêÂ¡ginas
ê¢ââ   ê¢ââ   ê¢âÅê¢ââ¬ê¢ââ¬ services/      # API clients
ê¢ââ   ê¢ââ   ê¢ââê¢ââ¬ê¢ââ¬ store/         # State management
ê¢ââ   ê¢ââ
ê¢ââ   ê¢ââê¢ââ¬ê¢ââ¬ backend/           # API Node.js
ê¢ââ       ê¢âÅê¢ââ¬ê¢ââ¬ controllers/   # Controllers
ê¢ââ       ê¢âÅê¢ââ¬ê¢ââ¬ services/      # Business logic
ê¢ââ       ê¢âÅê¢ââ¬ê¢ââ¬ repositories/  # Data access
ê¢ââ       ê¢âÅê¢ââ¬ê¢ââ¬ entities/      # TypeORM entities
ê¢ââ       ê¢ââê¢ââ¬ê¢ââ¬ routes/        # Express routes
ê¢ââ
ê¢âÅê¢ââ¬ê¢ââ¬ docs/                  # DocumentaêÂ§êÂ£o
ê¢âÅê¢ââ¬ê¢ââ¬ tests/                 # Testes
ê¢ââê¢ââ¬ê¢ââ¬ docker/                # Docker configs
```

## ê°Å¸âºÂ ê¯Â¸Â Scripts DisponêÂ­veis

```bash
# Desenvolvimento
npm run dev              # Inicia frontend + backend
npm run dev:frontend     # Apenas frontend
npm run dev:backend      # Apenas backend

# Build
npm run build           # Build completo
npm run build:frontend  # Build frontend
npm run build:backend   # Build backend

# Testes
npm test               # Todos os testes
npm run test:unit      # Testes unitêÂ¡rios
npm run test:e2e       # Testes E2E

# Qualidade
npm run lint           # ESLint
npm run format         # Prettier
npm run type-check     # TypeScript check

# Database
npm run migration:generate  # Gera migration
npm run migration:run       # Executa migrations
npm run seed               # Popula dados de teste
```

## ê°Å¸âÂ SeguranêÂ§a

- AutenticaêÂ§êÂ£o JWT com refresh tokens
- Criptografia AES-256 para dados sensêÂ­veis
- HTTPS obrigatêÂ³rio em produêÂ§êÂ£o
- Conformidade LGPD
- Audit trail de acessos

## ê°Å¸âÅ  Tecnologias

**Frontend**: React, TypeScript, TailwindCSS, Zustand
**Backend**: Node.js, Express, TypeORM, PostgreSQL
**Telemedicina**: WebRTC (Mediasoup), Socket.io
**Infraestrutura**: Docker, AWS, Nginx

Ver [Tech Stack completo](./docs/tech-stack.md)

## ê°Å¸Â¤Â Contribuindo

```bash
# Crie uma branch
git checkout -b feature/minha-feature

# Commit com conventional commits
git commit -m "feat: adiciona funcionalidade X"

# Push e abra PR
git push origin feature/minha-feature
```

## ê°Å¸âÂ LicenêÂ§a

Este projeto êÂ© licenciado sob [MIT License](./LICENSE)

## ê°Å¸âÂ¥ Time

**Instituto Casa do Pai**
- Projeto de TelessaêÂºde e Telemedicina MêÂ³vel
- Contato: contato@casadopai.org.br

## ê°Å¸âÅ¾ Suporte

- **DocumentaêÂ§êÂ£o**: [docs/](./docs/)
- **Issues**: [GitHub Issues](https://github.com/seu-org/tam/issues)
- **Email**: suporte@tam.com.br

---

**VersêÂ£o**: 1.0.0
**Status**: Em Desenvolvimento
**êÅ¡ltima atualizaêÂ§êÂ£o**: Outubro 2025

---

Projeto  - ARCKHÉe