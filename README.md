# Hapi.Cakes

A full-stack custom cake showcase and management platform built to simulate a real bakery business workflow.

Hapi.Cakes demonstrates end-to-end product engineering: a customer-facing experience for browsing cakes and submitting requests, plus an authenticated admin area for managing catalog content, images, and site copy.

## Portfolio Summary

- Built a monorepo with clear separation between frontend (`React + Vite`) and backend (`Spring Boot`).
- Designed a role-based API architecture with public, auth, and admin routes.
- Implemented admin authentication using JWT in HTTP-only cookies.
- Integrated Cloudinary for media uploads and centralized image hosting.
- Added CMS-like editable site copy managed from the admin interface.
- Modeled business entities in MongoDB (cakes, categories, orders, media, admins, login history).

## Tech Stack

### Frontend
- React 19
- Vite
- React Router
- Tailwind CSS
- Axios / Fetch API

### Backend
- Java 17
- Spring Boot (Web MVC, Security, Validation)
- Spring Data MongoDB
- JWT (`jjwt`)
- Java Mail Sender (SMTP)
- Cloudinary SDK

### Deployment / Infra
- Vercel rewrite configuration (`frontend/vercel.json`)
- Dockerfile for backend container deployment (`backend/Dockerfile`)

## Architecture

```text
Frontend (React/Vite)
  -> /api/public/*   (public content)
  -> /api/auth/*     (admin login/logout)
  -> /api/admin/*    (protected admin operations)

Backend (Spring Boot)
  -> MongoDB         (application data)
  -> Cloudinary      (image storage)
  -> SMTP            (order notifications)
```

## Key Features

### Public Features
- Homepage with dynamic content sections
- Cake galleries (including social/elegant variants)
- Cake detail page
- Feedback image gallery
- Contact and custom order forms

### Admin Features
- Login/logout and session validation
- Cake CRUD management
- Category CRUD management
- Image uploads for featured, category, and cake media
- Editable site copy (live text updates)
- Password update endpoint

### Backend Models
- `Cake`
- `CakeCategory`
- `HomepageImage`
- `FeedbackImage`
- `SiteCopy`
- `OrderRequest`
- `AdminUser`
- `AdminLoginHistory`

## API Overview

### Public
- `GET /api/public/cakes`
- `GET /api/public/cakes/featured`
- `GET /api/public/cakes/{id}/feedback-images`
- `GET /api/public/categories`
- `GET /api/public/homepage-images`
- `GET /api/public/feedback-images`
- `GET /api/public/site-copy`

### Auth
- `POST /api/auth/login`
- `POST /api/auth/logout`

### Admin (Authenticated)
- `GET/POST/PUT/DELETE /api/admin/cakes[/{id}]`
- `GET/POST/PUT/DELETE /api/admin/categories[/{id}]`
- `POST /api/admin/upload/featured`
- `POST /api/admin/upload/category/{type}`
- `POST /api/admin/upload/cake`
- `POST /api/admin/feedback-images`
- `PUT /api/admin/site-copy`
- `GET /api/admin/me`
- `PUT /api/admin/password`

### Utility
- `GET /api/health`
- `POST /api/orders`

## Project Structure

```text
Hapi.Cakes/
├── frontend/   # React + Vite application
└── backend/    # Spring Boot REST API
```

## Local Setup

### Prerequisites
- Node.js 20+
- npm 10+
- Java 17+
- MongoDB instance

### 1) Backend environment
Create `backend/.env`:

```env
PORT=8080
SPRING_DATA_MONGODB_URI=mongodb://localhost:27017/hapi_cakes

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

MAIL_USERNAME=...
MAIL_PASSWORD=...

JWT_SECRET=replace-with-strong-secret-at-least-32-chars
JWT_EXPIRATION_MS=86400000
JWT_SECURE_COOKIE=false
JWT_SAMESITE=Lax

# Optional (dev hash helper)
# ADMIN_SEED_EMAIL=admin@example.com
# ADMIN_SEED_PASSWORD=change-me
```

### 2) Frontend environment
Create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:8080
```

### 3) Run backend

```bash
cd backend
./mvnw spring-boot:run
```

### 4) Run frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.

## Deployment Notes

- Frontend rewrite rule proxies `/api/*` to backend (`frontend/vercel.json`).
- Backend can be deployed via Docker (`backend/Dockerfile`).
- For production, use `JWT_SECURE_COOKIE=true` and configure allowed CORS origins.

## Current Status

Core catalog and admin workflows are implemented and actively evolving.

## CV / Recruiter Focus

This project highlights:
- full-stack architecture decisions,
- secure admin workflow implementation,
- third-party service integration (Cloudinary, SMTP),
- modular code organization for maintainability.
