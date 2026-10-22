begin;

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

commit;
