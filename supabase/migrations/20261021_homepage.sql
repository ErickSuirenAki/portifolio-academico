begin;

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
