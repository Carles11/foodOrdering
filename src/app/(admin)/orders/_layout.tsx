import { Stack } from 'expo-router'

export default function OrdersStack() {
  return (
    <Stack>
      <Stack.Screen name="list" options={{ headerShown: false }} />
    </Stack>
  )
}
