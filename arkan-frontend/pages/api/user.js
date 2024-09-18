import cookie from 'cookie'
import { API_URL } from '../../config/index'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    if (!req.headers.cookie) {
      res.status(200).json({ message: 'Not logged in' })
      return
    }

    const { token } = cookie.parse(req.headers.cookie)

    const strapiRes = await fetch(
      `${API_URL}/api/users/me?populate=orders,addresses`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    const user = await strapiRes.json()

    if (strapiRes.ok) {
      res.status(200).json({ user })
    } else {
      res.status(200).json({ message: 'Not logged in' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
export default handler
