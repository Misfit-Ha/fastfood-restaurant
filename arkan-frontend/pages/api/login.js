import { API_URL } from '../../config/index'
import cookie from 'cookie'

const handler = async (req, res) => {
  const { method, body } = req
  if (method === 'POST') {
    try {
      const response = await sendLoginRequest(body)
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

const sendLoginRequest = async (body) => {
  const { identifier, password, usedQuickRegister } = body
  try {
    const response = await fetch(`${API_URL}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier,
        password: usedQuickRegister ? process.env.QUICK_PASS_KEY : password,
      }),
    })
    return response
  } catch (error) {
    console.error('Network error:', error)
    throw error
  }
}

const handleResponse = async (response, res) => {
  const data = await response.json()
  if (response.ok) {
    setCookie(data.jwt, res)
    res.status(200).json({ user: data.user })
  } else {
    res.status(data.error.status).json({ message: data.error.message })
  }
}

const setCookie = (token, res) => {
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
}
