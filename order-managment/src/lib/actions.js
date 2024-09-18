'use server'

import { signIn, signOut } from '../auth'
import { AuthError } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { updateOrderState } from './data'

export async function authenticate(prevState, formData) {
  console.log(formData)
  formData.append('redirectTo', '/dashboard')

  console.log(formData)

  try {
    await signIn('credentials', formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}

export async function logout() {
  try {
    await signOut({ redirectTo: '/login' })
  } catch (error) {
    console.error('Failed to sign out:', error)
    throw new Error('Failed to sign out.')
  }
}

export async function signout() {
  await signOut({ redirectTo: '/login' })
}

export default async function updateOrderStateRevalidate(id, newState) {
  updateOrderState(id, newState)
  revalidatePath('/dashboard')
  revalidatePath('/dashboard/new')
}
