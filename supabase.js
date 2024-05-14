import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://duebdkfvrfozmyejzmep.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1ZWJka2Z2cmZvem15ZWp6bWVwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNDYzODkwMiwiZXhwIjoyMDMwMjE0OTAyfQ.urs6EowuoH7IF9-N6GRnI4BLKI4uMNlkGfYqN-Axivc';

export const supabase = createClient(supabaseUrl, supabaseKey);
