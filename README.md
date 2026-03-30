# ERP Pro

Enterprise Resource Planning system built with Next.js 14, Prisma, PostgreSQL, and Redis.

## Features

- **Dashboard** - Real-time metrics and KPIs visualization
- **CRM Module** - Customer relationship management with contacts and deals tracking
- **Inventory Management** - Stock tracking, alerts, and warehouse management
- **Order Processing** - Full order lifecycle from quote to delivery
- **Financial Module** - Invoicing, payments, and financial reporting
- **Analytics** - Business intelligence with customizable reports
- **Multi-tenant** - Support for multiple organizations
- **Role-based Access** - Granular permissions system
- **Real-time Updates** - WebSocket-powered live data
- **AI Assistant** - Integrated AI for insights and automation

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 (App Router), React 18, TypeScript |
| Styling | Tailwind CSS, Radix UI primitives |
| State | Zustand, React Query |
| Backend | Next.js API Routes, Prisma ORM |
| Database | PostgreSQL 16 |
| Cache | Redis 7 |
| Auth | JWT with refresh tokens |
| Validation | Zod schemas |

## Prerequisites

- Node.js 18+
- Docker & Docker Compose
- pnpm (recommended) or npm

## Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/matthieupesesse/erp-pro.git
cd erp-pro
npm install
```

### 2. Start Infrastructure

```bash
docker-compose up -d
```

This starts:
- PostgreSQL on port `5433`
- Redis on port `6380`

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/erp_pro?schema=public"
REDIS_URL="redis://localhost:6380"
JWT_SECRET="your-secret-key"
```

### 4. Initialize Database

```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
erp-pro/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (auth)/         # Auth routes (login, register)
│   │   ├── (dashboard)/    # Protected dashboard routes
│   │   ├── api/            # REST API endpoints
│   │   └── layout.tsx      # Root layout
│   ├── components/         # React components
│   │   ├── ui/            # Base UI primitives
│   │   ├── dashboard/     # Dashboard widgets
│   │   ├── crm/           # CRM components
│   │   └── shared/        # Reusable components
│   ├── lib/               # Core libraries
│   │   ├── prisma.ts      # Database client
│   │   ├── redis.ts       # Cache client
│   │   ├── auth.ts        # Authentication
│   │   └── utils.ts       # Helpers
│   ├── hooks/             # Custom React hooks
│   ├── stores/            # Zustand stores
│   ├── types/             # TypeScript types
│   └── schemas/           # Zod validation schemas
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data
├── docker-compose.yml     # Infrastructure
└── init-db.sql           # DB initialization
```

## API Reference

### Authentication

```
POST /api/auth/login      # Login
POST /api/auth/register   # Register
POST /api/auth/refresh    # Refresh token
POST /api/auth/logout     # Logout
```

### CRM

```
GET    /api/crm/contacts     # List contacts
POST   /api/crm/contacts     # Create contact
GET    /api/crm/contacts/:id # Get contact
PUT    /api/crm/contacts/:id # Update contact
DELETE /api/crm/contacts/:id # Delete contact
```

### Inventory

```
GET    /api/inventory/products     # List products
POST   /api/inventory/products     # Create product
GET    /api/inventory/stock        # Stock levels
PUT    /api/inventory/stock/:id    # Update stock
```

### Orders

```
GET    /api/orders           # List orders
POST   /api/orders           # Create order
PUT    /api/orders/:id       # Update order status
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `REDIS_URL` | Redis connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `JWT_REFRESH_SECRET` | Refresh token secret | Yes |
| `NEXT_PUBLIC_APP_URL` | Public app URL | Yes |
| `OPENAI_API_KEY` | For AI features | No |

## Scripts

```bash
npm run dev          # Start development
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint check
npm run test         # Run tests
npm run db:push      # Push schema changes
npm run db:seed      # Seed database
npm run db:studio    # Open Prisma Studio
```

## Deployment

### Docker Build

```bash
docker build -t erp-pro .
docker run -p 3000:3000 erp-pro
```

### Vercel

```bash
vercel deploy --prod
```

Ensure environment variables are set in Vercel dashboard.

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

## License

MIT License - see [LICENSE](LICENSE)

## Author

**Matthieu Pesesse**
- Website: [matthieupesesse.com](https://matthieupesesse.com)
- GitHub: [@matthieupesesse](https://github.com/matthieupesesse)

---

Built with Next.js, Prisma, and modern web technologies.
