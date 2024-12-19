import { useProduct } from '@/api/products'
import Button from '@/components/Button'
import RemoteImage from '@/components/RemoteImage'
import { defaultPizzaImage } from '@/constants/Helpers'
import { useCart } from '@/providers/CartProvider'
import { PizzaSize } from '@/types'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams()

  const id = parseFloat(typeof idString === 'string' ? idString : idString?.[0])

  const { data: product, error, isLoading } = useProduct(id)

  const { addItem } = useCart()

  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')
  const router = useRouter()

  const addToCard = () => {
    if (!product) return
    addItem(product, selectedSize)
    router.push('/cart')
  }

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>{error.message}</Text>
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />
      <RemoteImage
        path={product?.image}
        fallback={defaultPizzaImage}
        style={styles.image}
      />
      <Text>Select size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => {
              setSelectedSize(size)
            }}
            style={[styles.size, selectedSize === size && styles.selectedSize]}
            key={size}
          >
            <Text
              style={[
                styles.sizesText,
                selectedSize === size && styles.selectedTextColor
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
      {product && <Text style={styles.price}>${product.price}</Text>}
      <Button text="Add to card" onPress={addToCard} />
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
    fontWeight: 'bold',
    marginTop: 'auto'
  },
  image: { width: '100%', aspectRatio: 1 },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10
  },
  size: {
    backgroundColor: 'white',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectedSize: {
    backgroundColor: 'gainsboro'
  },
  sizesText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10
  },
  selectedTextColor: {
    color: 'white'
  }
})

export default ProductDetailsScreen
