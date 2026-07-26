-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
-- Adds: user avatars (profile picture upload) + real byline names on articles.

-- 1) Avatar URL on profiles
alter table public.profiles add column if not exists avatar_url text;

-- 2) Real writer's name on each article (falls back to their account name
--    automatically if left blank when publishing — see savePost()).
alter table public.blog_posts add column if not exists author_name text;

-- 3) Public storage bucket for avatar images
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- 4) Storage policies: anyone can view avatars; a user may only upload,
--    replace, or delete files inside their OWN folder ({user_id}/...),
--    enforced by matching the first path segment against auth.uid().
drop policy if exists "avatar_public_read" on storage.objects;
create policy "avatar_public_read" on storage.objects
  for select using (bucket_id = 'avatars');

drop policy if exists "avatar_owner_insert" on storage.objects;
create policy "avatar_owner_insert" on storage.objects
  for insert with check (
    bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "avatar_owner_update" on storage.objects;
create policy "avatar_owner_update" on storage.objects
  for update using (
    bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "avatar_owner_delete" on storage.objects;
create policy "avatar_owner_delete" on storage.objects
  for delete using (
    bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text
  );
