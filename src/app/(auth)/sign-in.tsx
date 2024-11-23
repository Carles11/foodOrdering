import Button from '@/components/Button'
import Colors from '@/constants/Colors'
import { Link, Stack } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      // await signIn({ email, password })
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unknown error occurred')
      }
    }
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Sign In' }} />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      <Text>{loading ? 'Loading...' : ''}</Text>
      <Button onPress={handleSubmit} text="Sign in" />
      <Link href="/(auth)/sign-up/" style={styles.link}>
        Go to register!
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff'
  },
  input: {
    height: 40,
    borderColor: 'gainsboro',
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8
  },
  errorText: {
    color: 'red',
    marginBottom: 12
  },
  link: {
    color: Colors.light.tint,
    marginTop: 12,
    textDecorationLine: 'underline',
    textAlign: 'center'
  }
})

export default SignIn
