import Button from '@/components/Button'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/providers/AuthProvider'
import { Link, Redirect } from 'expo-router'
import { ActivityIndicator, View } from 'react-native'

const index = () => {
  const { session, loading } = useAuth()
  console.log({ loading, session })

  if (loading) {
    return <ActivityIndicator />
  }
  if (!session) {
    console.log('user is NOT logged in')
    return <Redirect href="/sign-in" />
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/(user)'} asChild>
        <Button text="User" />
      </Link>
      <Link href={'/(admin)'} asChild>
        <Button text="Admin" />
      </Link>
      <Link href={'/sign-in'} asChild>
        <Button text="Sign in" />
      </Link>
      <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
    </View>
  )
}

export default index
