//auth.js
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { z } from 'zod'
import { authConfig } from './auth.config'

const user = {
  email: process.env.USER_EMAIL,
  password: process.env.USER_PASSWORD,
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data

          if (email === user.email) {
            if (
              user.password.startsWith('$2b$') ||
              user.password.startsWith('$2a$')
            ) {
              if (await bcrypt.compare(password, user.password)) {
                return user
              }
            } else {
              if (password === user.password) {
                return user
              }
            }
          }
        }

        console.log('Invalid credentials')
        return null
      },
    }),
  ],
})
