import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kjiealevqywkdotnqxmo.supabase.co";
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqaWVhbGV2cXl3a2RvdG5xeG1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM4ODU1MjQsImV4cCI6MjAxOTQ2MTUyNH0.1Mmy16xQel-PS3oCvow0f-h0be9gwst2pvwssz7-vbM`;

export const supabase = createClient(supabaseUrl, supabaseKey);
