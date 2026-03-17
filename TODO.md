# Terminal Error Fixes - Progress Tracker

## ✅ Phase 1: Critical Fixes (In Progress)

### 1. [ ] Fix GeneralTab.tsx syntax error
   - Remove stray JSX code after line 158 (lines 159-218)
   - Restore original dashboard stats/courses display
   
### 2. [ ] Safe SQL update for /api/auth/me 
   - Modify SELECT query to handle missing phone/dob columns
   - Use COALESCE(phone, null) or remove optional fields
   
### 3. [ ] Database migration
   - Create script: ALTER TABLE users ADD COLUMN phone VARCHAR(20), dob DATE  
   - Run migration
   
### 4. [ ] Next.js config deprecation
   - Update next.config.js: images.domains → images.remotePatterns
   
## 🔄 Phase 2: Testing & Cleanup
### 5. [ ] Clean Next.js cache
### 6. [ ] Test /dashboard and /api/auth/me endpoints
### 7. [ ] Restart dev server
### 8. [ ] Verify all errors resolved

**Current Status**: Starting Phase 1 Step 1

