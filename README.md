#  Clinic Management System (PMS) — Supabase Edition

A **staff-only PMS (Patient Management System)** that replaces paper records and Excel sheets for dental clinics. **Receptionists** and **doctors** manage **patients** and **appointments** from one dashboard.

![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js) ![React](https://img.shields.io/badge/React-20232A?logo=react) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwind-css) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black) ![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=white)

**Live demo:** [clinic-webapp-supabase.vercel.app](https://clinic-webapp-supabase.vercel.app/)

This is the **Supabase** version — real accounts and a shared Postgres database. For the simpler version with no backend, see the [main branch](https://github.com/omarahmed321/myfinaldentistproject) ([live demo](https://clinic-saas-webapp.vercel.app/login)).

---

## Table of Contents

- [About](#about)
- [Data Storage](#data-storage)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Run Locally](#run-locally)
- [Project Structure](#project-structure)

---

## About

Small dental clinics often manage patients and appointments on paper or in Excel, which leads to lost files, double bookings, and no easy way to search a patient's history. This app gives the front desk one simple place to do all of that, backed by a real database instead of the browser.

## Data Storage

This version replaces local storage with **Supabase**: a hosted Postgres database plus real authentication. Each doctor signs up with an email and password, and **Row Level Security (RLS)** on the `patients` and `appointments` tables makes sure a doctor only ever sees their own data — enforced by the database itself, not just the app code. Auth state is checked in Next.js middleware before any page loads, so the same route protection from the local storage version still applies here.

![Database schema](screenshots/db-schema.png)

> The `patients` and `appointments` tables live in Postgres and are filtered per-doctor by **Row Level Security**. `auth.users` is managed by Supabase Auth. Schema inferred from the queries in `storage.js` — there are no migration files in the repo.

## Features

- **Login / Sign Up:** real email and password accounts via Supabase Auth, plus **Sign in with Google (OAuth)**
- **Email confirmation** flow with a "check your inbox" screen, and a duplicate-email guard
- **Onboarding:** Google users are asked once for their clinic name before entering the dashboard
- **Dashboard:** today's appointments load with **incremental (infinite) scroll** — an `IntersectionObserver` watches a sentinel element and loads 5 more at a time as you scroll
- **Patients List:** live search by name or phone, filter tabs by status, classic pagination (kept here deliberately — infinite scroll is dashboard-only)
- **Add / Edit Patient:** name, phone, age, gender, and a **note** field (for allergies or medical conditions), validated with clear Arabic error messages
- **Patient Details:** full record view, medical note shown as a highlighted warning banner
- **Appointments:** book and view appointments by date and time, with double-booking prevention
- **Toast notifications** for saving, errors, and validation feedback
- **Skeleton loading states** instead of blank screens while data loads
- **Smooth scrolling** across the app via Lenis
- **Installable as an app (PWA):** manifest, app icons, and Android TWA support
- **Fully RTL** layout throughout

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org)
- **UI:** React + [Tailwind CSS](https://tailwindcss.com)
- **Language:** JavaScript
- **Backend:** [Supabase](https://supabase.com) — Postgres, Auth, Row Level Security (via `@supabase/supabase-js` and `@supabase/ssr`)
- **Forms:** [Formik](https://formik.org) + [Yup](https://github.com/jquense/yup)
- **Icons:** [Lucide React](https://lucide.dev)
- **Notifications:** [React Hot Toast](https://react-hot-toast.com)
- **Smooth scrolling:** [Lenis](https://lenis.darkroom.engineering)
- **PWA:** installable app with manifest, icons, and Android TWA support
- **Linting/formatting:** ESLint + Prettier

## Run Locally

### Prerequisites

- Node.js installed
- npm (or yarn / pnpm / bun)
- A Supabase project (free tier works), for its URL and public key

### Installation

```bash
# clone the repo and switch to the supabase branch
git clone https://github.com/omarahmed321/myfinaldentistproject.git
cd myfinaldentistproject
git checkout supabase

# install dependencies
npm install
```

Create a `.env.local` file in the project root with your own Supabase project values:

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-public-key
```

```bash
# run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see it running.

## Project Structure

```
myfinaldentistproject/ (supabase branch)
├── public/
│   ├── icons/               # PWA app icons
│   ├── manifest.json        # PWA manifest (installable app)
│   └── .well-known/         # Android TWA verification
├── src/
│   ├── app/
│   │   ├── (dashboard)/
│   │   │   ├── addpatient/     # add / edit patient form
│   │   │   ├── appointments/   # weekly appointments view
│   │   │   ├── patientdetail/  # single patient view + booking
│   │   │   ├── patients/       # patients list
│   │   │   ├── layout.jsx      # dashboard layout (nav + sidebar)
│   │   │   └── page.jsx        # dashboard home (incremental scroll)
│   │   ├── auth/callback/      # OAuth callback (exchanges code for session)
│   │   ├── onboarding/         # clinic-name step for Google users
│   │   ├── login/
│   │   ├── signup/
│   │   └── layout.tsx          # root layout, mounts SmoothScroll
│   ├── components/
│   │   ├── SmoothScroll.jsx    # Lenis smooth scroll, mounted app-wide
│   │   └── ...                 # NavBar, SideBar, and other shared UI
│   └── utils/
│       ├── storage.js          # Supabase queries (patients, appointments, auth)
│       ├── supabase/
│       │   ├── client.js       # browser Supabase client
│       │   └── server.js       # server-side Supabase client
│       └── pagenation.js
├── src/proxy.js                # middleware, checks Supabase auth session
├── package.json
└── tsconfig.json
```
