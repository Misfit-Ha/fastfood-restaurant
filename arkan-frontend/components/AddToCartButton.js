import { useContext } from 'react'
import CartContext from '../context/CartContext.js'
import PurchaseCount from './PurchaseCount.js'

function AvailableButton({
  increaseCartQuantity,
  id,
  name,
  price,
  discount,
  priceWithDiscount,
}) {
  return (
    <button
      type='button'
      onClick={(event) => {
        event.stopPropagation()
        increaseCartQuantity(id, name, price, discount, priceWithDiscount)
      }}
      className='inline-block self-center rounded-full border bg-white px-6 py-1.5 text-sm font-medium leading-tight text-arkanOrange shadow-md transition  duration-150 ease-in-out group-hover:bg-arkanOrange group-hover:text-white group-hover:shadow-md group-hover:shadow-orange-600/20 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-100/5'
    >
      افزودن
    </button>
  )
}

function UnavailableButton() {
  return (
    <button
      disabled
      type='button'
      className='inline-block self-center rounded-full border bg-slate-400 px-6 py-1.5 text-sm font-medium leading-tight text-white shadow-inner  transition  duration-150 ease-in-out group-hover:bg-slate-500 group-hover:text-white dark:border-slate-800 dark:bg-slate-600 dark:shadow-slate-100/5'
    >
      ناموجود
    </button>
  )
}

export default function AddToCartButton({
  id,
  name,
  price,
  discount,
  priceWithDiscount,
  availability,
}) {
  const { getItemQuantity, increaseCartQuantity } = useContext(CartContext)
  const quantity = getItemQuantity(id)

  if (quantity > 0) {
    return <PurchaseCount id={id} />
  }
  return (
    <>
      {availability ? (
        <AvailableButton
          increaseCartQuantity={increaseCartQuantity}
          id={id}
          name={name}
          price={price}
          discount={discount}
          priceWithDiscount={priceWithDiscount}
        />
      ) : (
        <UnavailableButton />
      )}
    </>
  )
}
