import Button from '@/components/Button'
import { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

const SignUp = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
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
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="First name"
      />
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Last name"
      />
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
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Text style={styles.loading}>{loading ? 'Loading...' : ''}</Text>
      <Button onPress={handleSubmit} text="Sign up!" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16
  },
  input: {
    height: 40,
    borderColor: 'gainsboro',
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8
  },
  error: {
    color: 'tomato',
    marginBottom: 12
  },
  loading: {
    marginBottom: 12
  }
})

export default SignUp
