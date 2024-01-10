import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://wolupkvdthazyreosnrf.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvbHVwa3ZkdGhhenlyZW9zbnJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgzODEzMzEsImV4cCI6MjAxMzk1NzMzMX0.-KRL-6dUwEPUhRnfNA6GtJ1g4DTExoz3zbIVO4-7GBQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
