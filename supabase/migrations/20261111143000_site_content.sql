-- Public site content for Rooted Tech Services.
-- Existing telemetry tables (network_security_logs, network_events,
-- service_requests, router_metrics) are left in place.
-- Safe Harbor copy and rows are Oklahoma-only.

alter table public.router_metrics enable row level security;

create table public.site_settings (
  id integer primary key default 1 check (id = 1),
  brand_name text not null,
  tagline text not null,
  phone_display text not null,
  phone_e164 text not null,
  whatsapp_url text not null,
  email text not null,
  jurisdiction text not null,
  statute text not null,
  safe_harbor_summary text not null,
  giveback_summary text not null,
  updated_at timestamptz not null default now()
);

create table public.services (
  slug text primary key,
  sort_order integer not null,
  title text not null,
  summary text not null,
  jurisdiction text,
  published boolean not null default true
);

create table public.social_links (
  slug text primary key,
  sort_order integer not null,
  label text not null,
  url text not null,
  published boolean not null default true
);

create table public.bible_quotes (
  id integer generated always as identity primary key,
  reference text not null,
  body text not null,
  published boolean not null default true
);

create table public.competitor_prices (
  id uuid primary key default gen_random_uuid(),
  source_name text not null,
  source_url text not null,
  category text not null,
  item text not null,
  price_text text not null,
  currency text not null default 'USD',
  captured_at timestamptz not null default now(),
  published boolean not null default true,
  unique (source_url, item)
);

create table public.safe_harbor_engagements (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  county text,
  started_on date not null default current_date,
  counts_toward_giveback boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.giveback_awards (
  id uuid primary key default gen_random_uuid(),
  recipient_name text not null,
  recipient_type text not null check (recipient_type in ('school', 'church')),
  status text not null default 'open' check (status in ('open', 'scheduled', 'done')),
  created_at timestamptz not null default now()
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 120),
  email text check (email is null or char_length(email) <= 200),
  phone text check (phone is null or char_length(phone) <= 40),
  interest text not null default 'other' check (interest in ('boot', 'floor', 'backup', 'safe_harbor', 'giveback', 'other')),
  county text check (county is null or char_length(county) <= 80),
  message text not null check (char_length(message) between 1 and 2000)
);

alter table public.site_settings enable row level security;
alter table public.services enable row level security;
alter table public.social_links enable row level security;
alter table public.bible_quotes enable row level security;
alter table public.competitor_prices enable row level security;
alter table public.safe_harbor_engagements enable row level security;
alter table public.giveback_awards enable row level security;
alter table public.leads enable row level security;

revoke all on public.site_settings from anon, authenticated;
revoke all on public.services from anon, authenticated;
revoke all on public.social_links from anon, authenticated;
revoke all on public.bible_quotes from anon, authenticated;
revoke all on public.competitor_prices from anon, authenticated;
revoke all on public.safe_harbor_engagements from anon, authenticated;
revoke all on public.giveback_awards from anon, authenticated;
revoke all on public.leads from anon, authenticated;

grant select on public.site_settings to anon, authenticated;
grant select on public.services to anon, authenticated;
grant select on public.social_links to anon, authenticated;
grant select on public.bible_quotes to anon, authenticated;
grant select on public.competitor_prices to anon, authenticated;
grant insert on public.leads to anon, authenticated;

create policy site_settings_read on public.site_settings
  for select to anon, authenticated using (true);
create policy services_read on public.services
  for select to anon, authenticated using (published);
create policy social_links_read on public.social_links
  for select to anon, authenticated using (published);
create policy bible_quotes_read on public.bible_quotes
  for select to anon, authenticated using (published);
create policy competitor_prices_read on public.competitor_prices
  for select to anon, authenticated using (published);
create policy leads_insert on public.leads
  for insert to anon, authenticated with check (true);

create or replace function public.giveback_public()
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  with businesses as (
    select count(*) filter (where counts_toward_giveback)::integer as n
    from public.safe_harbor_engagements
  ),
  awards as (
    select
      count(*)::integer as used,
      count(*) filter (where recipient_type = 'school')::integer as schools,
      count(*) filter (where recipient_type = 'church')::integer as churches
    from public.giveback_awards
  )
  select jsonb_build_object(
    'businesses', businesses.n,
    'per', 10,
    'slots_earned', businesses.n / 10,
    'slots_used', awards.used,
    'slots_open', greatest((businesses.n / 10) - awards.used, 0),
    'toward_next', businesses.n % 10,
    'schools', awards.schools,
    'churches', awards.churches
  )
  from businesses, awards;
$$;

revoke all on function public.giveback_public() from public;
grant execute on function public.giveback_public() to anon, authenticated;

insert into public.site_settings (
  brand_name, tagline, phone_display, phone_e164, whatsapp_url, email,
  jurisdiction, statute, safe_harbor_summary, giveback_summary
) values (
  'Rooted Tech Services',
  'Your phone boots as your brand.',
  '(918) 901-0685',
  '+19189010685',
  'https://wa.me/19189010685?text=BOOT',
  'tjrob0110@proton.me',
  'Oklahoma',
  'Oklahoma Senate Bill 626',
  'Senate Bill 626, effective January 1, 2026, amends Oklahoma''s Security Breach Notification Act. A business that keeps reasonable safeguards and gives the notice the statute requires can raise that compliance as an affirmative defense in a civil action brought under the statute. Reasonable safeguards are policies and practices that keep personal information secure for the size of the business and the kind of information it holds. The statute names risk assessments, technical and physical layered defenses, employee training, and an incident response plan. This is Oklahoma law. It is not a shield in other states, and it is not a promise that no claim can ever be filed. Rooted Tech is not a law firm. The quote comes after the shop is seen.',
  'For every 10 Oklahoma businesses that take Safe Harbor service, one school or one church receives that service free.'
);

insert into public.services (slug, sort_order, title, summary, jurisdiction) values
  ('boot', 1, 'The boot', 'The mark goes on the boot screen. The phone starts as the brand. Quoted after the device is in hand.', null),
  ('floor', 2, 'The floor', 'Shop Wi-Fi and cameras, installed for the room you actually have.', null),
  ('backup', 3, 'The backup', 'Records that are still there when the computer is not.', null),
  ('safe-harbor', 4, 'Safe Harbor', 'Oklahoma only. Help putting Senate Bill 626 safeguards in writing: a risk look, layered defenses, staff training, and an incident plan, plus the notice path the statute describes.', 'Oklahoma');

insert into public.social_links (slug, sort_order, label, url) values
  ('facebook', 1, 'Facebook', 'https://www.facebook.com/profile.php?id=61587102645770'),
  ('instagram', 2, 'Instagram', 'https://www.instagram.com/rootedtechservices'),
  ('x', 3, 'X', 'https://x.com/RootedTechLLC'),
  ('gofundme', 4, 'GoFundMe', 'https://gofund.me/31d9597e5');

insert into public.bible_quotes (reference, body) values
  ('Proverbs 18:10', 'The name of the Lord is a strong tower: the righteous runneth into it, and is safe.'),
  ('Psalm 127:1', 'Except the Lord build the house, they labour in vain that build it.'),
  ('Colossians 3:23', 'And whatsoever ye do, do it heartily, as to the Lord, and not unto men.');
