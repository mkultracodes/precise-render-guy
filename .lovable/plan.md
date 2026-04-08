

# Plan: Dummy Login System + Portal Cleanup

## Overview
Create a hardcoded login flow with forgot/reset password screens, strip down the portal to just the active repair card with a "New Repair" button, and add a profile settings page.

## New Files

### 1. `src/pages/Login.tsx` — Login page
- Email + password form, styled with existing glass-card/brand
- Hardcoded credentials: `mkhemingway.retpair@gmail.com` / `1234`
- On success, store flag in localStorage and redirect to `/portal`
- "Forgot Password" link → `/forgot-password`
- "Reset Password" link → `/reset-password`
- Bear mascot logo at top

### 2. `src/pages/ForgotPassword.tsx` — Forgot password flow
- Email input form
- On submit, show "Email sent" confirmation screen with "Back to Login" link
- No actual email sending

### 3. `src/pages/ResetPassword.tsx` — Reset password flow
- Email input form (same as forgot password but different copy)
- On submit, show "Email sent" confirmation screen with "Back to Login" link

### 4. `src/pages/ProfileSettings.tsx` — Profile settings page
- Editable fields: Name, Address, Phone Number, Email, Payment (card ending in ****)
- Pre-filled with dummy data
- Save button (stores in localStorage or just shows toast)
- Back link to portal

## Modified Files

### 5. `src/App.tsx` — Add routes
- `/login`, `/forgot-password`, `/reset-password`, `/profile`
- Change `/portal` to check localStorage auth flag; redirect to `/login` if not set

### 6. `src/pages/CustomerPortal.tsx` — Major cleanup
- **Remove**: Greeting section (h1 + subtitle with bear emoji)
- **Remove**: Support and Receipts quick action buttons (keep only "New Repair")
- **Remove**: My Devices section
- **Remove**: Repair History section
- **Remove**: Subscription banner (Repair Bear+)
- **Remove**: ETA box from active repair card (keep Estimated + Shop)
- **Remove**: Nav bar entirely
- **Add**: Simple top bar with bear logo, ThemeToggle, profile avatar (links to `/profile`), and logout button
- **Add**: Logout clears localStorage and redirects to `/login`
- Change grid from `grid-cols-3` to single centered "New Repair" button

## Technical Details
- Auth state: simple `localStorage.getItem("repairbear_auth")` check
- No real backend — all dummy/hardcoded
- Profile data stored in localStorage
- Reuse existing UI components (Button, Input, glass-card classes)
- Toast notification on profile save

