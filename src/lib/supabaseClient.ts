import { supabaseCredential } from "@/lib/env";
import { createClient } from "@supabase/supabase-js";

// Create supabase client
export const supabaseClient = createClient(
  supabaseCredential.SUPABASE_URL,
  supabaseCredential.SUPABASE_SERVICE_ROLE,
  { auth: { persistSession: false } }
);
