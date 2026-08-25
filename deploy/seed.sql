-- RecXchange v2 seed. Idempotent. Demo people are labelled fictional.
-- Passwords (argon2id t=2 m=65536 p=1): see apps/v2/README.md

INSERT INTO users (id, email, password_hash, name, plan, is_admin, created_at) VALUES
  ('a1111111-1111-4111-8111-111111111111', 'admin@recxchange.io',
   '$argon2id$v=19$m=65536,t=2,p=1$ENV+1ecet62yUTctE/lpAg$/ginZY4X0sJbs6K3fV3ZpbUZcEJtWvJUNe/XOUjrqGE',
   'Tom Admin', 'pro', true, now()),
  ('a2222222-2222-4222-8222-222222222222', 'pro@recxchange.io',
   '$argon2id$v=19$m=65536,t=2,p=1$+kVUVvinJ0xfhKllzNwX6A$92IbSKC5Asb9VYN4HXAuKw4b+qb+PSvAQ1GhXWskdrw',
   'Alex Demo', 'pro', false, now()),
  ('a3333333-3333-4333-8333-333333333333', 'lite@recxchange.io',
   '$argon2id$v=19$m=65536,t=2,p=1$QiF0SBljKo1fF4fQDLfaLQ$UQ1ivfPrvfeJlYIh4aTaQWPvsdieDYYiBB+pgGa5PX0',
   'Jordan Example', 'lite', false, now()),
  ('a4444444-4444-4444-8444-444444444444', 'entry@recxchange.io',
   '$argon2id$v=19$m=65536,t=2,p=1$+L0NGV95IeqLiU0bf2HsEQ$up80W/afIyTYl+utQWn9a5s5qEVywiyAvt5HAjjfI8g',
   'Sam Sample', 'entry', false, now())
ON CONFLICT (email) DO NOTHING;

INSERT INTO clients (id, owner_user_id, name, sector, status, created_at) VALUES
  ('b1111111-1111-4111-8111-111111111111', 'a1111111-1111-4111-8111-111111111111', 'Northern Civils Demo Ltd', 'civils', 'active', now()),
  ('b2222222-2222-4222-8222-222222222222', 'a2222222-2222-4222-8222-222222222222', 'Mersey Plant Hire Example', 'plant', 'active', now()),
  ('b3333333-3333-4333-8333-333333333333', 'a3333333-3333-4333-8333-333333333333', 'Atlas Rail Projects (Demo)', 'rail', 'active', now())
ON CONFLICT (id) DO NOTHING;

INSERT INTO contacts (id, client_id, name, email, role_title) VALUES
  ('d1111111-1111-4111-8111-111111111111', 'b1111111-1111-4111-8111-111111111111', 'Pat Hiring-Demo', 'pat.hiring@demo.invalid', 'Hiring manager'),
  ('d2222222-2222-4222-8222-222222222222', 'b2222222-2222-4222-8222-222222222222', 'Chris Desk-Example', 'chris.desk@demo.invalid', 'Fleet lead'),
  ('d3333333-3333-4333-8333-333333333333', 'b3333333-3333-4333-8333-333333333333', 'Lee Project-Fixture', 'lee.project@demo.invalid', 'Project manager')
ON CONFLICT (id) DO NOTHING;

-- 13 open roles. Client identity hidden until Work Role on Direct.
INSERT INTO roles (
  id, owner_user_id, client_id, kind, title, description, location, city, country,
  salary_min, salary_max, currency, bounty_amount,
  proposed_split_owner_bps, proposed_split_partner_bps,
  urgency, status, client_identity_public,
  friction_advert_score, friction_split_score, friction_report, created_at
) VALUES
  ('e0000001-0000-4000-8000-000000000001', 'a1111111-1111-4111-8111-111111111111', 'b1111111-1111-4111-8111-111111111111',
   'direct', '360 Excavator Operator — Manchester days',
   'Permanent 360 operator for a civils contractor running a mixed CAT and Hitachi fleet on North West highways schemes. Days, site-based, overtime available. Fictional client for the v2 prototype. Must hold CPCS A59, a full UK licence, and recent 13–22t time. Report to the site agent. Van provided after probation. This description is padded so Friction treats it as a real advert rather than a stub, because thin copy is how desks lose the network.',
   'Manchester, UK', 'Manchester', 'UK', 38000, 44000, 'GBP', 4500, 5000, 5000, 'high', 'open', false, 85, 100, '{"verdict":"ok"}'::jsonb, now()),
  ('e0000002-0000-4000-8000-000000000002', 'a1111111-1111-4111-8111-111111111111', 'b1111111-1111-4111-8111-111111111111',
   'direct', 'Site Engineer — Leeds civils',
   'Setting-out and quality for a demo civils programme in Leeds. GPS, drawings, as-builts. HNC Civil or equivalent. Permanent, site-based, company vehicle. Fictional evidence only. The desk wants someone who can run a gang without being babysat, keep the diary honest, and close the paperwork the same day.',
   'Leeds, UK', 'Leeds', 'UK', 42000, 50000, 'GBP', 5200, 5000, 5000, 'standard', 'open', false, 82, 100, '{"verdict":"ok"}'::jsonb, now()),
  ('e0000003-0000-4000-8000-000000000003', 'a2222222-2222-4222-8222-222222222222', 'b2222222-2222-4222-8222-222222222222',
   'direct', 'Plant Fitter — Liverpool workshop',
   'Workshop and field fitter for a plant-hire demo desk. JCB, CAT, telehandlers. CPCS or NPORS, own tools a plus. Days, overtime, van. Fictional role for prototype split quotes. Two years of hydraulic and electrical diagnosis expected. This is not a live vacancy.',
   'Liverpool, UK', 'Liverpool', 'UK', 36000, 42000, 'GBP', 4000, 5000, 5000, 'urgent', 'open', false, 80, 100, '{"verdict":"ok"}'::jsonb, now()),
  ('e0000004-0000-4000-8000-000000000004', 'a2222222-2222-4222-8222-222222222222', 'b2222222-2222-4222-8222-222222222222',
   'direct', 'HGV Class 2 — Sheffield nights',
   'Class 2 driver on a night trunk for a demo logistics client. UK licence, CPC, tacho. Permanent. Fictional. Split is plan-gated on RecX Direct. Clean licence preferred. Start times 18:00. This copy exists so the marketplace is not empty.',
   'Sheffield, UK', 'Sheffield', 'UK', 32000, 36000, 'GBP', 2800, 5000, 5000, 'standard', 'open', false, 78, 100, '{"verdict":"ok"}'::jsonb, now()),
  ('e0000005-0000-4000-8000-000000000005', 'a1111111-1111-4111-8111-111111111111', 'b1111111-1111-4111-8111-111111111111',
   'direct', 'Quantity Surveyor — Birmingham civils',
   'QS for a demo main contractor. Measure, subcontract, valuations. Degree or equivalent. Hybrid two days. Fictional client identity stays hidden until you work this role. NEC3 familiarity helps. This is prototype data, not a live hire.',
   'Birmingham, UK', 'Birmingham', 'UK', 48000, 58000, 'GBP', 6000, 5000, 5000, 'high', 'open', false, 84, 100, '{"verdict":"ok"}'::jsonb, now()),
  ('e0000006-0000-4000-8000-000000000006', 'a2222222-2222-4222-8222-222222222222', NULL,
   'xchange', 'Rail Track Engineer — Birmingham nights',
   'Xchange role. PTS, night possession experience, NR contractor background. 50/50 member split. RecXchange is not a party. Fictional. You own the candidate until stamp. Description is deliberately complete: possession diary, COSS interface, handback, and a named (demo) hiring manager on the owning desk. Must-haves listed so Friction scores this as ok.',
   'Birmingham, UK', 'Birmingham', 'UK', 50000, 62000, 'GBP', 7000, 5000, 5000, 'high', 'open', true, 88, 100,
   '{"advert_score":88,"split_score":100,"verdict":"ok","findings":[]}'::jsonb, now()),
  ('e0000007-0000-4000-8000-000000000007', 'a3333333-3333-4333-8333-333333333333', NULL,
   'xchange', 'Telehandler Operator — various sites TBD',
   'Need an operator soon.',
   '', '', 'UK', 0, 0, 'GBP', 2500, 7000, 3000, 'urgent', 'open', true, 25, 60,
   '{"advert_score":25,"split_score":60,"verdict":"warn","findings":[{"code":"TITLE_VAGUE","severity":"warn","message":"Title is vague. Name the job, not a category."},{"code":"LOCATION_MISSING","severity":"warn","message":"No location. Recruiter traffic will be weak."},{"code":"SALARY_MISSING","severity":"warn","message":"No salary. Recruiter traffic will be weak."},{"code":"DESCRIPTION_THIN","severity":"warn","message":"Description is thin. Spell out the work, not the vibe."}]}'::jsonb, now()),
  ('e0000008-0000-4000-8000-000000000008', 'a2222222-2222-4222-8222-222222222222', NULL,
   'xchange', 'Groundworker — Manchester civils gang',
   'Experienced groundworker for a North West civils gang. Drainage, kerbs, concrete. CSCS, CPCS A73 useful. Permanent or long contract. Fictional Xchange listing. 50/50. The owning desk will take first-right on client comms. This advert names kit, ticket, and pay so partners can actually submit.',
   'Manchester, UK', 'Manchester', 'UK', 32000, 36000, 'GBP', 3000, 5000, 5000, 'standard', 'open', true, 80, 100,
   '{"advert_score":80,"split_score":100,"verdict":"ok","findings":[]}'::jsonb, now()),
  ('e0000009-0000-4000-8000-000000000009', 'a1111111-1111-4111-8111-111111111111', NULL,
   'xchange', 'Setting Out Engineer — North West',
   'GPS setting-out for highways demo schemes. Trimble or Leica. Full UK licence. Xchange 60/40. Fictional. Description covers the diary, the kit, and the ticket list so this is not a dump-and-hope post. Partners keep 40%.',
   'North West, UK', 'Manchester', 'UK', 40000, 48000, 'GBP', 4800, 6000, 4000, 'standard', 'open', true, 76, 100,
   '{"advert_score":76,"split_score":100,"verdict":"ok","findings":[]}'::jsonb, now()),
  ('e0000010-0000-4000-8000-000000000010', 'a3333333-3333-4333-8333-333333333333', 'b3333333-3333-4333-8333-333333333333',
   'referral', 'Traffic Marshal — London civils',
   'Referral role. Client is a demo principal contractor. Traffic marshal for a London civils site. CSCS, NRSWA a plus. Lite and Pro can apply; Entry sees this greyed. Fictional. Pay band listed. Description is long enough that Friction would not call it thin if scored.',
   'London, UK', 'London', 'UK', 28000, 32000, 'GBP', 2200, 5000, 5000, 'standard', 'open', false, 74, 100, '{"verdict":"ok"}'::jsonb, now()),
  ('e0000011-0000-4000-8000-000000000011', 'a1111111-1111-4111-8111-111111111111', 'b3333333-3333-4333-8333-333333333333',
   'referral', 'Slinger Signaller — Newcastle rail',
   'Referral. Slinger/signaller on a demo rail project. CPCS A40, PTS preferred. Entry cannot apply. Fictional. Days and nights mixed. The split on Referral is with RecXchange, not another member.',
   'Newcastle, UK', 'Newcastle', 'UK', 34000, 39000, 'GBP', 3100, 5000, 5000, 'high', 'open', false, 77, 100, '{"verdict":"ok"}'::jsonb, now()),
  ('e0000012-0000-4000-8000-000000000012', 'a2222222-2222-4222-8222-222222222222', 'b2222222-2222-4222-8222-222222222222',
   'referral', 'Dump Truck Operator — Glasgow',
   'Referral dump-truck operator for a demo quarry client. CPCS A56. Entry gated. Fictional. Permanent. Split is plan-gated: Lite 50/50 with RecXchange, Pro keeps 100%.',
   'Glasgow, UK', 'Glasgow', 'UK', 33000, 37000, 'GBP', 2900, 5000, 5000, 'standard', 'open', false, 73, 100, '{"verdict":"ok"}'::jsonb, now()),
  ('e0000013-0000-4000-8000-000000000013', 'a1111111-1111-4111-8111-111111111111', 'b1111111-1111-4111-8111-111111111111',
   'direct', 'Banksman — Manchester city centre',
   'Banksman/traffic marshal hybrid on a tight city-centre demo site. CSCS, radio, calm under delivery pressure. Direct. Client hidden until Work Role. Fictional. Days. This is the thirteenth role so the marketplace is not a toy list.',
   'Manchester, UK', 'Manchester', 'UK', 27000, 30000, 'GBP', 1800, 5000, 5000, 'standard', 'open', false, 70, 100, '{"verdict":"ok"}'::jsonb, now())
ON CONFLICT (id) DO NOTHING;

INSERT INTO candidates (id, owner_user_id, display_name, headline, location, salary_expectation, skills, systems, evidence, source_label, created_at) VALUES
  ('c0000001-0000-4000-8000-000000000001', 'a2222222-2222-4222-8222-222222222222', 'Alex Demo', '360 operator / plant', 'Manchester, UK', 40000, ARRAY['CPCS A59','360 22t','CAT'], ARRAY['CAT 320','Hitachi ZX210'], 'FICTIONAL: ticket copies on file labelled DEMO. Two years 360 time claimed — verify on screen.', 'demo-seed', now()),
  ('c0000002-0000-4000-8000-000000000002', 'a3333333-3333-4333-8333-333333333333', 'Jordan Example', 'Site engineer civils', 'Leeds, UK', 46000, ARRAY['GPS','setting-out','HNC Civil'], ARRAY['Trimble','AutoCAD'], 'FICTIONAL: degree certificate watermarked EXAMPLE. GPS log excerpts are mock.', 'demo-seed', now()),
  ('c0000003-0000-4000-8000-000000000003', 'a2222222-2222-4222-8222-222222222222', 'Sam Sample', 'Plant fitter', 'Liverpool, UK', 39000, ARRAY['hydraulics','JCB','NPORS'], ARRAY['JCB 3CX','CAT telehandler'], 'FICTIONAL: workshop references labelled SAMPLE. No live employer.', 'demo-seed', now()),
  ('c0000004-0000-4000-8000-000000000004', 'a4444444-4444-4444-8444-444444444444', 'Riley Fixture', 'HGV Class 2 nights', 'Sheffield, UK', 34000, ARRAY['Class 2','CPC','tacho'], ARRAY['DAF CF'], 'FICTIONAL: licence scan watermarked FIXTURE. Clean-licence claim unverified.', 'demo-seed', now()),
  ('c0000005-0000-4000-8000-000000000005', 'a1111111-1111-4111-8111-111111111111', 'Casey Placeholder', 'QS civils', 'Birmingham, UK', 54000, ARRAY['NEC3','measurement','subcontract'], ARRAY['CostX'], 'FICTIONAL: CV generated for prototype. Do not treat as a real candidate.', 'demo-seed', now()),
  ('c0000006-0000-4000-8000-000000000006', 'a2222222-2222-4222-8222-222222222222', 'Morgan Mock', 'Rail track engineer', 'Birmingham, UK', 56000, ARRAY['PTS','COSS','night possession'], ARRAY['Network Rail'], 'FICTIONAL: PTS card labelled MOCK. Possession diary is invented.', 'demo-seed', now()),
  ('c0000007-0000-4000-8000-000000000007', 'a3333333-3333-4333-8333-333333333333', 'Taylor Test', 'Telehandler operator', 'Warrington, UK', 33000, ARRAY['CPCS A17','telehandler'], ARRAY['JCB 535'], 'FICTIONAL: thin evidence. Ticket number not supplied — say so on the X-Ray card.', 'demo-seed', now()),
  ('c0000008-0000-4000-8000-000000000008', 'a2222222-2222-4222-8222-222222222222', 'Avery Sample', 'Groundworker', 'Manchester, UK', 34000, ARRAY['CSCS','drainage','kerbs'], ARRAY[]::text[], 'FICTIONAL: CSCS labelled SAMPLE. Gang history is mock.', 'demo-seed', now()),
  ('c0000009-0000-4000-8000-000000000009', 'a1111111-1111-4111-8111-111111111111', 'Quinn Demo', 'Setting-out engineer', 'Bolton, UK', 44000, ARRAY['Leica','GPS','highways'], ARRAY['Leica Captivate'], 'FICTIONAL: instrument logs are demo files.', 'demo-seed', now()),
  ('c0000010-0000-4000-8000-000000000010', 'a3333333-3333-4333-8333-333333333333', 'Parker Example', 'Traffic marshal', 'London, UK', 30000, ARRAY['CSCS','NRSWA','radio'], ARRAY[]::text[], 'FICTIONAL: site inductions invented. Verify tickets on screen.', 'demo-seed', now()),
  ('c0000011-0000-4000-8000-000000000011', 'a1111111-1111-4111-8111-111111111111', 'Reese Fixture', 'Slinger signaller', 'Newcastle, UK', 36000, ARRAY['CPCS A40','PTS'], ARRAY[]::text[], 'FICTIONAL: A40 card labelled FIXTURE.', 'demo-seed', now()),
  ('c0000012-0000-4000-8000-000000000012', 'a2222222-2222-4222-8222-222222222222', 'Harper Demo', 'Dump truck operator', 'Glasgow, UK', 35000, ARRAY['CPCS A56','quarry'], ARRAY['Volvo A25'], 'FICTIONAL: quarry ticket mock.', 'demo-seed', now()),
  ('c0000013-0000-4000-8000-000000000013', 'a4444444-4444-4444-8444-444444444444', 'Rowan Sample', 'Banksman', 'Manchester, UK', 28000, ARRAY['CSCS','banksman'], ARRAY[]::text[], 'FICTIONAL: evidence thin — one mock reference only.', 'demo-seed', now()),
  ('c0000014-0000-4000-8000-000000000014', 'a3333333-3333-4333-8333-333333333333', 'Sage Example', 'Plant operator multi', 'Liverpool, UK', 37000, ARRAY['CPCS A59','A17','roller'], ARRAY['CAT','JCB'], 'FICTIONAL: multi-ticket claim. Verify each ticket separately.', 'demo-seed', now()),
  ('c0000015-0000-4000-8000-000000000015', 'a2222222-2222-4222-8222-222222222222', 'Blake Placeholder', 'HGV + plant dual', 'Leeds, UK', 38000, ARRAY['Class 2','CPCS A59'], ARRAY['DAF','CAT 320'], 'FICTIONAL: dual-ticket story for X-Ray ranking demos. Not a real person.', 'demo-seed', now())
ON CONFLICT (id) DO NOTHING;

INSERT INTO applications (id, role_id, candidate_id, submitter_user_id, status, submitted_at, ownership_timestamp, created_at) VALUES
  ('f0000001-0000-4000-8000-000000000001', 'e0000001-0000-4000-8000-000000000001', 'c0000001-0000-4000-8000-000000000001', 'a2222222-2222-4222-8222-222222222222', 'applied', now() - interval '5 days', now() - interval '5 days', now() - interval '5 days'),
  ('f0000002-0000-4000-8000-000000000002', 'e0000001-0000-4000-8000-000000000001', 'c0000014-0000-4000-8000-000000000014', 'a3333333-3333-4333-8333-333333333333', 'screening', now() - interval '4 days', now() - interval '4 days', now() - interval '4 days'),
  ('f0000003-0000-4000-8000-000000000003', 'e0000002-0000-4000-8000-000000000002', 'c0000002-0000-4000-8000-000000000002', 'a3333333-3333-4333-8333-333333333333', 'interview', now() - interval '8 days', now() - interval '8 days', now() - interval '8 days'),
  ('f0000004-0000-4000-8000-000000000004', 'e0000003-0000-4000-8000-000000000003', 'c0000003-0000-4000-8000-000000000003', 'a2222222-2222-4222-8222-222222222222', 'offer', now() - interval '12 days', now() - interval '12 days', now() - interval '12 days'),
  ('f0000005-0000-4000-8000-000000000005', 'e0000005-0000-4000-8000-000000000005', 'c0000005-0000-4000-8000-000000000005', 'a1111111-1111-4111-8111-111111111111', 'placed', now() - interval '20 days', now() - interval '20 days', now() - interval '20 days')
ON CONFLICT (id) DO NOTHING;

INSERT INTO split_agreements (id, application_id, role_id, role_kind, plan_at_submit, recx_bps, recruiter_bps, partner_bps, terms_json, created_at) VALUES
  ('s0000001-0000-4000-8000-000000000001', 'f0000001-0000-4000-8000-000000000001', 'e0000001-0000-4000-8000-000000000001', 'direct', 'pro', 0, 10000, 0, '{"display":"Recruiter keeps 100%"}'::jsonb, now()),
  ('s0000002-0000-4000-8000-000000000002', 'f0000002-0000-4000-8000-000000000002', 'e0000001-0000-4000-8000-000000000001', 'direct', 'lite', 3000, 7000, 0, '{"display":"Recruiter 70% / RecXchange 30%"}'::jsonb, now()),
  ('s0000003-0000-4000-8000-000000000003', 'f0000003-0000-4000-8000-000000000003', 'e0000002-0000-4000-8000-000000000002', 'direct', 'lite', 3000, 7000, 0, '{"display":"Recruiter 70% / RecXchange 30%"}'::jsonb, now())
ON CONFLICT (id) DO NOTHING;

INSERT INTO notes (id, entity_type, entity_id, author_id, body, created_at) VALUES
  ('n0000001-0000-4000-8000-000000000001', 'application', 'f0000003-0000-4000-8000-000000000003', 'a1111111-1111-4111-8111-111111111111', 'Interview booked (demo). Client still hidden on the public card.', now()),
  ('n0000002-0000-4000-8000-000000000002', 'role', 'e0000001-0000-4000-8000-000000000001', 'a1111111-1111-4111-8111-111111111111', 'Direct. Work Role to see the client name.', now())
ON CONFLICT (id) DO NOTHING;

INSERT INTO automations (id, type, payload, status, created_at, processed_at) VALUES
  ('u0000001-0000-4000-8000-000000000001', 'notify_match', '{"role_id":"e0000001-0000-4000-8000-000000000001"}'::jsonb, 'done', now() - interval '2 days', now() - interval '2 days'),
  ('u0000002-0000-4000-8000-000000000002', 'application_submitted', '{"application_id":"f0000001-0000-4000-8000-000000000001"}'::jsonb, 'done', now() - interval '5 days', now() - interval '5 days'),
  ('u0000003-0000-4000-8000-000000000003', 'stage_changed', '{"application_id":"f0000005-0000-4000-8000-000000000005","to":"placed","email_stub":"Subject: Placed — Casey Placeholder\n\nDemo only. No email sent."}'::jsonb, 'done', now() - interval '1 day', now() - interval '1 day')
ON CONFLICT (id) DO NOTHING;
