import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://duebdkfvrfozmyejzmep.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1ZWJka2Z2cmZvem15ZWp6bWVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ2Mzg5MDIsImV4cCI6MjAzMDIxNDkwMn0.H3GTswL0-HHBRhjIRd0x--PeX8kJMeYG34t0A3820RA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
