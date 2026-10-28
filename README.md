# StaffSync

A modern HR workspace built with MongoDB, Express, React, Node.js, Bootstrap, and JWT. Forest green, warm neutrals, responsive layouts, and a people-first interface.

## Run on this laptop

Dependencies are installed. In PowerShell:

```powershell
cd C:\MOVIES\StaffSync
.\Start-StaffSync.ps1
```

Open http://127.0.0.1:4000 when ready. Keep the terminal open; Ctrl+C stops the server. The launcher finds a regular Node installation or the existing Codex Node runtime.

On any machine with Node.js 20.19+ and npm:

```sh
npm install
npm run build
npm start
```

Development: `npm run dev` at http://127.0.0.1:5173, or `./Start-StaffSync.ps1 -Development` on this laptop. Use one launch method at a time.

## Demo accounts

| Role | Email | Password |
| --- | --- | --- |
| HR | alex@staffsync.demo | StaffSync123! |
| Manager | jamie@staffsync.demo | StaffSync123! |
| Employee | sam@staffsync.demo | StaffSync123! |

Without MONGODB_URI, the app starts a real temporary MongoDB and seeds fictional records. First startup on a fresh machine downloads MongoDB and needs internet access. Data resets on restart. Ignored database files live in `.data/`, cleaned on normal shutdown. Sign out at the bottom of the sidebar to switch roles.

## Features

- JWT sign-in, hashed passwords, rate-limited login, server-enforced role permissions.
- Live overview with employee, attendance, leave, and training counts.
- Searchable directory; HR creates accounts and edits employee records.
- Employee self-service name and phone updates.
- Daily check-in/check-out, attendance history, CSV export.
- Leave applications, date/overlap validation, approvals and rejections. No self-approvals.
- HR announcements visible to everyone.
- Manager/HR training creation and department-scoped enrollment.
- Responsive navigation, loading states, empty states, error feedback.

Managers see attendance and leave requests in their department. HR sees all records. Employees see their own attendance and leave records. Training is scoped to departments. Attendance uses UTC day boundaries; displayed times use the browser timezone.

## Persistent database

Copy `.env.example` to `.env`. Set MONGODB_URI to a local MongoDB or Atlas connection string and JWT_SECRET to a random string of at least 32 characters. Keep `.env` private. Set CLIENT_ORIGIN for a different development frontend origin.

Persistent mode does not seed public demo credentials. To create the first HR administrator, set ADMIN_EMAIL, ADMIN_NAME, and ADMIN_PASSWORD (12+ characters) privately in your environment, then run:

```sh
node server/bootstrap.js
```

The command refuses to run when an active HR administrator exists. Sign in as HR and add employees through People.

Production: build the client, configure environment variables, run `npm start` behind an HTTPS reverse proxy. The server binds to loopback by default; adapt the listen settings for your deployment host. Express serves the built frontend and API from one origin. Source repository: https://github.com/Prakhar1301/StaffSync. The application has not been deployed.

## Verification

```sh
npm test
npm run build
```

Integration tests start isolated real MongoDB and verify authentication, employee permissions, password redaction, leave validation and team boundaries, attendance transitions, announcement permissions, and unique/scoped training enrollment.

## Structure

- `src/main.jsx`: React workspace and role-aware forms
- `src/style.css`: responsive styles over Bootstrap
- `server/app.js`: REST API, authentication, authorization, validation
- `server/models.js`: Mongoose schemas and indexes
- `server/index.js`: startup and database connection
- `server/database.js`: temporary MongoDB helper
- `server/seed.js`: fictional demo content
- `server/bootstrap.js`: persistent database initial administrator
- `server/app.test.js`: integration tests

Git history records meaningful implementation chunks. The project is published at https://github.com/Prakhar1301/StaffSync. No SkillWallet submission has been performed.

