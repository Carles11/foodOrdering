import { useInsertOrder } from '@/api/orders'
import { CartItem, Tables } from '@/types'
import { randomUUID } from 'expo-crypto'
import { useRouter } from 'expo-router'
import { createContext, PropsWithChildren, useContext, useState } from 'react'

type Product = Tables<'products'>

type CartType = {
  items: CartItem[]
  addItem: (product: Product, size: CartItem['size']) => void
  updateQuantity: (itemId: string, amount: -1 | 1) => void
  total: number
  checkout: () => void
}

export const CartContext = createContext({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {}
} as CartType)

const CartProvider = ({ children }: PropsWithChildren<{}>) => {
  const [items, setItems] = useState<CartItem[]>([])

  const { mutate: inserOrder } = useInsertOrder()

  const router = useRouter()
  const addItem = (product: Product, size: CartItem['size']) => {
    // if already in cart increase quantity
    const existingItem = items.find(
      (item) => item.product === product && item.size === size
    )
    if (existingItem) {
      updateQuantity(existingItem.id, 1)
      return
    }

    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1
    }
    setItems([newCartItem, ...items])
  }

  // update quantity
  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    setItems(
      items
        .map((item) => {
          return item.id !== itemId
            ? item
            : { ...item, quantity: item.quantity + amount }
        })
        .filter((item) => item.quantity > 0)
    )
  }
  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  )

  const clearCart = () => {
    setItems([])
  }

  const checkout = () => {
    // call api to create order
    inserOrder(
      { total },
      {
        onSuccess: (data) => {
          clearCart()
          router.push(`/(user)/orders/${data.id}`)
        }
      }
    )
  }
  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, total, checkout }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider

export const useCart = () => useContext(CartContext)
