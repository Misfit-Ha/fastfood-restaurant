import clsx from 'clsx'
import { useContext } from 'react'
import CartContext from '../context/CartContext'
import { Button } from './Button'
import Note from './Note'

export default function CheckoutSummary({
  handleClick,
  spinner,
  note,
  setNote,
}) {
  const { getNumberOfItems, cartItems, totalInLatin } = useContext(CartContext)

  return (
    <div className='relative mx-auto flex h-fit w-full max-w-xs flex-col rounded-md border bg-white p-3 text-right text-sm text-slate-900 shadow-sm transition-all duration-300 dark:border-slate-700/40 dark:bg-slate-800/40 dark:text-slate-200 dark:shadow-slate-100/5 md:mx-0'>
      {spinner && (
        <div className='absolute inset-0 z-10 flex h-full w-full items-center justify-center backdrop-blur-sm'>
          <svg
            className=' animate-spin'
            width='50'
            height='50'
            viewBox='0 0 50 50'
          >
            <path
              className='fill-current text-orange-600'
              d='M25,5A20,20,0,0,0,5,25H10A15,15,0,0,1,25,10V5Z'
            ></path>
          </svg>
        </div>
      )}
      <p className='text-right text-sm  font-bold text-slate-900 dark:text-slate-200'>
        سبد خرید ({getNumberOfItems.toLocaleString('fa')})
      </p>

      {cartItems?.map((i) => (
        <div className='flex flex-row justify-between' key={i.title}>
          <p className='self-center [direction:rtl]'>
            <span className='font-bold'>
              {parseInt(i.priceWithDiscount).toLocaleString('fa')}
            </span>
            &ensp;تومان
          </p>
          <p className='self-center [direction:rtl]'>
            <span>x</span>
            {i.quantity.toLocaleString('fa')}
          </p>
          <p className=' w-[105px]'>{i.title}</p>
        </div>
      ))}

      {/* total amount */}

      <div className='flex flex-row justify-between border-t-2 py-1 dark:border-slate-700'>
        <p className=' [direction:rtl] '>
          <span className='font-bold'>{totalInLatin.toLocaleString('fa')}</span>
          &ensp;تومان
        </p>

        <p className='w-[105px]'>مجموع</p>
      </div>

      <div className='flex flex-row justify-between border-t-2 py-1 dark:border-slate-700'>
        <Note note={note} setNote={setNote} />
      </div>

      {/*pay button */}

      {/*<button
        onClick={handleClick}
        className='  items-center justify-center space-x-2 rounded-full  bg-arkanOrange py-1 px-3 text-base font-bold leading-5 hover:opacity-80 transition duration-150 ease-in-out'
      >
        ثبت سفارش
      </button>*/}

      <Button color='orange' onClick={handleClick}>
        ارسال سفارش
      </Button>
    </div>
  )
}
