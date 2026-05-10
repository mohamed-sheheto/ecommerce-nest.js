# AGENTS.md - Ecommerce Nest.js

## Dev Commands
- `npm run start` - Run development server
- `npm run start:dev` - Watch mode (auto-reload)
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run e2e tests
- `npm run lint` - Lint and fix
- `npm run build` - Build for production

## Architecture
- **Entry point**: `src/main.ts`
- **Root module**: `src/app.module.ts`
- **Database**: PostgreSQL via TypeORM (`src/database/database.module.ts`)
- **Auth**: JWT-based (`src/auth/`, `src/guards/jwtAuthGuard/`)
- **User**: User entity and CRUD (`src/user/`)

## Database Config
Requires env vars: `PG_HOST`, `PG_PORT`, `PG_USERNAME`, `PG_PASSWORD`, `PG_DATABASE`

## Important
- TypeORM `synchronize: true` in `database.module.ts` - auto-syncs schema on dev, **disable for production**
- Prettier config in `.prettierrc`
- ESLint config in `eslint.config.mjs`

## Test Files
- Unit: `src/**/*.spec.ts`
- E2E: `test/app.e2e-spec.ts`