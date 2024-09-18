//https://stackoverflow.com/questions/72961647/how-to-implement-a-uselocalstorage-hook-in-next-js
import { useDebugValue, useEffect, useState } from 'react'

export default function useLocalStorage(key, initialState) {
  const [state, setState] = useState(initialState)
  useDebugValue(state)

  useEffect(() => {
    const item = localStorage.getItem(key)
    if (item) setState(parse(item))
  }, [])

  useEffect(() => {
    if (state !== initialState) {
      localStorage.setItem(key, JSON.stringify(state))
    }
  }, [state])

  return [state, setState]
}

const parse = (value) => {
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}
