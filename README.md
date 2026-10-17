# Aequitas Law Partners Website

A professional, responsive website for **Aequitas Law Partners (ALP)**, a leading law firm specializing in corporate legal services across India.

## 🏔️ About Aequitas Law Partners

**Aequitas** (Latin for equity, justice, fairness and symmetry) represents our core philosophy. The mountain/alpine theme throughout the design symbolizes grandness, boldness and our vision to reach new heights in legal excellence.

- **Domain**: [www.alplaw.in](https://www.alplaw.in)
- **Founded**: 2025
- **Offices**: Mumbai (Head Office)
- **Mission**: Elevating justice in business through strategic legal counsel

## 🚀 Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Font**: Lora (Google Font)
- **Build Tool**: Turbopack
- **Package Manager**: npm

## 🎨 Design Features

### Brand Identity
- **Primary Colors**: Deep blue (#0c3065)
- **Logo**: Mountain-inspired geometric design representing "ALP"
- **Typography**: Modern Inter and Lora family for professional appearance
- **Theme**: Alpine/mountain motif throughout the design

### Key Sections
1. **Hero Section**: Compelling headline with mountain-inspired visuals
2. **About**: Firm values and meaning of "Aequitas"
3. **Practice Areas**: 9 core legal service areas with detailed descriptions
4. **Team**: Professional profiles of key lawyers and partners
5. **Insights**: Legal articles, resources and thought leadership
6. **Contact**: Multi-office contact information with consultation form

## 🛠️ Getting Started

### Supabase database and uploads

The root `.env` contains the configured deployment values and can be imported
into Vercel's project environment variables. For a fresh checkout, copy
`.env.example` to `.env` and fill in the values. Keep `SUPABASE_SECRET_KEY` and
`JWT_SECRET` on the server; only the URL and publishable key may use the
`NEXT_PUBLIC_` prefix. Preserve `JWT_SECRET` across deployments so existing
admin sessions continue to work. Both actual environment files are ignored by Git.

The deployed API routes use Supabase's HTTPS Data API and Storage API. They need
no Postgres connection string, database password or custom certificate file.
Import `.env` for the intended Vercel environments, then deploy or redeploy so
those values are applied.

Local maintenance scripts read `SUPABASE_DB_PASSWORD` from
`.env.maintenance.local`, plus the project URL from `.env`. Do not import the
maintenance file into Vercel. `scripts/supabase-db.mjs` uses the public CA
certificate at `supabase/prod-ca-2021.crt` to verify its direct Postgres connection.
Keep certificate verification enabled; a username/password or URI does not
replace TLS certificate verification.

`node scripts/setup-supabase.mjs` configures the private `users`, `contacts` and
`recruitment` tables, the private `resumes` bucket and public `people` photo bucket.
It does not seed a separate People table or read local profile data. RLS is enabled;
only server routes using the secret key can access the tables.

Accounts and public People profiles use one `users` row. Name, email, password hash,
role, public profile slug, professional details, ordering and Storage photo path live
in that table. Roles are `super_admin`, `admin` and `alp` (displayed as **ALP**).
Only `admin@alplaw.in` can be the super admin. It remains private and cannot be
deleted or changed by another administrator. Every other user appears on People,
including administrators. Existing account IDs, password hashes and public profile
URLs were preserved by `supabase/unify-users.sql` (already applied; do not rerun).
The five profiles with no password received the requested initial password on
18 October 2026. Existing account passwords were preserved.

Administrators can add, edit and bulk delete users through either People or
Users & access. Both edit the same record with the same mandatory professional
fields. ALP members can manage submissions and edit their complete
own profile; they cannot change their role or another user's data. Required fields
are photograph, full name, designation, email, biography, experience, expertise,
education and languages. Areas of expertise can include custom entries using Add
area or Enter, with no limit on the number selected. Blank entries are rejected;
each label can contain up to 500 characters. LinkedIn, memberships and personal
note are optional.
Passwords are required when adding an account. Admin/super admin edits and role
changes can leave the password blank to preserve it. Any supplied new password
must be 8 characters minimum and 72 UTF-8 bytes maximum. ALP self-profile edits
continue to require a password. The private super admin requires account details only.

PDF resumes and JPEG/PNG/WebP profile photos are limited to **200 KB (204,800 bytes)**
by the UI, server and Storage buckets. Content is validated before upload. All
profile images are served from Supabase Storage. Replacing a photo removes the
previous file. Bulk user deletion removes the shared public profile and its photos,
including interrupted uploads; application deletion removes its linked resume.
Storage failures leave records available for retry. The active account and super
admin cannot be deleted. Admin profile photos open in an accessible popup when clicked (Escape, close
button or backdrop to dismiss). Public page styling remains unchanged.

Run `node scripts/backup-users.mjs` to export the **users table only** and download
its referenced Storage photos into ignored `backups/users.json` and `backups/people/`.
This is a private local recovery copy, includes password hashes, and is never read
by the website or committed. Refresh it after account changes when a new local
snapshot is needed. Legacy local People photos and vCards are retained as backups.
The website reads profiles from `users`, displays Storage photos, and generates
vCards from the current users row; it does not use those legacy backup copies.

Admin requests display a shared loading indicator; sign-in, saves, refresh and
password changes also animate their controls. Actions remain disabled until their
request and data refresh finish. Successful edits, role changes, photo uploads,
password updates, status changes and deletions reload the current workspace data.
Failed/partial bulk deletions also reload, and saved forms close with a separate
refresh warning if loading the latest data fails, preventing duplicate resubmission.

The original MongoDB copy remains untouched. Some migrated applications have
`resumeMigrationIssue` because their original PDF was invalid or exceeded 200 KB;
obtain compliant replacements before retiring that external copy. Obsolete MongoDB
runtime and completed migration scripts were removed. Publications remain static
assets. The admin portal retrieves applications in batches and displays 20 per page.

For a new installation only, set `ADMIN_EMAIL=admin@alplaw.in` and `ADMIN_PASSWORD`
(at least 8 characters), then run `node scripts/create-admin.js`. Existing passwords
remain unchanged. Add regular users and their complete public profiles in the admin
portal. Local maintenance scripts and backups are not Vercel build steps.

### Prerequisites
- Node.js 18+ 
- npm package manager

### Local Development

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm run start` - Start production server

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and custom CSS
│   ├── layout.js            # Root layout with metadata
│   └── page.js              # Homepage component
├── components/
│   ├── Header.js            # Navigation header
│   ├── Hero.js              # Hero section
│   ├── Home.js              # About ALP section
│   ├── PracticeAreas.js     # Practice areas grid
│   ├── PeopleGrid.js        # Public team profiles
│   ├── PublicationsGrid.js  # Publications listing
│   └── Footer.js            # Footer with links
```

## 🎯 Key Features

### Professional Design
- Clean, modern layout suitable for corporate clients
- Mountain-themed visual elements
- Professional color scheme (blue)
- High-quality typography

### Content Management
- Comprehensive practice area descriptions
- Team member profiles with specializations
- Legal insights and resources section
- Multi-office contact information

### SEO Optimization
- Comprehensive metadata
- Structured data for law firms
- Optimized page titles and descriptions
- Geographic targeting for Indian markets

### User Experience
- Smooth scrolling navigation
- Mobile-responsive design
- Accessible form elements
- Professional consultation CTAs

## 📊 Practice Areas Covered

1. **Corporate Law & M&A** - Strategic mergers and acquisitions
3. **Banking & Finance** - Financial regulations and transactions
4. **Capital Markets** - Public offerings and securities law
5. **Technology & IP Law** - Intellectual property protection
6. **Dispute Resolution** - Litigation and arbitration
7. **Real Estate Law** - Property transactions and development
8. **Employment & Labor** - Workplace law and compliance
9. **Tax & Regulatory** - Government relations and compliance


## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel (Recommended)
1. Connect repository to Vercel
2. Configure build settings (auto-detected)
3. Deploy with automatic domain setup

## 📱 Mobile Optimization

- Responsive breakpoints for all screen sizes
- Touch-friendly navigation menu
- Optimized images and assets
- Fast loading performance

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- High contrast color scheme
- Screen reader compatibility


## 📄 Legal Compliance

The website includes appropriate disclaimers in compliance with Bar Council of India rules regarding law firm websites and solicitation restrictions.

---

**Built with ❤️ for legal excellence and client service**

© 2025 Aequitas Law Partners. All rights reserved.
