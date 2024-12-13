import { ActivityIndicator, FlatList, Platform, Text, View } from 'react-native'

import { useAdminOrdersList } from '@/api/orders'
import OrdersListItem from '@/components/OrderListItem'
import { StatusBar } from 'expo-status-bar'

export default function OrdersScreen() {
  const {
    data: orders,
    isLoading,
    error
  } = useAdminOrdersList({ archived: false })

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to fetch</Text>
  }

  return (
    <View>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

      <FlatList
        data={orders}
        renderItem={({ item }) => <OrdersListItem order={item} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
    </View>
  )
}
