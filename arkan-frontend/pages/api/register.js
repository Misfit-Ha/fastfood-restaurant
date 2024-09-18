import { API_URL } from '../../config/index'
import cookie from 'cookie'

const handler = async (req, res) => {
  const { method, body } = req
  if (method === 'POST') {
    try {
      const response = await sendRegistrationRequest(body)
      await handleResponse(response, res)
    } catch (error) {
      console.error('Error:', error)
      res.status(503).json({ message: 'Service Unavailable' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${method} not allowed` })
  }
}

export default handler

const sendRegistrationRequest = async (body) => {
  const { email, username, password, usedQuickRegister } = body
  try {
    const response = await fetch(`${API_URL}/api/auth/local/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password: usedQuickRegister ? process.env.QUICK_PASS_KEY : password,
        usedQuickRegister,
      }),
    })
    return response
  } catch (error) {
    console.error('Network error:', error)
    throw error // throw the error to be caught in the calling function
  }
}

const handleResponse = async (response, res) => {
  try {
    const data = await response.json()
    if (response.ok) {
      setCookie(data.jwt, res)
      res.status(200).json({ user: data.user })
    } else {
      res.status(data.error.status).json({ message: data.error.message })
    }
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Internal Server Error' }) // send a 500 Internal Server Error response if an error occurs
  }
}

const setCookie = (token, res) => {
  try {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        sameSite: 'strict',
        path: '/',
      })
    )
  } catch (error) {
    console.error('Error:', error)
    throw error // throw the error to be caught in the calling function
  }
}
