begin;
-- Execute no SQL Editor do Supabase.
create table if not exists public.admin_users (user_id uuid primary key references auth.users(id) on delete cascade);
create table if not exists public.projects (id uuid primary key default gen_random_uuid(),slug text not null unique,title text not null,summary text,body text,cover_url text,published boolean not null default false,created_at timestamptz not null default now());
create table if not exists public.publications (id uuid primary key default gen_random_uuid(),title text not null,authors text,venue text,published_year integer,doi text,pdf_url text,published boolean not null default false,created_at timestamptz not null default now());
create table if not exists public.news (id uuid primary key default gen_random_uuid(),slug text not null unique,title text not null,summary text,body text,cover_url text,published boolean not null default false,published_at timestamptz,created_at timestamptz not null default now());
create table if not exists public.profile (id integer primary key default 1 check (id=1),display_name text,biography text,photo_url text,lattes_url text,github_url text);
-- Compatible with databases created using the first version of this project.
alter table public.projects add column if not exists category text;
alter table public.projects add column if not exists tags text[] not null default '{}';
alter table public.projects add column if not exists project_url text;
alter table public.profile add column if not exists formation text;
alter table public.profile add column if not exists experience text;
alter table public.profile add column if not exists events text;
alter table public.profile add column if not exists awards text;

-- Add galleries to existing projects without changing content or RLS policies.
alter table public.projects add column if not exists gallery jsonb not null default '[]'::jsonb;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.projects'::regclass and conname = 'projects_gallery_array'
  ) then
    alter table public.projects add constraint projects_gallery_array check (
      case when jsonb_typeof(gallery) = 'array' then jsonb_array_length(gallery) <= 20 else false end
    );
  end if;
end $$;

create or replace function public.is_admin() returns boolean language sql stable security definer set search_path='' as $$ select exists(select 1 from public.admin_users where user_id=(select auth.uid())) $$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated,anon;
alter table public.admin_users enable row level security;
drop policy if exists "Only admins can view admin membership" on public.admin_users;
create policy "Only admins can view admin membership" on public.admin_users for select to authenticated using (public.is_admin());
-- Admin membership must be assigned manually by a trusted database operator.
do $$ declare t text; begin foreach t in array array['projects','publications','news'] loop execute format('alter table public.%I enable row level security',t);execute format('drop policy if exists "Public sees published %1$s" on public.%1$I',t);execute format('create policy "Public sees published %1$s" on public.%1$I for select to anon,authenticated using (published)',t);execute format('drop policy if exists "Admin sees all %1$s" on public.%1$I',t);execute format('create policy "Admin sees all %1$s" on public.%1$I for select to authenticated using (public.is_admin())',t);execute format('drop policy if exists "Admin inserts %1$s" on public.%1$I',t);execute format('create policy "Admin inserts %1$s" on public.%1$I for insert to authenticated with check (public.is_admin())',t);execute format('drop policy if exists "Admin updates %1$s" on public.%1$I',t);execute format('create policy "Admin updates %1$s" on public.%1$I for update to authenticated using (public.is_admin()) with check (public.is_admin())',t);execute format('drop policy if exists "Admin deletes %1$s" on public.%1$I',t);execute format('create policy "Admin deletes %1$s" on public.%1$I for delete to authenticated using (public.is_admin())',t);end loop;end $$;
alter table public.profile enable row level security;
drop policy if exists "Profile publicly readable" on public.profile;
create policy "Profile publicly readable" on public.profile for select to anon,authenticated using (true);
drop policy if exists "Admin writes profile" on public.profile;
create policy "Admin writes profile" on public.profile for all to authenticated using (public.is_admin()) with check (public.is_admin());
-- After creating YOUR account in Supabase Auth, run this in the SQL Editor:
-- insert into public.admin_users(user_id) values ('YOUR_AUTH_USER_UUID');
-- Disable public signups in Supabase Auth settings. Never expose a service-role key in browser code.

-- Uploaded assets are public by URL, including assets linked to drafts.
-- Only administrators can upload, list, replace or remove objects.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('portfolio', 'portfolio', true, 5242880, array['image/jpeg','image/png','image/webp','application/pdf'])
on conflict (id) do update set public = excluded.public,
  file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Admin manages portfolio assets" on storage.objects;
create policy "Admin manages portfolio assets" on storage.objects
for all to authenticated
using (bucket_id = 'portfolio' and public.is_admin())
with check (bucket_id = 'portfolio' and public.is_admin() and (storage.foldername(name))[1] = (select auth.uid())::text);

-- Explicit grants; authorization is enforced by the RLS policies above.
grant usage on schema public to anon, authenticated;
grant select on public.projects, public.publications, public.news, public.profile to anon;
grant select, insert, update, delete on public.projects, public.publications, public.news, public.profile to authenticated;
grant select on public.admin_users to authenticated;
revoke insert, update, delete on public.admin_users from anon, authenticated;

-- Curated homepage content: one public settings row, writable only by admins.
create table if not exists public.homepage (
  id integer primary key default 1 check (id = 1),
  featured_project_ids uuid[] not null default '{}',
  conference_photos jsonb not null default '[]'::jsonb,
  exchange_photos jsonb not null default '[]'::jsonb,
  constraint homepage_featured_limit check (cardinality(featured_project_ids) <= 3),
  constraint homepage_conference_limit check (
    case when jsonb_typeof(conference_photos) = 'array' then jsonb_array_length(conference_photos) <= 6 else false end
  ),
  constraint homepage_exchange_limit check (
    case when jsonb_typeof(exchange_photos) = 'array' then jsonb_array_length(exchange_photos) <= 6 else false end
  )
);
alter table public.homepage enable row level security;
drop policy if exists "Homepage publicly readable" on public.homepage;
create policy "Homepage publicly readable" on public.homepage for select to anon, authenticated using (true);
drop policy if exists "Admin writes homepage" on public.homepage;
create policy "Admin writes homepage" on public.homepage for all to authenticated
  using (public.is_admin()) with check (public.is_admin());
grant select on public.homepage to anon;
grant select, insert, update, delete on public.homepage to authenticated;
notify pgrst, 'reload schema';

commit;
