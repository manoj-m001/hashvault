<div align="center">

# HashVault

### Your credentials, organized and secure.

A personal password manager for generating, storing, and managing website credentials in one authenticated dashboard.

[Preview](#preview) · [How to run](#how-to-run) · [Tech stack](#tech-stack) · [Design decisions](#design-decisions)

</div>

## Preview

![HashVault landing page](Screenshot%202026-10-05%20131535.png)

## Features

- Sign in and sign up with Clerk authentication.
- Generate passwords that follow the app's validation rules.
- Save credentials with a site name and username.
- View, reveal, and copy saved passwords.
- Delete saved credentials.
- Store each credential under the authenticated user's account.

## Tech stack

| Area              | Technology                                                              |
| ----------------- | ----------------------------------------------------------------------- |
| Frontend          | React 18, Vite 5, Tailwind CSS 3                                        |
| Authentication    | Clerk React in the frontend and Clerk Express middleware in the backend |
| Backend           | Node.js, Express 4                                                      |
| Database          | MongoDB Node.js driver                                                  |
| Password handling | bcrypt hashing and Node.js crypto AES-256-CBC encryption                |

## Design decisions

- **Separate frontend and backend:** the React/Vite client handles the dashboard, while an Express API owns database access and credential operations.
- **Authenticated API:** Clerk provides sign-in and the backend associates stored records with the authenticated Clerk user ID.
- **Credential storage:** the backend stores a bcrypt hash and an encrypted copy. Hashing is one-way; the encrypted value is decryptable so the app can display a saved password again.
- **User-scoped records:** MongoDB queries include the authenticated user's ID so a user can only access their own credentials.

## How to run

### Prerequisites

- Node.js and npm.
- A MongoDB database and connection string.
- A Clerk application with frontend and backend API keys.

### Configure environment variables

Create a `.env` file in the project root for Vite:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_REACT_APP_BACKEND_BASE_URL=http://localhost:3000
```

Create a separate `.env` file in `backend/`:

```env
CLERK_SECRET_KEY=your_clerk_secret_key
MONGO_URI=your_mongodb_connection_string
DB_NAME=hashvault
ENCRYPTION_KEY=your_64_character_hex_key
PORT=3000
```

Generate a 32-byte encryption key as 64 hexadecimal characters with:

```sh
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Keep both `.env` files private and do not commit real keys. Set `ENCRYPTION_KEY` before saving credentials and keep it stable: the backend otherwise generates a temporary key at startup, and data encrypted with an old key cannot be decrypted after restarting.

### Install and start

From the project root, install frontend dependencies and start Vite:

```sh
npm install
npm run dev
```

In a second terminal, start the API:

```sh
cd backend
npm install
npm start
```

Open the local URL printed by Vite (usually `http://localhost:5173`). The backend listens on `http://localhost:3000` unless `PORT` is set differently; keep the frontend backend URL in sync with it.

### Build and lint

Run these from the project root:

```sh
npm run build
npm run lint
```

There is no configured automated test suite yet; the backend's `npm test` script is currently a placeholder.

## Security note

This project is intended for learning and demonstration, not as an audited production password manager. It currently uses AES-256-CBC, which does not provide built-in authenticated encryption, and its encryption-key management needs production hardening. Do not use it to store real credentials without a security review.
