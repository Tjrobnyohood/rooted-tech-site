-- Free consultation leads, owner read, and the current offer.
-- Safe Harbor stays Oklahoma-only. Phone-boot branding is removed.

do $$
declare cname text;
begin
  select con.conname into cname
  from pg_constraint con
  where con.conrelid = 'public.leads'::regclass
    and con.contype = 'c'
    and pg_get_constraintdef(con.oid) ilike '%interest%';
  if cname is not null then
    execute format('alter table public.leads drop constraint %I', cname);
  end if;
end $$;

alter table public.leads
  add constraint leads_interest_check
  check (interest in (
    'static_site', 'backend', 'openclaw', 'cameras',
    'network', 'troubleshoot', 'safe_harbor', 'giveback', 'other'
  ));

alter table public.leads add column if not exists reach text;
alter table public.leads drop constraint if exists leads_reach_check;
alter table public.leads
  add constraint leads_reach_check
  check (reach is null or reach in ('phone', 'whatsapp', 'telegram'));

alter table public.leads add column if not exists notified_at timestamptz;
alter table public.leads add column if not exists notify_via text;

grant insert on public.leads to anon, authenticated;
grant select on public.leads to authenticated;

drop policy if exists leads_owner_read on public.leads;
create policy leads_owner_read on public.leads
  for select to authenticated
  using (lower(auth.jwt() ->> 'email') = 'tjrob2014@gmail.com');

update public.site_settings set
  tagline = 'The front is free. The roots hold.',
  phone_display = '(509) 714-9513',
  phone_e164 = '+15097149513',
  whatsapp_url = 'https://wa.me/15097149513',
  email = 'tjrob2014@gmail.com',
  safe_harbor_summary = 'Oklahoma only. Senate Bill 626, effective January 1, 2026, lets a business raise an affirmative defense in a civil action under the Security Breach Notification Act when it keeps reasonable safeguards and gives the notice the statute requires. Rooted Tech is not a law firm. The scan lines up with the standards below. It is not a certificate, and it is not immunity.',
  giveback_summary = 'For every 10 Oklahoma businesses that take Safe Harbor service, one school or one church receives that service free.',
  updated_at = now()
where id = 1;

delete from public.services;

insert into public.services (slug, sort_order, title, summary, jurisdiction) values
  ('static-site', 1, 'Free static site', 'Promotional pages, for now. Ask about a free static frontend.', null),
  ('backend', 2, 'Backend packages', 'Upgrade when you want accounts, data, and the wiring behind the page.', null),
  ('openclaw', 3, 'A model that runs itself', 'OpenClaw on your side: one place for chats, isolated agents, memory, automations, a browser, skills, and approval before it acts.', null),
  ('cameras', 4, 'Cameras and a custom DVR', 'Physical camera installs, with the recorder in an enclosure built for the shop.', null),
  ('network', 5, 'Network setup', 'The network the cameras, the till, and the office actually share.', null),
  ('troubleshoot', 6, 'Troubleshooting', 'When the link drops or a camera goes dark, we find the fault.', null),
  ('safe-harbor', 7, 'Safe Harbor', 'Oklahoma only. A scan and the safeguards Senate Bill 626 names: a risk look, layered defenses, staff training, and an incident plan.', 'Oklahoma');

insert into public.social_links (slug, sort_order, label, url)
values ('whatsapp', 0, 'WhatsApp', 'https://wa.me/15097149513')
on conflict (slug) do update
  set label = excluded.label, url = excluded.url, sort_order = excluded.sort_order, published = true;
