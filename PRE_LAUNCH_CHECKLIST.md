# AiSprint Implementation - Pre-Deployment Checklist

## 🔧 Configuration & Setup

### Environment Variables
- [ ] Razorpay Key ID added to `.env`
- [ ] Razorpay Secret Key added to `.env`
- [ ] Database URL configured
- [ ] NODE_ENV set to 'development' or 'production'

### Database
- [ ] PostgreSQL database created
- [ ] Schema.sql executed successfully
- [ ] All tables created (users, user_courses, wishlist, certificates, payments)
- [ ] Indexes verified
- [ ] Triggers set up for automatic timestamps

### Dependencies
- [ ] Node packages installed (`npm install`)
- [ ] All required packages present
- [ ] No vulnerability warnings

---

## 🔐 Authentication System

### Sign Up Page (/auth/signup)
- [ ] Form displays correctly
- [ ] All fields visible (name, username, email, password, country, courses)
- [ ] Course selection works (can select 1 or 2 courses)
- [ ] Password validation enforced
- [ ] Form submission sends to `/api/auth/signup`
- [ ] Success redirects to `/dashboard`
- [ ] Error messages display correctly

### Sign In Page (/auth/signin)
- [ ] Form displays correctly
- [ ] Email and password required
- [ ] Login successful with correct credentials
- [ ] Login fails gracefully with wrong credentials
- [ ] Successful login redirects to `/dashboard`
- [ ] "Forgot password" link visible

### Auth Provider
- [ ] AuthProvider wraps entire app
- [ ] useAuth hook works in components
- [ ] User auto-loads on app startup
- [ ] Sign out clears user state

### Navbar
- [ ] Not authenticated: "Sign In / Sign Up" buttons visible
- [ ] Authenticated: "Dashboard / Sign Out" buttons visible
- [ ] Mobile menu works correctly
- [ ] Navigation links functional

---

## 📊 Dashboard System

### General Tab
- [ ] Profile information displays correctly
- [ ] Edit button toggles edit mode
- [ ] All fields editable (name, email, country, bio)
- [ ] Save updates successfully
- [ ] Cancel button exits edit mode
- [ ] Read-only display looks good
- [ ] Success messages show after save

### Courses Tab
- [ ] Enrolled courses display correctly
- [ ] Course status shows (active)
- [ ] Enrollment date displays
- [ ] "View Details" button links to course page
- [ ] "Browse Courses" button shows for no courses
- [ ] Card layout responsive on mobile

### Wishlist Tab
- [ ] Saved courses display correctly
- [ ] Course pricing shows
- [ ] "Enroll Now" button links to payment
- [ ] "Remove" button works
- [ ] Empty state shows for new users
- [ ] Wishlist persists between sessions

### Certificates Tab
- [ ] Earned certificates display
- [ ] Issue date shows
- [ ] Certificate download link functional (if available)
- [ ] Beautiful certificate card design
- [ ] Empty state for new users
- [ ] Certificate details visible

### Settings Tab
- [ ] Change Password section expands/collapses
- [ ] Current password validation works
- [ ] New passwords match validation
- [ ] Password update successful
- [ ] Deactivate Account section expandable
- [ ] Warning message clear
- [ ] Deactivation works and logs user out
- [ ] Delete Account requires "DELETE" confirmation
- [ ] Account deletion works
- [ ] All destructive actions have clear warnings

---

## 🛒 Course Management

### Course Detail Page (/dashboard/course/[courseType])
- [ ] Course title and description display
- [ ] Course price shows correctly
- [ ] All 8+ modules listed
- [ ] Learning outcomes displayed
- [ ] "Why Choose" benefits section shows
- [ ] Enrolled badge shows for enrolled users
- [ ] "Enroll Now" button shows for non-enrolled users
- [ ] "Add to Wishlist" button functional
- [ ] Mobile responsive layout

### Course Types
- [ ] ML-AI course: ₹29,999, correct modules
- [ ] Prompt Engineering: ₹19,999, correct modules
- [ ] Both courses accessible via breadcrumbs
- [ ] Course details correct for both

---

## 💳 Payment System

### Payment Page (/dashboard/course/[courseType]/payment)
- [ ] Breadcrumb navigation works
- [ ] Course name displays correctly
- [ ] Price shows accurately
- [ ] Order summary correct
- [ ] Student info (name, email) pre-filled
- [ ] "Pay" button initiates Razorpay checkout
- [ ] Razorpay modal opens correctly
- [ ] Razorpay test key configured
- [ ] Back button works

### Razorpay Integration
- [ ] API key configured correctly
- [ ] Secret key configured correctly
- [ ] Order creation endpoint working
- [ ] Payment verification working
- [ ] Test payment completes successfully
- [ ] User auto-enrolled after payment
- [ ] Wishlist item removed after enrollment
- [ ] Payment record created in database

### Success Page (/dashboard/course/[courseType]/success)
- [ ] Success message displays
- [ ] Course name shown
- [ ] Features list visible
- [ ] Next steps guidance clear
- [ ] "Go to Dashboard" button works
- [ ] Auto-redirect after 5 seconds works
- [ ] Contact information provided

---

## 🔗 API Endpoints

### Authentication Endpoints
- [ ] POST /api/auth/signup - Creates user and courses
- [ ] POST /api/auth/signin - Authenticates and sets cookies
- [ ] POST /api/auth/signout - Clears cookies
- [ ] GET /api/auth/me - Returns current user

### User Endpoints
- [ ] GET /api/user/courses - Returns enrolled courses
- [ ] GET /api/user/wishlist - Returns wishlist items
- [ ] POST /api/user/wishlist - Adds to wishlist
- [ ] DELETE /api/user/wishlist - Removes from wishlist
- [ ] PUT /api/user/profile - Updates profile
- [ ] POST /api/user/change-password - Changes password
- [ ] POST /api/user/deactivate - Deactivates account
- [ ] POST /api/user/delete - Deletes account
- [ ] GET /api/user/certificates - Returns certificates

### Payment Endpoints
- [ ] POST /api/payment/create-order - Creates Razorpay order
- [ ] POST /api/payment/verify - Verifies payment signature

---

## 🔒 Security Checks

### Password Security
- [ ] Passwords hashed with PBKDF2
- [ ] Password strength requirements enforced
- [ ] Password change requires verification
- [ ] No passwords in logs or console

### Session Security
- [ ] Auth tokens in HTTP-only cookies
- [ ] Cookies have secure flag in production
- [ ] Session expiration set (7 days)
- [ ] Sign out clears all cookies

### Data Validation
- [ ] Email validation on signup/signin
- [ ] Username validation enforced
- [ ] Course type validation in API
- [ ] Payment amount validation
- [ ] Razorpay signature verification

### Authorization
- [ ] Unauthenticated users redirected from dashboard
- [ ] Users can only access their own data
- [ ] API endpoints require authentication
- [ ] No user data leaks in responses

---

## 📱 Responsive Design

### Mobile (< 768px)
- [ ] Navbar collapse works
- [ ] Mobile menu touches smoothly
- [ ] Dashboard tabs scroll horizontally
- [ ] Forms readable and usable
- [ ] Buttons touch-friendly size

### Tablet (768px - 1024px)
- [ ] Layout proper
- [ ] Two-column layouts work
- [ ] Touch interactions smooth
- [ ] Images responsive

### Desktop (> 1024px)
- [ ] Full layout displays
- [ ] Hover effects work
- [ ] All features visible
- [ ] Professional appearance

---

## 🧪 User Flow Testing

### Complete Sign Up Flow
1. [ ] Visit /auth/signup
2. [ ] Fill form with valid data
3. [ ] Select 1 or 2 courses
4. [ ] Submit form
5. [ ] See dashboard automatically
6. [ ] Courses appear in Courses tab

### Complete Purchase Flow
1. [ ] Navigate to course detail page
2. [ ] Click "Enroll Now"
3. [ ] Go to payment page
4. [ ] Complete Razorpay payment
5. [ ] See success page
6. [ ] Auto-redirect to dashboard
7. [ ] Course appears in Courses tab
8. [ ] Removed from Wishlist

### Complete Settings Flow
1. [ ] Change password successfully
2. [ ] Deactivate account (can't sign in after)
3. [ ] Test password recovery (when implemented)
4. [ ] Delete account with confirmation

---

## 📊 Data Integrity

### Database Checks
- [ ] User data persists correctly
- [ ] Course enrollments saved
- [ ] Wishlist items persist
- [ ] Payments recorded
- [ ] Cascading deletes work (user delete removes courses, wishlist, etc.)

### Session Checks
- [ ] User stays logged in across pages
- [ ] Logout clears all session data
- [ ] Multiple browser tabs share session
- [ ] Session persists on page refresh

---

## 🚀 Performance

### Load Times
- [ ] Dashboard loads quickly
- [ ] Auth pages responsive
- [ ] No console errors
- [ ] No memory leaks

### Network Requests
- [ ] Minimal API calls
- [ ] Proper caching
- [ ] No duplicate requests
- [ ] Error handling graceful

---

## 📝 Documentation

- [ ] IMPLEMENTATION_GUIDE.md created
- [ ] IMPLEMENTATION_COMPLETE.md created
- [ ] QUICKSTART.sh ready
- [ ] API documentation complete
- [ ] Component documentation in code

---

## 🎯 Final Pre-Launch

- [ ] All tests passed
- [ ] No console errors
- [ ] No console warnings (except third-party)
- [ ] Lighthouse score acceptable
- [ ] Cross-browser tested (Chrome, Safari, Firefox, Edge)
- [ ] Mobile tested on real devices
- [ ] Performance optimized
- [ ] SEO meta tags updated
- [ ] Analytics configured
- [ ] Error tracking setup (optional)
- [ ] Backup strategy in place
- [ ] Monitoring configured

---

## 🚨 Common Issues & Solutions

### Issue: Razorpay not loading
**Solution**: Check NEXT_PUBLIC_RAZORPAY_KEY_ID is correct and public

### Issue: Users not saving
**Solution**: Verify DATABASE_URL and network connection

### Issue: Cookies not working
**Solution**: Ensure NODE_ENV set, check secure flag in production

### Issue: Course not showing
**Solution**: Verify course_type matches exactly (ml-ai, prompt-engineering)

---

## 📞 Support Contacts

- **Email**: aisprintglobal@gmail.com
- **Documentation**: See IMPLEMENTATION_GUIDE.md
- **Issues**: Check console for error messages

---

**Last Updated**: March 3, 2026
**Status**: Ready for Pre-Launch Testing
