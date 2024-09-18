import { createContext, useEffect, useState } from 'react'

const CheckoutContex = createContext()

export const CheckoutProvider = ({ children }) => {
  return (
    <CheckoutContex.Provider value={{}}>{children}</CheckoutContex.Provider>
  )
}

export default CheckoutContex
