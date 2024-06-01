import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://qlumhjkpinjldwuxvned.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsdW1oamtwaW5qbGR3dXh2bmVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYxNjE4OTksImV4cCI6MjAzMTczNzg5OX0.kIuf-TP5kfcIdEdSQtlZ9CYxvjC69o2JCIUrZDgEfTA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
