-- =====================================================================
-- NourishDesk Blog — Database schema for Supabase (PostgreSQL)
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New query).
-- =====================================================================

-- 1. PROFILES ---------------------------------------------------------
-- One row per auth user. Holds the display name shown as the post author.
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  full_name   text,
  role        text not null default 'author',  -- 'author' | 'admin'
  created_at  timestamptz not null default now()
);

-- Auto-create a profile whenever a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. POSTS ------------------------------------------------------------
create table if not exists public.posts (
  id                uuid primary key default gen_random_uuid(),
  author_id         uuid not null references public.profiles (id) on delete cascade,
  title             text not null default 'Untitled',
  slug              text unique not null,
  excerpt           text,
  content           text not null default '',   -- sanitized HTML from the editor
  featured_image    text,
  status            text not null default 'draft' check (status in ('draft', 'published')),
  tags              text[] not null default '{}',
  categories        text[] not null default '{}',
  meta_title        text,
  meta_description  text,
  reading_time      integer not null default 1,  -- minutes
  published_at      timestamptz,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- Helpful indexes for scaling to thousands of posts.
create index if not exists posts_status_published_idx on public.posts (status, published_at desc);
create index if not exists posts_author_idx           on public.posts (author_id);
create index if not exists posts_tags_idx             on public.posts using gin (tags);
create index if not exists posts_categories_idx       on public.posts using gin (categories);

-- Keep updated_at fresh on every edit.
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

-- 3. ROW LEVEL SECURITY ----------------------------------------------
alter table public.profiles enable row level security;
alter table public.posts    enable row level security;

-- Profiles: anyone can read names (needed to show authors on public posts);
-- a user may update only their own profile.
drop policy if exists "profiles_read_all" on public.profiles;
create policy "profiles_read_all" on public.profiles
  for select using (true);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- Posts:
-- READ  → published posts are public; authors can read their own drafts too.
drop policy if exists "posts_read" on public.posts;
create policy "posts_read" on public.posts
  for select using (status = 'published' or auth.uid() = author_id);

-- WRITE → only the authenticated author, only their own rows.
drop policy if exists "posts_insert_own" on public.posts;
create policy "posts_insert_own" on public.posts
  for insert with check (auth.uid() = author_id);

drop policy if exists "posts_update_own" on public.posts;
create policy "posts_update_own" on public.posts
  for update using (auth.uid() = author_id) with check (auth.uid() = author_id);

drop policy if exists "posts_delete_own" on public.posts;
create policy "posts_delete_own" on public.posts
  for delete using (auth.uid() = author_id);

-- 4. STORAGE (featured + inline images) ------------------------------
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

-- Public can read images; only logged-in users can upload/manage them.
drop policy if exists "blog_images_public_read" on storage.objects;
create policy "blog_images_public_read" on storage.objects
  for select using (bucket_id = 'blog-images');

drop policy if exists "blog_images_auth_write" on storage.objects;
create policy "blog_images_auth_write" on storage.objects
  for insert with check (bucket_id = 'blog-images' and auth.role() = 'authenticated');

drop policy if exists "blog_images_auth_update" on storage.objects;
create policy "blog_images_auth_update" on storage.objects
  for update using (bucket_id = 'blog-images' and auth.role() = 'authenticated');

drop policy if exists "blog_images_auth_delete" on storage.objects;
create policy "blog_images_auth_delete" on storage.objects
  for delete using (bucket_id = 'blog-images' and auth.role() = 'authenticated');
