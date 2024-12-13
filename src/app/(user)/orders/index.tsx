import { ActivityIndicator, FlatList, Platform, Text, View } from 'react-native'

import { useMyOrdersList } from '@/api/orders'
import OrdersListItem from '@/components/OrderListItem'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function MenuScreen() {
  const { data: orders, isLoading, error } = useMyOrdersList()
  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to fetch</Text>
  }
  return (
    <View>
      <Stack.Screen options={{ title: 'Orders' }} />

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

      <FlatList
        data={orders}
        renderItem={({ item }) => <OrdersListItem order={item} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
    </View>
  )
}
