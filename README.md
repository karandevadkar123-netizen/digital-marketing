# RealtyAdMedia — Digital Marketing Website

Next.js (React) + Tailwind CSS + Framer Motion + Supabase. Same stack as the Emperia example.

## Run
1. `npm install`
2. Copy `.env.example` to `.env` and fill in your Supabase URL and secret key.
3. In Supabase → SQL Editor, run `supabase/schema.sql` (creates the `enquiries` table).
4. `npm run dev` → http://localhost:3000
5. Check the database connection at http://localhost:3000/api/health — it should show `"connected": true`.
6. Send a test enquiry from the form, then open Supabase → Table Editor → `enquiries` to see the new row.

## How the form saves data
`EnquiryForm.tsx` → `POST /api/enquiry` (`src/app/api/enquiry/route.ts`) → validates → inserts into Supabase `enquiries`.
The secret key stays on the server; the browser never talks to the database.

## Edit content
- Text: `src/components/*.tsx`
- 3D illustrations (pure CSS 3D, no images needed): `src/components/Scenes.tsx`
- Logo files: `public/logo-full.png`, `public/logo-mark.png`
