import Button from '@/components/Button'
import CartListItem from '@/components/CartListItem'
import { useCart } from '@/providers/CartProvider'
import { FlatList, StyleSheet, Text, View } from 'react-native'

const CartScreen = () => {
  const { items, total } = useCart()
  return (
    <View style={styles.container}>
      <Text>Cart items length: {items.length}</Text>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />
      <Text style={{ fontSize: 20, fontWeight: 500 }}>Total: ${total}</Text>
      <Button text="Checkout" onPress={() => {}} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '10%', // Start from 20% down
    backgroundColor: 'white',

    overflow: 'hidden',
    paddingLeft: 20
  }
})
export default CartScreen
