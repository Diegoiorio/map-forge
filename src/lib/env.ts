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

export const serverEnv = {
  DATABASE_URL: process.env.DATABASE_URL ?? "",
  API_KEY: process.env.API_KEY ?? "",
};

export type ClientEnv = typeof clientEnv;
export type ServerEnv = typeof serverEnv;
