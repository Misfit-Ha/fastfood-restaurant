import cookie from 'cookie'
import { API_URL } from '../../config/index'

const handler = async (req, res) => {
  const { username, email, password, usedQuickRegister, addresses } = req.body
  if (req.method === 'PUT') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not Authorized' })
      return
    }

    const { token } = cookie.parse(req.headers.cookie)

    let updateData = {}

    if (username) updateData.username = username
    if (email) updateData.email = email
    if (password) updateData.password = password
    if (addresses) updateData.addresses = addresses
    if (usedQuickRegister !== undefined) {
      updateData.usedQuickRegister = usedQuickRegister
    }
    console.log('updateData')
    console.log(updateData)

    try {
      const strapiRes = await fetch(`${API_URL}/api/update-user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      })

      const user = await strapiRes.json()

      if (strapiRes.ok) {
        res.status(200).json({ user })
      } else {
        res.status(403).json({ message: `User forbidden` })
      }
    } catch (error) {
      res.status(503).json({ message: `Service Unavailable` })
    }
  } else {
    res.setHeader('Allow', ['PUT'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
export default handler
