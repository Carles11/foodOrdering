import products from '@/assets/data/products'
import Button from '@/components/Button'
import { defaultPizzaImage } from '@/constants/Helpers'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
const sizes = ['S', 'M', 'L', 'XL']

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams()

  const [selectedSize, setSelectedSize] = useState('M')

  const product = products.find((p) => p.id.toString() === id)

  const addToCard = () => {
    console.warn('Adding to card', product?.name, selectedSize)
  }

  if (!product) {
    return <Text>Product not found</Text>
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />
      <Image
        source={{ uri: product?.image || defaultPizzaImage }}
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
      <Text style={styles.price}>${product.price}</Text>
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
