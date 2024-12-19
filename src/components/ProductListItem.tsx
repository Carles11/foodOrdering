import { Text } from '@/components/Themed'
import Colors from '@/constants/Colors'
import { defaultPizzaImage } from '@/constants/Helpers'
import { Tables } from '@/types'
import { Link, useSegments } from 'expo-router'
import { Pressable, StyleSheet } from 'react-native'

import RemoteImage from './RemoteImage'

type ProdcutListItemProps = {
  product: Tables<'products'>
}

const ProductListItem = ({ product }: ProdcutListItemProps) => {
  // const segments = useSegments()

  return (
    <Link href={`./menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <RemoteImage
          path={product.image}
          fallback={defaultPizzaImage}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text>Go to details</Text>
      </Pressable>
    </Link>
  )
}

export default ProductListItem

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    flex: 1,
    maxWidth: '50%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold'
  },
  image: { width: '100%', aspectRatio: 1 }
})
