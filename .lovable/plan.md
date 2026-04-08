

## Plan: Require All Fields Before Account Creation

**What**: Update the "Create Account" button's `disabled` condition to check that all form fields are filled AND the terms checkbox is checked.

**How**: In `src/pages/CreateAccount.tsx`, change the button's `disabled` prop from `disabled={!agreed}` to:

```tsx
disabled={!agreed || !form.name || !form.email || !form.phone || !form.password || !form.confirmPassword}
```

This ensures all five fields must have content and the terms checkbox must be checked before the button becomes clickable. Single-line change, no other files affected.

