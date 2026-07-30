-- Supabase SQL Schema for Portfolio Website

-- 1. Create Messages Table for Contact Form Submissions
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert to messages" ON public.messages;
CREATE POLICY "Allow public insert to messages" ON public.messages
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow admin read messages" ON public.messages;
CREATE POLICY "Allow admin read messages" ON public.messages
    FOR SELECT USING (true);


-- 2. Create Admin Settings Table for Storing Secret Keys & Content Key-Values
CREATE TABLE IF NOT EXISTS public.admin_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read admin_settings" ON public.admin_settings;
CREATE POLICY "Allow public read admin_settings" ON public.admin_settings
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public update admin_settings" ON public.admin_settings;
CREATE POLICY "Allow public update admin_settings" ON public.admin_settings
    FOR ALL USING (true);

-- Seed Default Secret Key
INSERT INTO public.admin_settings (key, value)
VALUES ('admin_secret', 'neshaki091')
ON CONFLICT (key) DO NOTHING;


-- 3. Create Translations Table for i18n Key-Value Store
CREATE TABLE IF NOT EXISTS public.translations (
    lang TEXT PRIMARY KEY, -- 'en' or 'vi'
    content JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.translations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read translations" ON public.translations;
CREATE POLICY "Allow public read translations" ON public.translations
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert/update translations" ON public.translations;
CREATE POLICY "Allow public insert/update translations" ON public.translations
    FOR ALL USING (true);


-- 4. Create Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    type TEXT NOT NULL,
    role TEXT NOT NULL,
    description JSONB NOT NULL,
    technologies TEXT[] NOT NULL,
    features JSONB NOT NULL,
    metrics JSONB,
    links JSONB,
    featured BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read projects" ON public.projects;
CREATE POLICY "Allow public read projects" ON public.projects
    FOR SELECT USING (true);


-- 5. Create Storage Buckets: 'recovery' and 'image'
INSERT INTO storage.buckets (id, name, public)
VALUES ('recovery', 'recovery', true),
       ('image', 'image', true)
ON CONFLICT (id) DO NOTHING;

-- RLS Policies for Storage Buckets
DROP POLICY IF EXISTS "Public Read Recovery Bucket" ON storage.objects;
CREATE POLICY "Public Read Recovery Bucket" ON storage.objects
    FOR SELECT USING (bucket_id = 'recovery');

DROP POLICY IF EXISTS "Public Write Recovery Bucket" ON storage.objects;
CREATE POLICY "Public Write Recovery Bucket" ON storage.objects
    FOR ALL USING (bucket_id = 'recovery');

DROP POLICY IF EXISTS "Public Read Image Bucket" ON storage.objects;
CREATE POLICY "Public Read Image Bucket" ON storage.objects
    FOR SELECT USING (bucket_id = 'image');

DROP POLICY IF EXISTS "Public Write Image Bucket" ON storage.objects;
CREATE POLICY "Public Write Image Bucket" ON storage.objects
    FOR ALL USING (bucket_id = 'image');
