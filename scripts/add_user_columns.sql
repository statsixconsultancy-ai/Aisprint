-- Add missing columns to users table (safe migration)
-- Run: psql $DATABASE_URL -f add_user_columns.sql

ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS phone VARCHAR(20),
ADD COLUMN IF NOT EXISTS dob DATE;

-- Verify columns added
\\d public.users
