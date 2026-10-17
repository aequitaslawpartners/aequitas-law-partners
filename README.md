# Aequitas Law Partners Website

Public website and private administration portal for Aequitas Law Partners (ALP).

Website: [www.alplaw.in](https://www.alplaw.in)

## Technology

- Next.js 15 App Router and React 19
- JavaScript, Tailwind CSS and scoped CSS modules
- Inter and Lora fonts
- Supabase Postgres and Storage
- JWT authentication and bcrypt password hashing
- npm, Turbopack for local development, and Vercel hosting

## Features

The public website includes the firm overview, practice areas, People profiles,
awards, publications, insights, careers and contact forms. The design follows ALP's
navy and blue palette and mountain theme.

The admin portal at `/admin/login` provides:

- Contact inquiry and career application management, search, filtering and status updates.
- People and user creation, editing, role management and bulk deletion.
- Personal and professional profile editing, photo previews and password changes.
- Custom areas of expertise with no limit on the number of entries.
- Loading indicators and automatic data refresh after changes.

## Local setup

Use Node.js 18.18 or later and npm.

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and configure its values.
3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [localhost:3000](http://localhost:3000).

### Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Public Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Public Supabase client key |
| `SUPABASE_URL` | Supabase project URL for server requests |
| `SUPABASE_SECRET_KEY` | Server-only database and Storage access |
| `JWT_SECRET` | Server-only session signing secret |

Keep `.env` out of version control. Never expose server secrets through a
`NEXT_PUBLIC_` variable. Preserve `JWT_SECRET` across deployments to keep existing
sessions valid.

### Database setup

For database maintenance, set `SUPABASE_DB_PASSWORD` in `.env.maintenance.local`
and run:

```bash
node scripts/setup-supabase.mjs
```

This configures the `users`, `contacts` and `recruitment` tables, the private
`resumes` bucket and the public `people` photo bucket. Tables are accessed through
server routes; public client roles have no direct table access.

The maintenance connection uses `supabase/prod-ca-2021.crt` for TLS verification.
The deployed application uses Supabase HTTPS APIs and does not require a database
password, Postgres URI or certificate file in Vercel environment settings.

For a fresh installation, set `ADMIN_EMAIL=admin@alplaw.in` and `ADMIN_PASSWORD`
(at least eight characters), then run:

```bash
node scripts/create-admin.js
```

## Accounts and People profiles

One `users` table stores account details, professional profiles, public profile
slugs and Storage photo paths. People and Users in the portal edit the same record.

| Role | Access |
| --- | --- |
| Super admin | `admin@alplaw.in`; private account with full administration access |
| Administrator | Manages users, profiles and submissions; appears on People |
| ALP | Manages submissions and edits their own profile; appears on People |

The super admin account cannot be deleted or edited by another administrator.
Users cannot delete their own active account.

Public profiles require a photograph, name, designation, email, biography,
experience, expertise, education and languages. LinkedIn, memberships and personal
notes are optional. Add custom expertise using **Add area** or Enter; each label
can contain up to 500 characters.

New accounts require a password. Admin and super admin edits can leave it blank
to keep the existing password. ALP self-profile edits require a password. Supplied
passwords must be at least eight characters and no more than 72 UTF-8 bytes.

## Uploads and backups

The maximum upload size is **500 KB (512,000 bytes)**, enforced by forms, server
validation, database constraints and Storage buckets.

- Resumes: PDF only, stored in the private `resumes` bucket.
- Profile photos: JPEG, PNG or WebP, stored in the public `people` bucket.
- Replacing a photo removes the previous stored file.
- Deleting a user or application also removes its associated stored files.

Run the following command to back up the `users` table and its Storage photos:

```bash
node scripts/backup-users.mjs
```

The private export is saved to `backups/users.json`, with photos in
`backups/people/`. It includes password hashes and must remain local and ignored
by Git. Refresh the backup when a new snapshot is needed.

Preserve all backup data and People images, including `public/people/` and
`public/vcards/`. Live profiles read from `users`, photos are served from Supabase
Storage, and downloadable vCards are generated from the current profile.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development with Turbopack |
| `npm run build` | Optimized production build |
| `npm run start` | Start the production server after building |

Database setup, initial account creation and backups are maintenance commands,
not deployment build steps.

## Project structure

```text
src/app/          Public pages, admin portal and API routes
src/components/   Shared public website components
src/data/         Practice area and publication content
src/hooks/        Shared React hooks
src/lib/          Authentication, validation, database and Storage helpers
public/           Branding, website assets and retained People backups
scripts/          Setup, account creation and backup commands
supabase/         Database schema and maintenance resources
backups/          Private local user and photo backups (Git-ignored)
```

## Deployment

1. Connect the repository to Vercel as a Next.js project.
2. Import the application values from `.env` into the intended Vercel environments.
   Keep `.env.maintenance.local` local.
3. Use `npm run build` as the build command and deploy.
4. Redeploy after changing environment variables or application code.

## Legal disclaimer

The website includes a legal disclaimer concerning law firm advertising and
solicitation under Bar Council of India rules.
