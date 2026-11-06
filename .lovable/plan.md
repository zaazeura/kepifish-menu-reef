# Kepifish contact links and customer reviews

## What will change
- Keep the current single-page catalog, visual identity, Canva/catalog area, menu, and existing WhatsApp/Instagram config as-is; use the existing contact configuration rather than inventing account details.
- Add a customer review section with a validated name/rating/date/comment form, saved as pending, and show only admin-approved reviews publicly.
- Add an admin-only moderation page to approve or reject submitted reviews, protected by the existing account and role checks.
- Repair the existing route/build issue only as needed to make the new admin page and existing site work.

## Technical details
- Add one database table with length/rating/status constraints, anonymous pending-only submissions, public approved-only reads, and admin-only moderation policies.
- Reuse the existing `src/lib/data.ts` WhatsApp/Instagram settings, `wa.me` URL helper, contact buttons, and footer icons; leave them inactive until the owner supplies the real number and username.
- Add tests for review validation and pending-by-default behavior; verify database policies and the live page after implementation.
