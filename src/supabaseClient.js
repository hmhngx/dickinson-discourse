import { createClient } from '@supabase/supabase-js';

console.log('REACT_APP_SUPABASE_URL:', process.env.REACT_APP_SUPABASE_URL);
console.log('REACT_APP_SUPABASE_KEY:', process.env.REACT_APP_SUPABASE_KEY);

const supabaseUrl = "https://nyskmpwkfqtkphgwplrw.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55c2ttcHdrZnF0a3BoZ3dwbHJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyOTE1NTksImV4cCI6MjA2MDg2NzU1OX0.WO8Pplql5tq7FHk8Xr5ZokKvr_BXmSU8-vA6HTvaGNA";

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Supabase URL and Key are required. Check your .env file for REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_KEY.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);