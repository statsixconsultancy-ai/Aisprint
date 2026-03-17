# AiSprint Platform - Implementation Guide

## Overview
This document outlines the complete implementation of the new authentication, dashboard, and payment system for the AiSprint platform.

## Database Schema Changes

### New Tables Created
1. **users** - User account information
2. **user_courses** - User enrollments in courses
3. **wishlist** - Course wishlist/cart items
4. **certificates** - Earned certificates
5. **payments** - Payment transaction records

All tables include proper indexing and triggers for automatic timestamp updates.

## Frontend Changes

### Updated Components
1. **Navbar** - Changed "Apply Now" button to contextual auth buttons
   - Shows "Sign In / Sign Up" when not authenticated
   - Shows "Dashboard / Sign Out" when authenticated

### New Auth Pages
- `/auth/signup` - Registration with course selection
- `/auth/signin` - Login page with password recovery

### New Dashboard Pages
- `/dashboard` - Main dashboard with 5 tabs
  - **General Tab** - Profile information (name, username, email, country, bio)
  - **Courses Tab** - Enrolled courses with view details option
  - **Wishlist Tab** - Saved courses for later purchase
  - **Certificates Tab** - Earned certificates
  - **Settings Tab** - Account management (password, deactivation, deletion)

### Course Pages
- `/dashboard/course/[courseType]` - Detailed course information
- `/dashboard/course/[courseType]/payment` - Payment page with Razorpay integration
- `/dashboard/course/[courseType]/success` - Payment success confirmation

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user
- `POST /api/auth/signout` - Logout user
- `GET /api/auth/me` - Get current user info

### User Management
- `GET /api/user/courses` - Get user's enrolled courses
- `GET/POST/DELETE /api/user/wishlist` - Manage wishlist
- `PUT /api/user/profile` - Update profile
- `POST /api/user/change-password` - Change password
- `POST /api/user/deactivate` - Deactivate account
- `POST /api/user/delete` - Delete account
- `GET /api/user/certificates` - Get certificates

### Payment
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment and enroll user

## Authentication & Security

### Password Hashing
- Uses PBKDF2 with SHA-512
- 1000 iterations for security
- Production: Recommend upgrading to bcryptjs

### Session Management
- HTTP-only cookies for auth tokens
- 7-day session expiration
- Separate user_id cookie for client-side identification

### Password Requirements
- Minimum 8 characters
- Must contain uppercase and lowercase letters
- Must contain at least one number

## Course Selection
Users can select one or both courses during signup:
1. **Machine Learning & AI** - ₹29,999
2. **Prompt Engineering** - ₹19,999

## Payment Integration (Razorpay)

### Setup Required
1. Get Razorpay API keys from https://dashboard.razorpay.com
2. Add to `.env`:
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID` - Your Key ID
   - `RAZORPAY_SECRET_KEY` - Your Secret Key

### Payment Flow
1. User clicks "Enroll Now"
2. Creates order on backend
3. Opens Razorpay checkout
4. Razorpay handles payment
5. Backend verifies signature
6. User automatically enrolled
7. Redirects to success page

## Environment Variables Required

```env
DATABASE_URL=your_postgresql_url
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key
RAZORPAY_SECRET_KEY=your_secret
NODE_ENV=development
```

## Next Steps for Implementation

### 1. Database Migration
Run the schema SQL against your PostgreSQL database:
```sql
-- Run the schema from src/lib/schema.sql
```

### 2. Install Razorpay
```bash
npm install razorpay
```

### 3. Update Email Templates
- Enrollment confirmation email
- Payment receipt email
- Certificate issuance email

### 4. Create Landing Pages for Courses
- Individual course landing pages at `/courses/[courseType]`
- Add course preview videos
- Add better course descriptions

### 5. Implement Notifications
- Email notifications for enrollment
- Dashboard notifications for new messages
- Certificate issued notifications

### 6. Mentorship System
- Book mentor sessions
- Schedule management
- Session recordings

### 7. Course Content Management
- Video uploads
- Module structure
- Progress tracking

### 8. Analytics
- Track user engagement
- Monitor course progress
- Payment analytics

## Testing

### Test Accounts
1. Test signup with both course selections
2. Test sign in/sign out
3. Test profile updates
4. Test wishlist functionality
5. Test payment flow with Razorpay test keys

### Razorpay Test Cards
- Success: 4111111111111111
- Failure: 4100000000000000
- Use any future expiry and any CVC

## File Structure

```
apps/web/src/
├── app/
│   ├── auth/
│   │   ├── signin/page.tsx
│   │   └── signup/page.tsx
│   ├── dashboard/
│   │   ├── page.tsx
│   │   └── course/[courseType]/
│   │       ├── page.tsx
│   │       ├── payment/page.tsx
│   │       └── success/page.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   ├── signin/route.ts
│   │   │   ├── signup/route.ts
│   │   │   ├── signout/route.ts
│   │   │   └── me/route.ts
│   │   ├── user/
│   │   │   ├── courses/route.ts
│   │   │   ├── wishlist/route.ts
│   │   │   ├── profile/route.ts
│   │   │   ├── change-password/route.ts
│   │   │   ├── deactivate/route.ts
│   │   │   ├── delete/route.ts
│   │   │   └── certificates/route.ts
│   │   └── payment/
│   │       ├── create-order/route.ts
│   │       └── verify/route.ts
├── components/
│   ├── dashboard/
│   │   ├── GeneralTab.tsx
│   │   ├── CoursesTab.tsx
│   │   ├── WishlistTab.tsx
│   │   ├── CertificatesTab.tsx
│   │   └── SettingsTab.tsx
│   ├── forms/
│   │   ├── RegistrationForm.tsx
│   │   └── SignInForm.tsx
│   └── providers/
│       └── AuthProvider.tsx
└── lib/
    ├── auth.ts
    ├── db.ts
    └── schema.sql
```

## Support

For issues or questions:
- Email: aisprintglobal@gmail.com
- Documentation: See README.md in the workspace
