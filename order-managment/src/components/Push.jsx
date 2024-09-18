'use client'

import { subscribePush } from '@/lib/data'
import { useEffect } from 'react'

export default function Push() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((reg) => subscribePush(reg))
        .catch((err) =>
          console.error('Service Worker registration failed:', err)
        )
    }
  }, [])

  return <>Push</>
}
