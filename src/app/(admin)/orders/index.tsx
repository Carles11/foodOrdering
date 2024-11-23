import { FlatList, Platform, View } from 'react-native'

import orders from '@/assets/data/orders'
import OrdersListItem from '@/components/OrderListItem'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function MenuScreen() {
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
