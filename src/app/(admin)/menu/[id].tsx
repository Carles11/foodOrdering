import { useProduct } from '@/api/products'
import RemoteImage from '@/components/RemoteImage'

import Colors from '@/constants/Colors'
import { defaultPizzaImage } from '@/constants/Helpers'
import { useCart } from '@/providers/CartProvider'
import { PizzaSize } from '@/types'
import { FontAwesome } from '@expo/vector-icons'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams()

  const id = parseFloat(typeof idString === 'string' ? idString : idString[0])

  const { data: product, error, isLoading } = useProduct(id)

  const { addItem } = useCart()

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')
  const router = useRouter()

  const addToCard = () => {
    if (!product) return
    addItem(product, selectedSize)
    router.push('/cart')
  }

  if (!product) {
    return <Text>Product not found</Text>
  }
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Menu',
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          )
        }}
      />
      <Stack.Screen options={{ title: product?.name }} />
      <RemoteImage
        path={product?.image}
        fallback={defaultPizzaImage}
        style={styles.image}
      />

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    flex: 1
  },

  price: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  image: { width: '100%', aspectRatio: 1 },
  title: { fontSize: 20, fontWeight: 'bold' }
})

export default ProductDetailsScreen
