# A Birthday Tribute — Next.js

A single-page animated tribute site. Same stack as the Sevven Star app:
**Next.js + Supabase + Vercel**, all on free tiers, deployed by pushing
to GitHub.

---

## What you're deploying

- Animated hero, a scroll-drawn timeline, a chaptered photo gallery with
  lightbox, a values section, a live wishes guestbook, and a confetti finale.
- The guestbook is powered by Supabase (one table). Everything else is static.

---

## Step 1 — Put it on GitHub

Same as you did for Sevven Star:

1. Create a new repo on GitHub (e.g. `papa-birthday`).
2. Drag this whole folder into GitHub Desktop (or `git init` / commit / push).
3. Commit to `main` and push.

> Don't commit `.env.local` — it's already in `.gitignore`. You'll set those
> values in Vercel instead (Step 3).

## Step 2 — Set up the Supabase table

1. In your Supabase project → **SQL Editor** → **New query**.
2. Paste everything from `supabase.sql` (in this folder) and click **Run**.
   That creates the `birthday_wishes` table. (RLS is left off, exactly like
   the Sevven Star project, so the anon key can read and insert.)
3. Go to **Project Settings → API** and copy:
   - the **Project URL**
   - the **anon public** key

## Step 3 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New → Project** → import
   your `papa-birthday` repo.
2. Before clicking Deploy, open **Environment Variables** and add these two:

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | your Project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your anon public key |

3. Click **Deploy**. In ~1 minute you'll get a live link like
   `papa-birthday.vercel.app`.

That's it. Every time you push to `main`, Vercel redeploys automatically —
same as Sevven Star.

---

## Running it on your computer first (optional)

```bash
npm install
cp .env.example .env.local     # then paste your Supabase values into .env.local
npm run dev                    # open http://localhost:3000
```

---

## Changing things

- **Photos:** add files to `public/images/`, then list them in
  `src/lib/photos.js` under the right chapter.
- **Timeline / values text:** all in `src/lib/content.js`.
- **Hero & section copy:** `src/app/page.js`.
- **Colours & fonts:** the tokens at the top of `src/app/globals.css`.

---

## Notes on the content

The timeline uses what's publicly documented about Inland World Logistics,
Enviiiro Wheels, and the family's background. Everything else is in the
family's own voice — edit any of it freely. It's your story.
