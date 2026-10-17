begin;
alter table public.recruitment drop constraint if exists "recruitment_originalSize_check";
alter table public.recruitment add constraint "recruitment_originalSize_check"
  check ("originalSize" > 0 and "originalSize" <= 512000);
commit;
notify pgrst, 'reload schema';
