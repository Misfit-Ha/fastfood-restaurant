import { SiSpeedtest } from 'react-icons/si'
import { FaChevronDown, FaRegTrashAlt } from 'react-icons/fa'
import CartItem from './CartItem'
import CheckOutCard from './CheckOutCard'
import { useContext } from 'react'
import CartContext from '../context/CartContext.js'
import { useAutoAnimate } from '@formkit/auto-animate/react'

export default function NavbarCart() {
  const { getNumberOfItems, cartItems, resetCart } = useContext(CartContext)
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */)

  return (
    <div className='space-y-3'>
      {/*<div className=' flex flex-row justify-end  space-x-2 p-2 w-full border rounded-lg bg-white '>
        <button className='absolute   left-3 place-self-center w-[31.68px] h-[31.68px] rounded-full hover:bg-slate-200 hover:border active:shadow-md  transition ease-in duration-200 focus:outline-none'>
          <FaChevronDown className='mx-auto ' />
        </button>

        <span className=' text-sm  '>سریع ترین زمان ممکن</span>
        <SiSpeedtest className='scale-110 place-self-center' />
      </div>*/}

      {/* pricing and products */}
      <div className=' flex w-full flex-row justify-between  space-x-2  rounded-lg border  bg-white p-2 dark:border-slate-700/40 dark:bg-slate-800/40'>
        <button
          onClick={() => resetCart()}
          className=' h-[31.68px] w-[31.68px] place-self-center rounded-full text-red-500 transition duration-200  ease-in hover:bg-slate-200 focus:outline-none active:shadow-md dark:shadow-slate-100/5 dark:hover:bg-slate-700'
        >
          <FaRegTrashAlt className='mx-auto' />
        </button>

        <span className=' my-auto text-sm font-bold text-slate-900 dark:text-slate-200'>
          سبد ({getNumberOfItems.toLocaleString('fa')})
        </span>
      </div>
      <div ref={parent} className='space-y-1'>
        {cartItems?.map((i) => (
          <CartItem
            id={i.id}
            title={i.title}
            price={i.price}
            discount={i.discount}
            priceWithDiscount={i.priceWithDiscount}
            key={i.id + '-cartKey'}
          />
        ))}
      </div>

      <CheckOutCard />
    </div>
  )
}
