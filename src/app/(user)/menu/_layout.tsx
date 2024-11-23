import Colors from '@/constants/Colors'
import { FontAwesome } from '@expo/vector-icons'
import { Link, Stack } from 'expo-router'
import { Pressable, useColorScheme } from 'react-native'

export default function MenuStack() {
  const colorScheme = useColorScheme()

  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <Link href="/cart" asChild>
            <Pressable hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              {({ pressed }) => (
                <FontAwesome
                  name="shopping-cart"
                  size={25}
                  color={Colors.light.tint}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        )
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Menu' }} />
    </Stack>
  )
}