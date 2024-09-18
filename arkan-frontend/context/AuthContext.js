import { useRouter } from 'next/router'
import { createContext, useEffect, useState } from 'react'
import { API_URL, NEXT_URL } from '../config/index'

const translateError = (message) => {
  switch (message) {
    case 'Invalid identifier or password':
      return 'شماره موبایل یا پسورد اشتباه بود'
    case 'Auth.form.error.blocked':
      return 'حساب شما توسط مدیر مسدود شده است.'
    case 'Auth.form.error.code.provide':
      return 'کد ارائه شده نادرست است.'
    case 'Auth.form.error.confirmed':
      return 'ایمیل حساب شما تأیید نشده است.'
    case 'Auth.form.error.email.invalid':
      return 'این ایمیل نامعتبر است.'
    case 'Auth.form.error.email.provide':
      return 'لطفاً نام کاربری یا ایمیل خود را ارائه دهید.'
    case 'Auth.form.error.email.taken':
      return 'ایمیل قبلاً گرفته شده است.'
    case 'Auth.form.error.invalid':
      return 'شناسه یا رمز عبور نامعتبر است.'
    case 'Auth.form.error.noAdminAccess':
      return 'شما نمی توانید به پنل مدیریت دسترسی داشته باشید.'
    case 'Auth.form.error.params.provide':
      return 'پارامترهای ارائه شده نادرست هستند.'
    case 'Auth.form.error.password.format':
      return 'رمز عبور شما نمی تواند نماد `$` را بیش از سه بار داشته باشد.'
    case 'Auth.form.error.password.local':
      return 'این کاربر هرگز رمز عبور محلی تنظیم نکرده است، لطفاً از طریق ارائه دهنده استفاده شده در هنگام ایجاد حساب وارد شوید.'
    case 'Auth.form.error.password.matching':
      return 'رمزهای عبور مطابقت ندارند.'
    case 'Auth.form.error.password.provide':
      return 'لطفاً رمز عبور خود را ارائه دهید.'
    case 'Auth.form.error.ratelimit':
      return 'تلاش های زیادی انجام شده است، لطفاً یک دقیقه دیگر دوباره امتحان کنید.'
    case 'Auth.form.error.user.not-exist':
      return 'این ایمیل وجود ندارد.'
    case 'Auth.form.error.username.taken':
      return 'نام کاربری قبلاً گرفته شده است.'
    default:
      return message
  }
}

// Create a context for authentication
const AuthContext = createContext()

// Provide authentication context to children components
export const AuthProvider = ({ children }) => {
  // States from AuthContext
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userID, setUserID] = useState(null)

  // States from LoginContext
  const [form, setForm] = useState('login')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [forgotPass, setForgotPass] = useState(false)

  const [hasQuickRegistered, setHasQuickRegistered] = useState(false)
  const [isRegistered, setIsRegistered] = useState(null)

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const darkModeMediaQuery = window.matchMedia(
        '(prefers-color-scheme: dark)'
      )
      const isSystemDarkMode = darkModeMediaQuery.matches
      const isDarkMode =
        window.localStorage.isDarkMode === 'true' ||
        (!('isDarkMode' in window.localStorage) && isSystemDarkMode)
      return isDarkMode
    }
    return false
  })

  const onSubmit = (nextForm) => {
    setForm(nextForm)
  }

  // Check if user is logged in when component mounts
  useEffect(() => {
    checkUserLoggedIn()
  }, [])

  const router = useRouter()
  // Function to quick-register a user
  const quickRegister = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })

    const data = await res.json()

    if (res.ok) {
      setUser(data.user)
    } else {
      if (data.message === 'Email or Username are already taken') {
        login({
          email: user.username,
          password: process.env.QUICK_PASS_KEY,
        })
      } else {
        let message = data.message
        setError(message)
      }
    }
  }

  const register = async (user) => {
    console.log('register ')
    console.log(user)

    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })

    const data = await res.json()

    if (res.ok) {
      setUser(data.user)
      router.push('/order')
    } else {
      let message = data.message
      setError(message)
      setError(null)
    }
  }

  const login = async ({ email: identifier, password }, redirect = false) => {
    console.log('login ' + identifier + password)
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    })

    const data = await res.json()

    if (res.ok) {
      setUser(data.user)
      if (redirect) {
        router.push('/order')
      }
    } else {
      let message = data.message
      setError(message)
    }
  }

  const updateUser = async (
    { username, phonenumber, password, usedQuickRegister, addresses },
    redirect = false
  ) => {
    console.log('------ auth context start ------')

    console.log(username)
    console.log(phonenumber)

    console.log(password)

    console.log(usedQuickRegister)

    console.log(addresses)

    const email = phonenumber ? `${phonenumber}@phonenumber.com` : undefined
    const res = await fetch(`${NEXT_URL}/api/update-user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
        usedQuickRegister,
        addresses,
      }),
    })
    const data = await res.json()

    if (res.ok) {
      setUser(data.user)
      if (redirect) {
        router.push('/order')
      }
      return Object.keys(data.user)
    } else {
      let message = data.message
      setError(message)
      return []
    }
  }

  const forgotPassVerifyCode = async (emailPhone, code) => {
    const response = await fetch(`${NEXT_URL}/api/verifyPass`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailPhone: emailPhone + '@phonenumber.com',
        code,
      }),
    })
    if (response.ok) {
      const data = await response.json()
      setUser(data.user)
      return data
    } else {
      toast.error('مشکلی در ارتباط با سرور پیش آمد')
    }
  }
  // Function to logout a user
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, { method: 'POST' })

    if (res.ok) {
      setUser(null)
      router.push('/order')
    }
  }

  // Function to check if a user is logged in
  const checkUserLoggedIn = async () => {
    const res = await fetch(`${NEXT_URL}/api/user`)
    const data = await res.json()

    if (res.ok) {
      setUser(data.user)
    } else {
      setUser(null)
    }
    setIsLoading(false)
  }

  return (
    <AuthContext.Provider
      value={{
        quickRegister,
        user,
        error,
        isLoading,
        darkMode,
        setDarkMode,
        form,
        setForm,
        phoneNumber,
        setPhoneNumber,
        register,
        login,
        logout,
        onSubmit,
        setHasQuickRegistered,
        hasQuickRegistered,
        userID,
        setUserID,
        updateUser,
        setForgotPass,
        forgotPass,
        forgotPassVerifyCode,
        isRegistered,
        setIsRegistered,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
