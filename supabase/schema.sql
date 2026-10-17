-- Accounts and public professional profiles share one server-only table.
begin;
create table if not exists public.users (
  _id text primary key default gen_random_uuid()::text,
  name text not null default '',
  email text not null unique,
  password text,
  role text not null default 'alp' check (role in ('super_admin', 'admin', 'alp')),
  "profileId" text unique,
  profile jsonb not null default '{}'::jsonb check (jsonb_typeof(profile) = 'object'),
  "imagePath" text,
  "sortOrder" integer not null default 100,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz,
  constraint users_super_admin_identity check ((lower(email) = 'admin@alplaw.in') = (role = 'super_admin')),
  constraint users_public_profile_required check (role = 'super_admin' or ("profileId" is not null and "imagePath" is not null))
);
create table if not exists public.contacts (
  _id text primary key default gen_random_uuid()::text,
  "firstName" text not null, "lastName" text not null,
  email text not null, phone text not null, subject text not null, message text not null,
  status text not null default 'new' check (status in ('new', 'pending', 'reviewed', 'contacted', 'rejected')),
  "createdAt" timestamptz not null default now(), "updatedAt" timestamptz, "updatedBy" text
);
create table if not exists public.recruitment (
  _id text primary key default gen_random_uuid()::text,
  "firstName" text not null, "lastName" text not null,
  email text not null, phone text not null, experience text not null, position text not null,
  specializations text[] not null check (cardinality(specializations) > 0),
  "resumePath" text unique,
  "originalSize" integer,
  "resumeMigrationIssue" text,
  "coverLetter" text not null default '',
  status text not null default 'pending' check (status in ('pending', 'reviewed', 'contacted', 'rejected')),
  "createdAt" timestamptz not null default now(), "updatedAt" timestamptz, "updatedBy" text
);
alter table public.recruitment drop constraint if exists "recruitment_originalSize_check";
alter table public.recruitment add constraint "recruitment_originalSize_check"
  check ("originalSize" > 0 and "originalSize" <= 512000);
alter table public.recruitment alter column "resumePath" drop not null;
alter table public.recruitment alter column "originalSize" drop not null;
alter table public.recruitment add column if not exists "resumeMigrationIssue" text;
alter table public.recruitment drop constraint if exists recruitment_resume_required;
alter table public.recruitment add constraint recruitment_resume_required
  check (("resumePath" is not null and "originalSize" is not null) or "resumeMigrationIssue" is not null);
create index if not exists contacts_created_at_idx on public.contacts ("createdAt" desc);
create index if not exists recruitment_created_at_idx on public.recruitment ("createdAt" desc);
alter table public.users enable row level security;
alter table public.contacts enable row level security;
alter table public.recruitment enable row level security;
revoke all on public.users, public.contacts, public.recruitment from anon, authenticated;
grant all on public.users, public.contacts, public.recruitment to service_role;
commit;
notify pgrst, 'reload schema';
