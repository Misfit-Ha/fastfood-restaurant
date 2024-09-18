import PurchaseCount from './PurchaseCount'
import CartContext from '../context/CartContext.js'
import { useContext } from 'react'

export default function CartItem({
  id,
  title,
  price,
  discount,
  priceWithDiscount,
}) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    getNumberOfItems,
  } = useContext(CartContext)

  const quantity = getItemQuantity(id)

  return (
    <div
      className={`group mx-auto h-auto w-full rounded-xl bg-white  py-1 shadow-sm [direction:rtl] hover:bg-slate-100 dark:bg-slate-800/40 dark:shadow-slate-100/5 md:max-w-lg`}
      key={id + ' cart'}
    >
      <div className='p-2  '>
        <h1 className='text-right text-base font-bold text-slate-900 dark:text-slate-200'>
          {title}
        </h1>

        <div className=' item-center mt-2 flex w-full justify-between'>
          <div className=' flex flex-row'>
            {discount > 0 && (
              <span className='text-l mx-2 self-center rounded-lg bg-orange-500/10 p-px font-bold leading-tight text-arkanOrange'>
                ٪{parseInt(discount).toLocaleString('fa')}
              </span>
            )}
            <div className=' flex flex-col items-start'>
              {discount > 0 && (
                <s className='-my-0 text-xs font-bold leading-tight text-slate-400'>
                  {parseInt(price).toLocaleString('fa')}
                </s>
              )}
              <div
                className={`flex flex-row  ${discount > 0 ? '-my-3' : 'pr-2'} `}
              >
                <p className='text-sm font-bold   leading-tight'>
                  {parseInt(priceWithDiscount).toLocaleString('fa')}
                </p>
                <p className='text-xs leading-tight text-slate-900 dark:text-slate-200'>
                  &ensp;تومان
                </p>
              </div>
            </div>
          </div>
          <div className='flex  place-self-end '>
            <PurchaseCount id={id} />
          </div>
        </div>
      </div>
    </div>
  )
}

CartItem.defaultProps = {
  id: '0',
  name: 'بدون نام',
  price: '۵۰,۰۰۰',
  discount: '۲۵',
}
