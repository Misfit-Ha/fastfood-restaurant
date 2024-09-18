import { API_URL } from '../../config/index'

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ message: `Method ${req.method} not allowed` })
  }

  const { phonenumber } = req.body

  const strapiRes = await fetch(
    `${API_URL}/api/users?filters[email][$eq]=${phonenumber}@phonenumber.com`,
    {
      method: 'GET',
    }
  )

  if (!strapiRes.ok) {
    return res.status(403).json({ message: 'User forbidden' })
  }

  const user = await strapiRes.json()

  if (user.length === 0) {
    // Return registered as false when phone number is not found
    return res
      .status(200)
      .json({ isRegistered: false, message: 'Phone number not found' })
  }

  // Return the registration status and quick registration status
  let message = 'User is registered'
  if (user[0].usedQuickRegister) {
    message += ' using Quick Register'
  }
  return res.status(200).json({
    isRegistered: true,
    usedQuickRegistered: user[0].usedQuickRegister,
    userID: user[0].id,
    message,
  })
}

export default handler
