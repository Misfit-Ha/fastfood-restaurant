import CartContext from '../context/CartContext.js'
import { useContext } from 'react'
import { useRouter } from 'next/router.js'
import { ButtonLink } from './Button.jsx'

export default function CheckOutCard({ total }) {
  const { totalInLatin } = useContext(CartContext)

  const router = useRouter()

  return (
    <div className='group mx-auto flex w-full flex-col space-y-2 overflow-hidden rounded-lg bg-white  p-2 shadow-sm transition duration-150 ease-in-out [direction:rtl] hover:bg-slate-100 dark:bg-slate-800/40 dark:shadow-slate-100/5 md:max-w-lg'>
      <div className='flex flex-row justify-between   '>
        <h1 className='text-lg font-bold text-black dark:text-slate-100'>
          مجموع{' '}
        </h1>
        <span className='text-right text-lg font-bold text-black dark:text-slate-100'>
          {totalInLatin.toLocaleString('fa')} تومان
        </span>
      </div>

      <ButtonLink href={'/checkout'} color='orange'>
        تسویه حساب
      </ButtonLink>
    </div>
  )
}
