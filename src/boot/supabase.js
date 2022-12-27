import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ijnskfxwojgwtvhgxlkv.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqbnNrZnh3b2pnd3R2aGd4bGt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzE5OTcyNjUsImV4cCI6MTk4NzU3MzI2NX0.ArgIjoRTxl_1m0loa-tA9ANY9fbnBTvp1G1PszbW_Wc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
