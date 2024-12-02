import { ActivityIndicator, FlatList, Platform, Text, View } from 'react-native'

import ProductListItem from '@/components/ProductListItem'

import { useProductList } from '@/app/api/products'
import { StatusBar } from 'expo-status-bar'

export default function MenuScreen() {
  const { products, error, isLoading } = useProductList()

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>{error.message}</Text>
  }

  return (
    <View>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />

      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10, justifyContent: 'space-between' }}
      />
    </View>
  )
}
