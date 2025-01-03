import { supabase } from '@/lib/supabase'
import { useRouter } from 'expo-router'
import { Text, View } from 'react-native'
import { Button } from 'react-native-elements'

export default function ProfileScreen() {
  const router = useRouter()

  const logOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/sign-in')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <View style={{ marginTop: 22 }}>
      <Text style={{ marginTop: 22 }}>
        Are you done? Click here to sign out.
      </Text>
      <View style={{ marginTop: 22, marginHorizontal: 66 }}>
        <Button title="Sign out" onPress={logOut} />
      </View>
    </View>
  )
}
