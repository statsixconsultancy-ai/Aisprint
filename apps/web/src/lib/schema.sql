-- ============================================================
-- EdTech Platform - Database Schema
-- Run this against your PostgreSQL database before deploying
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Leads table
CREATE TABLE IF NOT EXISTS leads (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          VARCHAR(255) NOT NULL,
  email         VARCHAR(255) NOT NULL,
  phone         VARCHAR(20) NOT NULL,
  experience    VARCHAR(100) NOT NULL,
  career_goal   TEXT NOT NULL,
  course_type   VARCHAR(100) NOT NULL,
  source        VARCHAR(100) DEFAULT 'website',
  ip_address    INET,
  user_agent    TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fast lookups by email
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

-- Index for filtering by course
CREATE INDEX IF NOT EXISTS idx_leads_course_type ON leads(course_type);

-- Index for date-range queries
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Contact inquiries table
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        VARCHAR(255) NOT NULL,
  email       VARCHAR(255) NOT NULL,
  subject     VARCHAR(500) NOT NULL,
  message     TEXT NOT NULL,
  ip_address  INET,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_inquiries(email);
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON contact_inquiries(created_at DESC);

-- ============================================================
-- Users table
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username      VARCHAR(255) NOT NULL UNIQUE,
  email         VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  name          VARCHAR(255) NOT NULL,
  country       VARCHAR(100),
  profile_image_url VARCHAR(500),
  phone         VARCHAR(20),
  dob           DATE,
  bio           TEXT,
  is_active     BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at DESC);

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- User Courses table
-- ============================================================
CREATE TABLE IF NOT EXISTS user_courses (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_type   VARCHAR(100) NOT NULL,
  status        VARCHAR(50) NOT NULL DEFAULT 'active',
  experience    VARCHAR(100),
  career_goal   TEXT,
  enrollment_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_courses_user_id ON user_courses(user_id);
CREATE INDEX IF NOT EXISTS idx_user_courses_course_type ON user_courses(course_type);
CREATE INDEX IF NOT EXISTS idx_user_courses_status ON user_courses(status);

CREATE TRIGGER update_user_courses_updated_at
  BEFORE UPDATE ON user_courses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- Wishlist table
-- ============================================================
CREATE TABLE IF NOT EXISTS wishlist (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_type   VARCHAR(100) NOT NULL,
  added_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_wishlist_user_id ON wishlist(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_course_type ON wishlist(course_type);
CREATE UNIQUE INDEX IF NOT EXISTS idx_wishlist_user_course ON wishlist(user_id, course_type);

-- ============================================================
-- Certificates table
-- ============================================================
CREATE TABLE IF NOT EXISTS certificates (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_type   VARCHAR(100) NOT NULL,
  certificate_url VARCHAR(500),
  issued_date   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_certificates_user_id ON certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_course_type ON certificates(course_type);

-- ============================================================
-- Payments table
-- ============================================================
CREATE TABLE IF NOT EXISTS payments (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_type   VARCHAR(100) NOT NULL,
  amount        DECIMAL(10, 2) NOT NULL,
  currency      VARCHAR(10) DEFAULT 'INR',
  razorpay_order_id VARCHAR(255),
  razorpay_payment_id VARCHAR(255),
  status        VARCHAR(50) NOT NULL DEFAULT 'pending',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_course_type ON payments(course_type);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_razorpay_id ON payments(razorpay_payment_id);

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON payments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
