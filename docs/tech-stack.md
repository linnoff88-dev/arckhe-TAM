# Tech Stack - Sistema TAM

## Stack Tecnológico Completo

### Frontend
- **React 18** - Framework UI
- **TypeScript 5** - Linguagem tipada
- **Vite** - Build tool rápido
- **TailwindCSS** - Styling utility-first
- **Zustand** - State management leve
- **React Router v6** - Roteamento
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validaçêo de schemas
- **Axios** - Cliente HTTP
- **Dexie.js** - Wrapper IndexedDB
- **Workbox** - Service Workers (PWA)

### Backend
- **Node.js 20 LTS** - Runtime JavaScript
- **Express 4** - Framework web
- **TypeScript 5** - Linguagem tipada
- **TypeORM** - ORM para PostgreSQL
- **PostgreSQL 15** - Banco de dados principal
- **Redis 7** - Cache e sessões
- **Passport.js** - Autenticaçêo
- **JWT** - Tokens de sessêo
- **Bcrypt** - Hash de senhas
- **Winston** - Logging
- **Joi** - Validaçêo de dados
- **Bull** - Filas de jobs

### Telemedicina
- **Mediasoup** - WebRTC SFU server
- **Socket.io** - Comunicaçêo real-time
- **Coturn** - TURN/STUN server

### Infraestrutura
- **Docker** - Containerizaçêo
- **Docker Compose** - Orquestraçêo local
- **Nginx** - Reverse proxy
- **AWS ECS** - Container orchestration (produçêo)
- **AWS RDS** - PostgreSQL gerenciado
- **AWS S3** - Armazenamento de arquivos
- **AWS CloudFront** - CDN

### DevOps e Qualidade
- **GitHub Actions** - CI/CD
- **Jest** - Testes unitários
- **Supertest** - Testes de API
- **Playwright** - Testes E2E
- **ESLint** - Linting
- **Prettier** - Formataçêo
- **Husky** - Git hooks

### Monitoramento
- **Prometheus** - Métricas
- **Grafana** - Visualizaçêo
- **Sentry** - Error tracking
- **Winston + ELK** - Logs centralizados

## Justificativa das Escolhas

### Por que React?
- Ecossistema maduro
- PWA support excelente
- Grande comunidade
- Fácil de contratar desenvolvedores

### Por que Node.js?
- JavaScript full-stack
- Excelente para I/O intensivo
- WebSocket/WebRTC nativos
- NPM ecosystem rico

### Por que PostgreSQL?
- ACID compliance
- JSON support (flexibilidade)
- Replicaçêo robusta
- Open-source

### Por que TypeScript?
- Type safety
- Melhor IDE support
- Reduz bugs em produçêo
- Documentaçêo implícita
