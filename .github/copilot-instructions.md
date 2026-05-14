# Copilot instructions for Hapi.Cakes

## Big picture architecture

- Monorepo with separate apps: `frontend/` (React + Vite) and `backend/` (Spring Boot REST API).
- API surface is grouped by path: public (`/api/public/*`), auth (`/api/auth/*`), and admin (`/api/admin/*`). See backend controllers in `backend/src/main/java/com/Hapi/Cakes/backend/controller/`.
- Admin auth uses JWT stored in an HTTP-only cookie (`HAPI_ADMIN_JWT`) validated by `JwtAuthenticationFilter` + `SecurityConfig`.
- External services: MongoDB for data, Cloudinary for image storage, SMTP for order notifications (see `application.yml`).

## Frontend patterns

- Use the shared API helpers:
  - `fetchPublic` for public routes and `fetchAdmin`/`adminApi` for admin routes (cookies + 401 redirect handling).
  - Unauthorized admin responses trigger `handleUnauthorized()` and redirect to `/admin/login`.
- Routes are centralized in `frontend/src/app/routes.jsx` and rendered via `frontend/src/app/App.jsx` (layout + providers).
- UI styling relies on Tailwind utility tokens and shared class strings in `frontend/src/components/common/designSystem.js` (prefer `cx()` + exported class constants for new UI).

## Backend patterns

- Standard layered structure: controller → service → repository → model under `com.Hapi.Cakes.backend`.
- Security is stateless; only `/api/admin/**` requires authentication (see `SecurityConfig`).
- Environment variables are loaded from `.env` at runtime (`DotenvConfig`) and mapped in `application.yml`.

## Dev workflows (from README)

- Backend: `./mvnw spring-boot:run` in `backend/`.
- Frontend: `npm install` then `npm run dev` in `frontend/`.
- Local env files: `backend/.env` (MongoDB, Cloudinary, JWT, Mail) and `frontend/.env` (`VITE_API_BASE_URL`).

## Integration notes

- Vercel rewrites `/api/*` to the hosted backend (`frontend/vercel.json`).
- Admin session state is stored in `AdminAuthContext` and should be updated when auth endpoints change.
