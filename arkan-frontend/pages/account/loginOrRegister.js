import { ToastContainer, toast } from 'react-toastify'
import { useState, useContext, useEffect, createRef } from 'react'
import AuthContext, { AuthProvider } from '../../context/AuthContext.js'
import { Header3 } from '../../components/Header3.jsx'
import { Footer2 } from '../../components/Footer2.jsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router.js'
import { API_URL, NEXT_URL } from '../../config/index.js'

const formVariants = {
  hidden: { x: '50%' },
  visible: { x: '0' },
  exit: { x: '-50%' },
}

function validatePhoneNumber(phoneNumber) {
  const re = /^09\d{9}$/
  return re.test(phoneNumber)
}

//old code for verification and registeration
const checkPhoneNumber = async (phoneNumber) => {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')

  const urlencoded = new URLSearchParams()
  urlencoded.append('phonenumber', phoneNumber)

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  }

  const response = await fetch(`${NEXT_URL}/api/check-phone`, requestOptions)
  const result = await response.text()
  return result
}

//Newer api for people who forgot their password
const forgotPassCodeReq = async (emailPhone) => {
  const response = await fetch(`${API_URL}/api/sms-auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      emailPhone: emailPhone + '@phonenumber.com',
    }),
  })
  if (response.ok) {
    return response.json()
  } else {
    toast.error('مشکلی در ارتباط با سرور پیش آمد')
  }
}

function LoadingButton() {
  return (
    <button
      type='button'
      className='w-full cursor-not-allowed rounded-full bg-arkanOrange px-0 py-2 text-center text-base font-semibold text-white shadow-md  shadow-orange-600/50 transition-all duration-200  hover:bg-opacity-80 '
      disabled=''
    >
      <svg
        className='mx-auto h-6 w-6 animate-spin text-white'
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
      >
        <circle
          className='opacity-25'
          cx='12'
          cy='12'
          r='10'
          stroke='currentColor'
          strokeWidth='4'
        ></circle>
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        ></path>
      </svg>
    </button>
  )
}

function LoginForm({}) {
  //TODO errors
  const {
    onSubmit,
    phoneNumber,
    setPhoneNumber,
    setHasQuickRegistered,
    setUserID,
    setIsRegistered,
  } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    if (!validatePhoneNumber(phoneNumber)) {
      toast.error('شماره موبایل نامعتبر است.')
      setIsLoading(false)
      return
    }
    try {
      let checkNumRes = await checkPhoneNumber(phoneNumber)
      checkNumRes = JSON.parse(checkNumRes)

      if (checkNumRes.isRegistered && !checkNumRes.usedQuickRegistered) {
        onSubmit('password')
      } else if (checkNumRes.isRegistered && checkNumRes.usedQuickRegistered) {
        setHasQuickRegistered(true)
        await forgotPassCodeReq(phoneNumber)
        setUserID(checkNumRes.userID)
        onSubmit('verification')
      } else {
        await forgotPassCodeReq(phoneNumber)
        setIsRegistered(false)
        onSubmit('verification')
      }
    } catch (error) {
      toast.error('خطایی در ارتباط با سرور رخ داد')
    }
    setIsLoading(false)
  }

  return (
    <motion.form
      variants={formVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      onSubmit={handleSubmit}
      className='mb-4 ml-auto mr-auto rounded-md bg-white px-8 py-4 shadow drop-shadow-md dark:bg-slate-800/60  dark:shadow-slate-100/5 '
    >
      <div className='mb-4'>
        <label
          className='mb-2 block text-sm font-medium text-slate-800 dark:text-slate-200'
          htmlFor='phoneNumber'
        >
          شماره موبایل
        </label>
        <input
          className='px w-full appearance-none   rounded  border  border-slate-200 bg-white px-3 py-2 text-sm leading-tight text-slate-800 shadow-sm   outline-none     placeholder:text-slate-400    focus:border-orange-300 focus:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-600 dark:border-slate-600 dark:border-slate-700/40 dark:bg-slate-900   dark:text-slate-100     '
          id='phoneNumber'
          type='text'
          value={phoneNumber}
          placeholder='09**-***-****'
          onChange={(e) => {
            setPhoneNumber(e.target.value)
          }}
        />
      </div>
      <div className='mt-6'>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <input
            type='submit'
            value='ورود'
            className='hover:bg-tertiary w-full rounded-full bg-arkanOrange px-0 py-2 text-center text-base font-semibold text-white shadow-md shadow-orange-600/50 transition-all duration-200 hover:bg-opacity-80   '
          />
        )}
      </div>
    </motion.form>
  )
}
/*
before using this useEffect the form was being submitted before the state is updated with the last digit. The setState function in React is asynchronous, which means it doesn’t immediately update the state but schedules the update. When you call handleSubmit right after setCode, the state might not have been updated yet.
To fix this, had to use the useEffect hook to listen for changes in the code state and submit the form when all digits are entered
*/
function VerifyCodeForm({}) {
  const [code, setCode] = useState(['', '', '', ''])
  const [countdown, setCountdown] = useState(90)
  const [isLoading, setIsLoading] = useState(false)
  const {
    phoneNumber,
    onSubmit,
    forgotPass,
    forgotPassVerifyCode,
    hasQuickRegistered,
    login,
    isRegistered,
  } = useContext(AuthContext)
  const router = useRouter()
  const inputRefs = Array(4)
    .fill()
    .map(() => createRef())

  useEffect(() => {
    if (countdown > 0) {
      const timerId = setInterval(() => {
        setCountdown(countdown - 1)
      }, 1000)

      return () => clearInterval(timerId)
    }
  }, [countdown])

  useEffect(() => {
    if (code.every((digit) => digit !== '')) {
      handleSubmit()
    }
  }, [code])

  const handleChange = (index) => (e) => {
    const newCode = [...code]
    newCode[index] = e.target.value
    setCode(newCode)

    if (e.target.value && index < inputRefs.length - 1) {
      const nextInput = inputRefs[index + 1].current
      nextInput.focus()
      nextInput.select()
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    const codeStr = code.join('')
    let data

    try {
      data = await forgotPassVerifyCode(phoneNumber, codeStr)
    } catch (error) {
      toast.error('مشکلی در ارتباط با سرور پیش آمد')
      setIsLoading(false)

      return
    }

    if (forgotPass) {
      router.push('/order')
      return
    }
    if (isRegistered == false) {
      onSubmit('register')
    }

    if (hasQuickRegistered) {
      await login({
        email: phoneNumber + '@phonenumber.com',
        password: 'cbINJWsLO47n4nrb0NQRE0wlkAhofyZud6hNQzDMcUC7EukH41',
      })
      onSubmit('register')
    }
    setIsLoading(false)
  }

  const handleKeyDown = (index) => (e) => {
    if (e.key === 'Backspace' && e.target.value === '') {
      const newCode = [...code]
      if (index > 0) {
        newCode[index - 1] = ''
        setCode(newCode)
        inputRefs[index - 1].current.focus()
      }
    }
  }

  return (
    <motion.form
      variants={formVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      onSubmit={handleSubmit}
      className='mb-4 ml-auto mr-auto rounded-md bg-white px-8 py-4 shadow drop-shadow-md dark:bg-slate-800/60 dark:shadow-slate-100/5 '
    >
      <div className='mb-4'>
        <label
          className='mb-2 block text-sm font-medium text-slate-800 dark:text-slate-200'
          htmlFor='code'
        >
          <p dir='rtl'>کد احراز هویت برای شماره {phoneNumber} ارسال شد.</p>
        </label>
        <div className='mx-auto flex w-full max-w-xs flex-row items-center justify-between'>
          {code.map((value, index) => (
            <div className='h-16 w-16 ' key={index}>
              <input
                className='-5 px form-input flex  h-full w-full flex-col items-center justify-center rounded-xl border border-slate-200 bg-white text-center text-lg outline-none    placeholder:text-slate-400  focus:bg-slate-50 focus:ring-2 focus:ring-inset focus:ring-orange-600 dark:border-slate-600   dark:border-slate-700/40  dark:bg-slate-900 dark:text-slate-100   '
                type='text'
                onKeyDown={handleKeyDown(index)}
                ref={inputRefs[index]}
                value={value}
                onChange={handleChange(index)}
                maxLength='1'
              />
            </div>
          ))}
        </div>
      </div>

      <div className='mt-6'>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <input
            type='submit'
            value={'بررسی'}
            className='hover:bg-tertiary w-full rounded-full bg-arkanOrange px-0 py-2 text-center text-base font-semibold text-white shadow-md shadow-orange-600/50 transition-all duration-200 hover:bg-opacity-80    '
          />
        )}
      </div>
      <div className='mb-2 mt-6  block text-center text-sm font-medium text-slate-800 dark:text-slate-200'>
        {countdown > 0 ? (
          <p dir='rtl'>
            <span className='font-bold'>{countdown}</span> ثانیه باقی مانده
          </p>
        ) : (
          <button
            onClick={async (e) => {
              e.preventDefault()
              forgotPassCodeReq(phoneNumber)
              setCountdown(90)
            }}
          >
            کد را دوباره ارسال کنید
          </button>
        )}
      </div>
    </motion.form>
  )
}

export function PasswordForm({}) {
  const [password, setPassword] = useState('')
  const { phoneNumber, onSubmit, login, setForgotPass } =
    useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)

  //im using the phonenumber as username because im transiotioning from using email and username to using phonenumber as identifier
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await login(
      { email: phoneNumber + '@phonenumber.com', password: password },
      true
    )
    setIsLoading(false)
  }
  return (
    <motion.form
      variants={formVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      onSubmit={handleSubmit}
      className='mb-4 ml-auto mr-auto rounded-md bg-white px-8 py-4 shadow drop-shadow-md dark:bg-slate-800/60  dark:shadow-slate-100/5 '
    >
      <div className='mb-4'>
        <label
          className='mb-2 block text-sm font-medium text-slate-800 dark:text-slate-200'
          htmlFor='password'
        >
          رمز عبور
        </label>
        <input
          className='px w-full appearance-none   rounded  border  border-slate-200  bg-white px-3 py-2  text-right text-sm  leading-tight text-slate-800  shadow-sm  outline-none    placeholder:text-slate-400    focus:border-orange-300 focus:bg-slate-50   focus:outline-none focus:ring-2 focus:ring-inset  focus:ring-orange-600 dark:border-slate-600   dark:border-slate-700/40  dark:bg-slate-900 dark:text-slate-100    '
          id='password'
          type='password'
          value={password}
          placeholder='********'
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='flex flex-row justify-between'>
        <div className='text-center '>
          <button
            onClick={async (e) => {
              e.preventDefault()
              forgotPassCodeReq(phoneNumber)
              setForgotPass(true)

              onSubmit('verification')
            }}
            className='text-sm font-medium text-arkanOrange transition-colors duration-200 hover:text-opacity-80'
          >
            پسور خود را فراموش کردید؟
          </button>
        </div>

        <div className='text-center'>
          <label className=''>
            <span className='text-sm font-medium  text-slate-800 dark:text-slate-200'>
              مرا به خاطر بسپار
            </span>
            <input type='checkbox' className='ml-2 align-middle' />
          </label>
        </div>
      </div>
      <div className='mt-6'>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <input
            type='submit'
            value={'ورود'}
            className='hover:bg-tertiary w-full rounded-full bg-arkanOrange px-0 py-2 text-center text-base font-semibold text-white shadow-md shadow-orange-600/50 transition-all duration-200 hover:bg-opacity-80    '
          />
        )}
      </div>
    </motion.form>
  )
}

function UpdatePasswordForm({ onSubmit }) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('پسورد ها یکسان نیستند')
      return
    }
    onSubmit('verification')
  }

  return (
    <motion.form
      variants={formVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      onSubmit={handleSubmit}
      className='mb-4 ml-auto mr-auto rounded-md bg-white px-8 py-4 shadow drop-shadow-md dark:bg-slate-800/60 dark:shadow-slate-100/5 '
    >
      <div className='mb-4'>
        <label
          className='mb-2 block text-sm font-medium text-slate-800 dark:text-slate-200'
          htmlFor='password'
        >
          رمز عبور
        </label>
        <input
          className='px w-full appearance-none   rounded  border  border-slate-200  bg-white px-3 py-2  text-right text-sm  leading-tight text-slate-800  shadow-sm  outline-none    placeholder:text-slate-400    focus:border-orange-300 focus:bg-slate-50   focus:outline-none focus:ring-2 focus:ring-inset  focus:ring-orange-600 dark:border-slate-600   dark:border-slate-700/40  dark:bg-slate-900 dark:text-slate-100   '
          id='password'
          type='password'
          value={password}
          placeholder='********'
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='mb-4'>
        <label
          className='mb-2 block text-sm font-medium text-slate-800 dark:text-slate-200'
          htmlFor='confirmPassword'
        >
          تأیید رمز عبور
        </label>
        <input
          className='px w-full appearance-none   rounded  border  border-slate-200  bg-white px-3 py-2  text-right text-sm  leading-tight text-slate-800  shadow-sm  outline-none    placeholder:text-slate-400    focus:border-orange-300 focus:bg-slate-50   focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-600   dark:border-slate-600   dark:border-slate-700/40  dark:bg-slate-900 dark:text-slate-100   '
          id='confirmPassword'
          type='password'
          value={confirmPassword}
          placeholder='********'
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className='mt-6'>
        <input
          type='submit'
          value='تنظیم'
          className='hover:bg-tertiary w-full rounded-full bg-arkanOrange px-0 py-2 text-center text-base font-semibold text-white shadow-md shadow-orange-600/50 transition-all duration-200 hover:bg-opacity-80    '
        />
      </div>
    </motion.form>
  )
}

function RegisterUserForm() {
  const { register, phoneNumber, hasQuickRegistered, userID, updateUser } =
    useContext(AuthContext)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    if (password !== confirmPassword) {
      toast.error('پسورد ها یکسان نیستند')
      setIsLoading(false)
      return
    } else if (hasQuickRegistered) {
      await updateUser({
        userID,
        username: name,
        password: password,
        usedQuickRegister: false,
      })
    } else {
      const newUser = {
        username: name,
        password: password,
        email: phoneNumber + '@phonenumber.com',
        usedQuickRegister: false,
      }
      await register(newUser)
    }
    router.push('/order')
    setIsLoading(false)
  }

  return (
    <motion.form
      variants={formVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      onSubmit={handleSubmit}
      className='mb-4  ml-auto mr-auto rounded-md bg-white px-8 py-4 drop-shadow-md dark:bg-slate-800 '
    >
      <div className='mb-4'>
        <label
          className='mb-2 block text-sm font-medium text-slate-800 dark:text-slate-200'
          htmlFor='name'
        >
          نام
        </label>
        <input
          className='px w-full appearance-none   rounded  border  border-slate-200  bg-white px-3 py-2  text-right text-sm  leading-tight text-slate-800  shadow-sm  outline-none   placeholder:text-slate-400    focus:border-orange-300 focus:bg-slate-50   focus:outline-none focus:ring-2 focus:ring-inset  focus:ring-orange-600 dark:border-slate-600   dark:border-slate-700/40  dark:bg-slate-900 dark:text-slate-100   '
          id='name'
          type='text'
          value={name}
          placeholder='نام'
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='mb-4'>
        <label
          className='mb-2 block text-sm font-medium text-slate-800 dark:text-slate-200'
          htmlFor='password'
        >
          رمز عبور
        </label>
        <input
          className='px w-full appearance-none   rounded  border  border-slate-200  bg-white px-3 py-2  text-right text-sm  leading-tight text-slate-800  shadow-sm  outline-none    placeholder:text-slate-400    focus:border-orange-300 focus:bg-slate-50   focus:outline-none focus:ring-2 focus:ring-inset   focus:ring-orange-600 dark:border-slate-600   dark:border-slate-700/40  dark:bg-slate-900 dark:text-slate-100      '
          id='password'
          type='password'
          value={password}
          placeholder='********'
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='mb-4'>
        <label
          className='mb-2 block text-sm font-medium text-slate-800 dark:text-slate-200'
          htmlFor='confirmPassword'
        >
          تأیید رمز عبور
        </label>
        <input
          className='px w-full appearance-none   rounded  border  border-slate-200  bg-white px-3 py-2  text-right text-sm  leading-tight text-slate-800  shadow-sm  outline-none    placeholder:text-slate-400    focus:border-orange-300 focus:bg-slate-50   focus:outline-none focus:ring-2 focus:ring-inset  focus:ring-orange-600 dark:border-slate-600   dark:border-slate-700/40  dark:bg-slate-900 dark:text-slate-100     '
          id='confirmPassword'
          type='password'
          value={confirmPassword}
          placeholder='********'
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className='mt-6'>
        {isLoading ? (
          <LoadingButton />
        ) : (
          <input
            type='submit'
            value={'تنظیم'}
            className='hover:bg-tertiary w-full rounded-full bg-arkanOrange px-0 py-2 text-center text-base font-semibold text-white shadow-md shadow-orange-600/50 transition-all duration-200 hover:bg-opacity-80    '
          />
        )}
      </div>
    </motion.form>
  )
}

function Forms({}) {
  const { form, error } = useContext(AuthContext)
  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])
  return (
    <div className='ml-auto mr-auto mt-4 h-96 w-full max-w-sm text-right'>
      <AnimatePresence mode='wait'>
        {form === 'login' && <LoginForm />}
        {form === 'register' && <RegisterUserForm />}
        {form === 'password' && <PasswordForm />}
        {form === 'verification' && <VerifyCodeForm />}
        {form === 'setPassword' && <UpdatePasswordForm />}
      </AnimatePresence>
    </div>
  )
}
import 'react-toastify/dist/ReactToastify.css'

export default function LoginOrRegisterPage() {
  const { darkMode } = useContext(AuthContext)

  return (
    <div className='bg-slate-50 dark:bg-slate-900'>
      <ToastContainer rtl theme={darkMode ? 'dark' : 'light'} />
      <Header3
        title={'آرکان - ورود'}
        description={' ورود به حساب کاربری'}
        keywords={'ورود , حساب کاربری'}
      />

      <div>
        <div className='relative flex content-center items-center font-medium md:h-screen '>
          <div className='ml-auto mr-auto w-full'>
            <div className='mb-6 ml-auto mr-auto mt-4 w-full max-w-md text-center'>
              <h1 className='font-title block text-3xl font-extrabold  text-slate-800 dark:text-slate-100'>
                ورود / ثبت حساب کاربری
              </h1>
            </div>
            <AuthProvider>
              <Forms />
            </AuthProvider>
          </div>
        </div>
      </div>
      <Footer2 />
    </div>
  )
}
