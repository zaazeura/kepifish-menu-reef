-- ============================================================
-- KEPIFISH: profil & peran, produk, pengeluaran, resep HPP, foto katalog
-- ============================================================

create type public.app_role as enum ('admin', 'dosen');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text,
  created_at timestamptz not null default now()
);

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);

grant select on public.profiles to authenticated;
grant update on public.profiles to authenticated;
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;

create policy "Pengguna membaca profil sendiri"
  on public.profiles for select to authenticated
  using (auth.uid() = id);
create policy "Pengguna memperbarui profil sendiri"
  on public.profiles for update to authenticated
  using (auth.uid() = id) with check (auth.uid() = id);
create policy "Pengguna membaca peran sendiri"
  on public.user_roles for select to authenticated
  using (auth.uid() = user_id);

-- Fungsi cek peran (security definer agar tidak rekursif)
create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

-- Trigger pembuatan profil + peran saat pendaftaran.
-- Akun pertama menjadi admin (pemilik), akun berikutnya dosen.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  uname text;
begin
  uname := lower(btrim(coalesce(nullif(new.raw_user_meta_data->>'username', ''), split_part(new.email, '@', 1))));
  insert into public.profiles (id, username, display_name)
    values (new.id, uname, nullif(new.raw_user_meta_data->>'display_name', ''))
    on conflict (id) do nothing;
  if not exists (select 1 from public.user_roles) then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  else
    insert into public.user_roles (user_id, role) values (new.id, 'dosen');
  end if;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- Produk (dua menu tetap Kepifish)
-- ============================================================
create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  selling_price numeric not null default 0,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

insert into public.products (name, selling_price, display_order) values
  ('Kepiting Kuah Santan', 35000, 1),
  ('Nasi Cokot', 20000, 2);

-- ============================================================
-- Pengeluaran: pembelian bahan baku
-- ============================================================
create table public.purchases (
  id uuid primary key default gen_random_uuid(),
  ingredient_name text not null,
  unit text not null default 'pcs',
  qty numeric not null check (qty > 0),
  unit_price numeric not null check (unit_price >= 0),
  purchased_at date not null default current_date,
  note text,
  created_by uuid not null default auth.uid(),
  created_at timestamptz not null default now()
);

-- ============================================================
-- Resep per produk: bahan + jumlah terpakai
-- ============================================================
create table public.recipe_items (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  ingredient_name text not null,
  unit text not null default 'pcs',
  qty_used numeric not null check (qty_used > 0)
);

-- ============================================================
-- Foto katalog (dikelola admin, dibaca publik)
-- ============================================================
create table public.catalog_photos (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  price numeric not null default 0,
  photo_path text not null,
  display_order integer not null default 0,
  created_by uuid not null default auth.uid(),
  created_at timestamptz not null default now()
);

-- ---- Grant & RLS ----
grant select, update on public.products to authenticated;
grant all on public.products to service_role;
grant select, insert, update, delete on public.purchases to authenticated;
grant all on public.purchases to service_role;
grant select, insert, update, delete on public.recipe_items to authenticated;
grant all on public.recipe_items to service_role;
grant select on public.catalog_photos to anon;
grant select, insert, update, delete on public.catalog_photos to authenticated;
grant all on public.catalog_photos to service_role;

alter table public.products enable row level security;
alter table public.purchases enable row level security;
alter table public.recipe_items enable row level security;
alter table public.catalog_photos enable row level security;

create policy "Semua pengguna terdaftar membaca produk"
  on public.products for select to authenticated using (true);
create policy "Admin mengubah produk"
  on public.products for update to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create policy "Pengguna terdaftar membaca pengeluaran"
  on public.purchases for select to authenticated using (true);
create policy "Admin menambah pengeluaran"
  on public.purchases for insert to authenticated
  with check (public.has_role(auth.uid(), 'admin'));
create policy "Admin mengubah pengeluaran"
  on public.purchases for update to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admin menghapus pengeluaran"
  on public.purchases for delete to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Pengguna terdaftar membaca resep"
  on public.recipe_items for select to authenticated using (true);
create policy "Admin menambah resep"
  on public.recipe_items for insert to authenticated
  with check (public.has_role(auth.uid(), 'admin'));
create policy "Admin mengubah resep"
  on public.recipe_items for update to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admin menghapus resep"
  on public.recipe_items for delete to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Publik membaca foto katalog"
  on public.catalog_photos for select to anon, authenticated using (true);
create policy "Admin menambah foto katalog"
  on public.catalog_photos for insert to authenticated
  with check (public.has_role(auth.uid(), 'admin'));
create policy "Admin mengubah foto katalog"
  on public.catalog_photos for update to authenticated
  using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admin menghapus foto katalog"
  on public.catalog_photos for delete to authenticated
  using (public.has_role(auth.uid(), 'admin'));

-- ============================================================
-- Kebijakan penyimpanan foto katalog
-- ============================================================
create policy "Publik membaca berkas foto katalog"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'catalog-photos');
create policy "Admin mengunggah foto katalog"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'catalog-photos' and public.has_role(auth.uid(), 'admin'));
create policy "Admin memperbarui foto katalog"
  on storage.objects for update to authenticated
  using (bucket_id = 'catalog-photos' and public.has_role(auth.uid(), 'admin'))
  with check (bucket_id = 'catalog-photos' and public.has_role(auth.uid(), 'admin'));
create policy "Admin menghapus foto katalog"
  on storage.objects for delete to authenticated
  using (bucket_id = 'catalog-photos' and public.has_role(auth.uid(), 'admin'));