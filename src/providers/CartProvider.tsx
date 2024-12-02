import { CartItem, Product } from '@/types'
import { randomUUID } from 'expo-crypto'
import { createContext, PropsWithChildren, useContext, useState } from 'react'
type CartType = {
  items: CartItem[]
  addItem: (product: Product, size: CartItem['size']) => void
  updateQuantity: (itemId: string, amount: -1 | 1) => void
  total: number
}

export const CartContext = createContext({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0
} as CartType)

const CartProvider = ({ children }: PropsWithChildren<{}>) => {
  const [items, setItems] = useState<CartItem[]>([])

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
  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider

export const useCart = () => useContext(CartContext)
