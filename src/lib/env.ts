/**
 * Centralized environment helpers.
 * - `NEXT_PUBLIC_` prefixed variables are safe to use in client code.
 * - Server-only variables (like `DATABASE_URL`) must NOT use the `NEXT_PUBLIC_` prefix.
 *
 * Import helpers where you need typed access to env values.
 */

export const clientEnv = {
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME ?? "MapForge",
  // add more NEXT_PUBLIC_ variables here as needed
};

export const supabaseCredential = {
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ?? "",
  SUPABASE_ID: process.env.SUPABASE_ID ?? "",
  SUPABASE_URL: process.env.SUPABASE_URL ?? "",
  SUPABASE_PUBLISHABLE_KEY: process.env.SUPABASE_PUBLISHABLE_KEY ?? "",
  SUPABASE_SERVICE_ROLE: process.env.SUPABASE_SERVICE_ROLE ?? "",
  SUPABASE_MAP_BUCKET: process.env.SUPABASE_MAP_BUCKET ?? "",
};

export type ClientEnv = typeof clientEnv;
