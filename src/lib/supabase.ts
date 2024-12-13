import { Database } from '@/database.types'
import { createClient } from '@supabase/supabase-js'
import * as SecureStore from 'expo-secure-store'
import 'react-native-url-polyfill/auto'

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key)
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value)
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key)
  }
}

const supabaseUrl = 'https://wcclwmlpgcxntpioxuuy.supabase.co'
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjY2x3bWxwZ2N4bnRwaW94dXV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3MDQxMDksImV4cCI6MjA0ODI4MDEwOX0.smgo0D7-HNOLGHPujhsye1S8zNl2VVBptJnzhUbDdbk'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
})
