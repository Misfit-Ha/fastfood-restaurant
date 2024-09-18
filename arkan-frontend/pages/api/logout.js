import cookie from 'cookie'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      // Destroy cookie
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', '', {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          expires: new Date(0),
          sameSite: 'strict',
          path: '/',
        })
      )

      res.status(200).json({ message: 'Success' })
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ message: 'Internal Server Error' }) // send a 500 Internal Server Error response if an error occurs
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
export default handler
