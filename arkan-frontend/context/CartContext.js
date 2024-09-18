import { useRouter } from 'next/router'
import { createContext, useEffect, useState } from 'react'
import { NEXT_URL } from '../config/index'
import useLocalStorage from '../hooks/useLocalStorage'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage('cart-storage', []) // {id, qty title, price }

  const router = useRouter()

  // get item quantity - returns number
  const getItemQuantity = (id) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0
  }
  //increase cart quantity - returns void
  const increaseCartQuantity = (
    id,
    title,
    price,
    discount,
    priceWithDiscount
  ) => {
    setCartItems((currItems) => {
      //if item does not exist in cart
      if (currItems.find((item) => item.id === id) == null) {
        return [
          ...currItems,
          { id, title, price, quantity: 1, discount, priceWithDiscount },
        ]
      } else {
        //else maps over items and increase quantity of the item
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  //dcrease quantity - returns void
  const decreaseCartQuantity = (id) => {
    setCartItems((currItems) => {
      //if item does not exist in cart
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id)
      } else {
        //else maps over items and increase quantity of the item
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  // remove from quantity - returns void
  const removeFromCart = (id) => {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id)
    })
  }

  const getNumberOfItems = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  const totalInLatin = cartItems.reduce(
    (priceWithDiscount, item) =>
      item.priceWithDiscount * item.quantity + priceWithDiscount,
    0
  )

  const placeOrder = () => {}

  const resetCart = () => {
    setCartItems((currItems) => (currItems = []))
  }

  return (
    <CartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        getNumberOfItems,
        cartItems,
        totalInLatin,
        placeOrder,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContext
