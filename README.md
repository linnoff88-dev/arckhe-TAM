# ðŸ¥ Sistema TAM - TelessaÃºde e Telemedicina MÃ³vel

Sistema integrado para gestÃ£o de atendimentos de telessaÃºde em unidades mÃ³veis, conectando pacientes em comunidades vulnerÃ¡veis com mÃ©dicos especialistas remotos.

## ðŸ“‹ Sobre o Projeto

O Sistema TAM Ã© uma plataforma completa que permite:
- âœ… Atendimento mÃ©dico remoto via telemedicina
- âœ… ProntuÃ¡rio eletrÃ´nico do paciente (PEP)
- âœ… Funcionamento offline em Ã¡reas remotas
- âœ… IntegraÃ§Ã£o com e-SUS e DATASUS
- âœ… GestÃ£o de agendamentos e relatÃ³rios

**Meta**: Atender 6.000 pessoas/ano, reduzindo tempo de espera em 30%

## ðŸ“š DocumentaÃ§Ã£o

- [Viabilidade TÃ©cnica](./docs/viabilidade-tecnica.md) - AnÃ¡lise completa de viabilidade
- [PRD - Product Requirements](./docs/prd.md) - Requisitos do produto
- [Arquitetura](./docs/architecture.md) - Arquitetura do sistema
- [Tech Stack](./docs/tech-stack.md) - Stack tecnolÃ³gico

## ðŸš€ Quick Start

### PrÃ©-requisitos
- Node.js 20+
- PostgreSQL 15+
- Redis 7+
- Docker (opcional, mas recomendado)

### InstalaÃ§Ã£o com Docker

```bash
# Clone o repositÃ³rio
git clone https://github.com/seu-org/tam.git
cd tam

# Inicie com Docker Compose
docker-compose up -d

# Acesse:
# Frontend: http://localhost:3000
# API: http://localhost:4000
```

### InstalaÃ§Ã£o Manual

```bash
# Instale dependÃªncias
npm install

# Configure variÃ¡veis de ambiente
cp .env.example .env
# Edite .env com suas configuraÃ§Ãµes

# Execute migrations
npm run migration:run

# Inicie em desenvolvimento
npm run dev
```

## ðŸ—ï¸ Estrutura do Projeto

```
tam/
â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ frontend/          # AplicaÃ§Ã£o React
â”‚   â”‚   â”œâ”€â”€ components/    # Componentes React
â”‚   â”‚   â”œâ”€â”€ pages/         # PÃ¡ginas
â”‚   â”‚   â”œâ”€â”€ services/      # API clients
â”‚   â”‚   â””â”€â”€ store/         # State management
â”‚   â”‚
â”‚   â””â”€â”€ backend/           # API Node.js
â”‚       â”œâ”€â”€ controllers/   # Controllers
â”‚       â”œâ”€â”€ services/      # Business logic
â”‚       â”œâ”€â”€ repositories/  # Data access
â”‚       â”œâ”€â”€ entities/      # TypeORM entities
â”‚       â””â”€â”€ routes/        # Express routes
â”‚
â”œâ”€â”€ docs/                  # DocumentaÃ§Ã£o
â”œâ”€â”€ tests/                 # Testes
â””â”€â”€ docker/                # Docker configs
```

## ðŸ› ï¸ Scripts DisponÃ­veis

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
npm run test:unit      # Testes unitÃ¡rios
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

## ðŸ” SeguranÃ§a

- AutenticaÃ§Ã£o JWT com refresh tokens
- Criptografia AES-256 para dados sensÃ­veis
- HTTPS obrigatÃ³rio em produÃ§Ã£o
- Conformidade LGPD
- Audit trail de acessos

## ðŸ“Š Tecnologias

**Frontend**: React, TypeScript, TailwindCSS, Zustand
**Backend**: Node.js, Express, TypeORM, PostgreSQL
**Telemedicina**: WebRTC (Mediasoup), Socket.io
**Infraestrutura**: Docker, AWS, Nginx

Ver [Tech Stack completo](./docs/tech-stack.md)

## ðŸ¤ Contribuindo

```bash
# Crie uma branch
git checkout -b feature/minha-feature

# Commit com conventional commits
git commit -m "feat: adiciona funcionalidade X"

# Push e abra PR
git push origin feature/minha-feature
```

## ðŸ“ LicenÃ§a

Este projeto Ã© licenciado sob [MIT License](./LICENSE)

## ðŸ‘¥ Time

**Instituto Casa do Pai**
- Projeto de TelessaÃºde e Telemedicina MÃ³vel
- Contato: contato@casadopai.org.br

## ðŸ“ž Suporte

- **DocumentaÃ§Ã£o**: [docs/](./docs/)
- **Issues**: [GitHub Issues](https://github.com/seu-org/tam/issues)
- **Email**: suporte@tam.com.br

---

**VersÃ£o**: 1.0.0
**Status**: Em Desenvolvimento
**Ãšltima atualizaÃ§Ã£o**: Outubro 2025

---

Projeto adaptado da comunidade INEMA TDS - Marca Arckhe