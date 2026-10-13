-- Run this once in Supabase -> SQL Editor
create table if not exists public.enquiries (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  full_name     text not null,
  phone         text not null,
  email         text,
  service       text,
  property_city text,
  budget        text,
  message       text,
  status        text not null default 'New'
);

-- Only the server (secret key) can read/write. The browser never touches this table.
alter table public.enquiries enable row level security;
