## Project description

A platform that lets users upload maps, place and describe custom markers, and browse a searchable archive of all their mapped worlds.

Those are the main features:

- Load a map as image (png, jpg and jpeg)
- Put some markers on the map
- Give a title and descriptions each marker
- Open and read a map from archive with all relative markers
- Download pdf with map and marker descriptors

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Environment variables

- **Local file:** create a file named `.env.local` at the project root for local-only variables. This repository's `.gitignore` already ignores `.env*` files.
- **Client vs Server:** variables that need to be available in browser code must be prefixed with `NEXT_PUBLIC_`. Example: `NEXT_PUBLIC_APP_NAME`.
- **Accessing variables:** in server code use `process.env.DATABASE_URL`. In client or shared code use `process.env.NEXT_PUBLIC_APP_NAME` or the helper below.

Example helper is provided at `src/lib/env.ts`:

```ts
import { clientEnv } from "./src/lib/env";

console.log(clientEnv.APP_NAME); // available on client
```

Add your local values to `.env.local` like:

```
NEXT_PUBLIC_APP_NAME=MapForge

# Supabase credentials
SUPABASE_URL=https://xxxxxxxxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE=supabase_service_role_key
SUPABASE_MAP_BUCKET=supabase_map_image_bucket
```

## BACKLOG

- Insert a link componente to navigate to the map view after upload
- Display marker titles directly on the map in exported PDFs
- Improve the home page with a short introduction and usage explanation
