import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="sign-in/index"
        options={{ headerShown: true, title: 'Identify yourself!' }}
      />
      <Stack.Screen
        name="sign-up/index"
        options={{ headerShown: true, title: 'Identify yourself!' }}
      />
    </Stack>
  )
}

export default AuthLayout
