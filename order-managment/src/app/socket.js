'use client'

import { io } from 'socket.io-client'
const SERVER_URL = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:1337'

export const socket = io(SERVER_URL, {
  auth: {
    strategy: 'apiToken',
    token: process.env.NEXT_PUBLIC_TOKEN,
  },
})
