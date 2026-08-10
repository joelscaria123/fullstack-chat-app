# WaveChat

WaveChat is a full-stack real-time chat application built with React + Vite on the frontend and Express + MongoDB on the backend. It supports Clerk authentication, online presence, message history, media uploads, and a polished user interface with theme and wallpaper customization.

## Overview

This project is structured as a monorepo with two main apps:

- `frontend/` — React SPA for the client experience
- `backend/` — Express API, MongoDB models, Clerk sync, and Socket.IO server

The app enables users to:

- sign in and out with Clerk
- browse other users and existing conversations
- send text and media messages
- receive real-time updates from online contacts
- view chat history from MongoDB
- customize interface themes and wallpaper styles

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Zustand
- Tailwind CSS
- HeroUI
- Clerk React SDK
- Socket.IO client
- Axios

### Backend

- Node.js
- Express 5
- MongoDB + Mongoose
- Socket.IO
- Clerk Express SDK
- ImageKit for media upload
- Multer for multipart uploads
- Cron jobs for health checks

## Project Structure

```text
my-chat-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── lib/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── seeds/
│   │   ├── webhooks/
│   │   ├── index.js
│   │   └── ...
│   ├── .env
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── src/
│   ├── public/
│   ├── .env
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── Dockerfile
├── .dockerignore
├── .gitignore
└── README.md
```

## Features

- Clerk-based authentication and session validation
- MongoDB-backed user/profile sync with Clerk webhook handling
- Real-time online user tracking through Socket.IO
- One-to-one chat conversations with message history
- Image and video message uploads via ImageKit
- Search across users and active conversations
- Responsive chat UI for desktop and mobile layouts
- Theme presets and wallpaper selection
- Production-ready static serving from the Express app

## Environment Variables

### Backend (`backend/.env`)

```env
PORT=3000
MONGO_URI=mongodb://<username>:<password>@<host>:27017/<db>?ssl=true&replicaSet=...&authSource=admin
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SIGNING_SECRET=whsec_...
FRONTEND_URL=http://localhost:5173
IMAGEKIT_PRIVATE_KEY=private_...
NODE_ENV=development
```

### Frontend (`frontend/.env`)

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
```

Notes:

- `MONGO_URI` must point to a valid MongoDB instance.
- `CLERK_SECRET_KEY` and `CLERK_WEBHOOK_SIGNING_SECRET` are required for auth and webhook verification.
- `IMAGEKIT_PRIVATE_KEY` is required if media uploads are enabled.
- `FRONTEND_URL` is used by the backend CORS config and realtime socket origin.

## Installation

From the project root:

```bash
cd backend && npm install
cd ../frontend && npm install
```

If you are using the repository’s existing `.env` files, they are already included for local development. Update them if you need to point to a different MongoDB, Clerk tenant, or ImageKit account.

## Running the App

### 1) Start the backend

```bash
cd backend
npm run dev
```

This starts the Express API on port `3000` by default.

### 2) Start the frontend

```bash
cd frontend
npm run dev
```

This runs the Vite frontend on `http://localhost:5173`.

### 3) Production build

```bash
cd frontend
npm run build

cd ../backend
npm run build
```

The backend includes a production static-serving flow that will serve the built frontend from its `public/` directory.

## Main Backend API

The backend API is mounted under `/api`.

### Auth

- `GET /api/auth/check` — verifies authentication and returns the current user profile
- `POST /api/webhooks/clerk` — Clerk webhook endpoint for syncing user creation, update, and deletion

### Messages

- `GET /api/messages/users` — fetch all users except the current user
- `GET /api/messages/conversations` — get recent conversation partners for the sidebar
- `GET /api/messages/:id` — get message history with a specific user
- `POST /api/messages/send/:id` — send a text or media message to a user

### System

- `GET /health` — health check route

## Real-Time Communication

The backend exposes a Socket.IO server and tracks online users with a socket-to-user mapping. When a user connects, the server stores their socket ID and broadcasts the active user list to clients.

When a message is sent, the message is persisted to MongoDB and emitted to the receiving user in realtime if they are connected.

## Media Uploads

The app supports sending images and videos using ImageKit.

Upload flow:

1. client sends a file via `multipart/form-data`
2. backend checks file type and size limits
3. file is uploaded to ImageKit inside the `/chat` folder
4. URL is saved to the message record
5. the message is returned to the client and broadcast in realtime

## Docker

A Dockerfile is included at the project root for a production-style build.

```bash
docker build -t wavechat .
docker run -p 3001:3001 wavechat
```

The Docker build compiles the frontend and backend, then serves the app through the Node backend runtime.

## Notes and Conventions

- The backend is configured as ESM (`"type": "module"`).
- Socket origin is controlled by `FRONTEND_URL`.
- The app uses `clerkMiddleware()` and protected routes to secure APIs.
- User sync is handled automatically through Clerk webhooks to keep MongoDB user records consistent with the authentication system.

## License

This project does not currently declare a license in the repository metadata.

## Recommended Next Steps

- add environment template files like `.env.example`
- add CI checks for lint and build validation
- add automated tests for route and socket behavior
- add deployment configuration for Vercel, Render, or Docker Compose
