import { Text, View } from '@/components/Themed'
import Colors from '@/constants/Colors'
import { Product } from '@/types'
import { Image, StyleSheet } from 'react-native'

type ProdcutListItemProps = {
  product: Product
}

const defaultPizzaImage =
  'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

const ProductListItem = ({ product }: ProdcutListItemProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
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
