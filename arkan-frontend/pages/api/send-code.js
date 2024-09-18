let tempCodes = {}

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { phoneNumber, code } = req.body
    if (!code) {
      // Generate a new 4-digit code
      const newCode = Math.floor(1000 + Math.random() * 9000).toString()

      // Store the code in memory
      tempCodes[phoneNumber] = {
        code: newCode,
      }

      // Remove the code after 10 seconds
      setTimeout(
        () => {
          delete tempCodes[phoneNumber]
        },
        2 * 60 * 1000
      )

      // TODO Send the code via SMS (replace with your actual SMS service)
      // await sendSms(phoneNumber, newCode);
      console.log(` sendSms(${phoneNumber}, ${newCode})`)

      res.status(200).json({ message: 'Code sent' })
    } else {
      // Verify an existing code
      const tempCode = tempCodes[phoneNumber]

      if (tempCode && tempCode.code === code) {
        // Code is valid
        delete tempCodes[phoneNumber]
        res.status(200).json({ message: 'Code verified' })
      } else {
        // Code is invalid or expired
        res.status(403).json({ message: 'Invalid or expired code' })
      }
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}

export default handler
