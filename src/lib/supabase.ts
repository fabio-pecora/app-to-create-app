
import { createClient } from '@supabase/supabase-js';
const url = process.env.EXPO_PUBLIC_SUPABASE_URL as string | undefined;
const key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string | undefined;
export const supabase = url && key ? createClient(url, key) : ({} as any);
