import React, { createContext, useState } from 'react'

const LoginContext = createContext()

function LoginProvider({ children }) {
  const [form, setForm] = useState('verification')
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleSubmit = (nextForm) => {
    setForm(nextForm)
  }

  return (
    <LoginContext.Provider
      value={{ form, handleSubmit, phoneNumber, setPhoneNumber }}
    >
      {children}
    </LoginContext.Provider>
  )
}

export { LoginContext, LoginProvider }
