import { useContext } from 'react'
import CartContext from '../context/CartContext.js'

export default function PurchaseCount({ id }) {
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity } =
    useContext(CartContext)
  const quantity = getItemQuantity(id)

  return (
    <>
      <div className=' flex h-[31.68px] w-[87.47px] flex-row items-center justify-between  rounded-full bg-slate-200/75 text-sm font-medium shadow-inner transition duration-150 ease-in-out dark:bg-slate-600/60 dark:shadow-slate-100/5'>
        <button
          type='button'
          onClick={(event) => {
            event.stopPropagation()
            decreaseCartQuantity(id)
          }}
          className=' h-[31.68px] w-[31.68px] rounded-full   bg-transparent p-0 text-arkanOrange  transition  duration-200  ease-in hover:bg-slate-300 focus:outline-none active:shadow-md dark:shadow-slate-100/5 dark:hover:bg-slate-500'
        >
          <svg
            width='20px'
            height='20px'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
            enableBackground='new 0 0 20 20'
            className=' inline-block h-6 w-6 fill-arkanOrange hover:fill-white '
          >
            <path d='M16 10c0 .553-.048 1-.601 1H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H15.4c.552 0 .6.447.6 1z' />
          </svg>
        </button>

        <span className='  px-[7.1px] text-sm font-bold text-slate-900 dark:text-slate-100'>
          {parseInt(quantity).toLocaleString('fa')}
        </span>

        <button
          type='button'
          onClick={(event) => {
            event.stopPropagation()
            increaseCartQuantity(id)
          }}
          className=' h-[31.68px] w-[31.68px] rounded-full bg-white  p-0 text-arkanOrange  shadow-sm transition duration-200 ease-in focus:outline-none active:shadow-md dark:bg-slate-800/40  dark:shadow-slate-100/5 dark:hover:text-white'
        >
          <svg
            viewBox='0 0 20 20'
            enableBackground='new 0 0 20 20'
            className='inline-block h-6 w-6 fill-arkanOrange hover:fill-slate-300'
          >
            <path
              d='M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
C15.952,9,16,9.447,16,10z'
            />
          </svg>
        </button>
      </div>
    </>
  )
}

/*
PurchaseCount.defaulProps = {
  count: 1,
}
*/
