import { useRouter } from 'next/router'
import { createContext, useEffect, useState } from 'react'

const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]) // {id, qty}

  const router = useRouter()

  // get item quantity - returns number
  const getItemQuantity = (id) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0
  }

  //increase cart quantity - returns void
  const increaseCartQuantity = (id) => {
    setCartItems((currItems) => {
      //if item does not exist in cart
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }]
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

  //increase quantity - returns void
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

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}

export default ShoppingCartContext
