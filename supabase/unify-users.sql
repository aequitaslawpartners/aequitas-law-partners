begin;
lock table public.users, public.people in access exclusive mode;
alter table public.users drop constraint users_role_check;
alter table public.users alter column password drop not null;
alter table public.users alter column role set default 'alp';
alter table public.users add column "profileId" text unique;
alter table public.users add column profile jsonb not null default '{}'::jsonb check (jsonb_typeof(profile) = 'object');
alter table public.users add column "imagePath" text;
alter table public.users add column "sortOrder" integer not null default 100;
update public.users set role = case when lower(email) = 'admin@alplaw.in' then 'super_admin' when role = 'employee' then 'alp' else role end,
  "imagePath" = "avatarPath";
update public.users u set name = p.profile->>'name', "profileId" = p._id,
  profile = p.profile - array['id','name','email','image','vcard'], "imagePath" = p."imagePath", "sortOrder" = p."sortOrder"
  from public.people p where p."userId" = u._id;
-- Profiles without an existing login require an administrator to set their first password.
insert into public.users (name,email,password,role,"profileId",profile,"imagePath","sortOrder","createdAt","updatedAt")
  select profile->>'name',lower(profile->>'email'),null,'alp',_id,
    profile - array['id','name','email','image','vcard'],"imagePath","sortOrder","createdAt","updatedAt"
  from public.people where "userId" is null;
do $$ begin
  if (select count(*) from public.people) <> (select count(*) from public.users where role <> 'super_admin') then
    raise exception 'Profile count mismatch; merge cancelled';
  end if;
end $$;
alter table public.users add constraint users_role_check check (role in ('super_admin','admin','alp'));
alter table public.users add constraint users_super_admin_identity check ((lower(email) = 'admin@alplaw.in') = (role = 'super_admin'));
alter table public.users add constraint users_public_profile_required check (role = 'super_admin' or ("profileId" is not null and "imagePath" is not null));
drop function public.admin_save_person(text,jsonb,text,text,boolean);
drop function public.staff_save_profile(text,text,jsonb,text,text);
drop function public.staff_save_photo(text,text,text);
drop table public.people;
alter table public.users drop column "avatarPath";
commit;
notify pgrst, 'reload schema';
