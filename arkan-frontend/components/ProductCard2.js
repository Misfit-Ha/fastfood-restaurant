import Image from 'next/image'
import CartContext from '../context/CartContext.js'
import AddToCartButton from './AddToCartButton'
import { useContext, useState } from 'react'
import clsx from 'clsx'
import QuickView from './QuickView.jsx'

export default function ProductCard2({
  id,
  title,
  description,
  preview,
  price,
  discount,
  priceWithDiscount,
  availability,
  openQuickView,
  setOpenQuickView,
  rating,
}) {
  return (
    <div
      onClick={() => setOpenQuickView(true)}
      className='group  mx-auto w-full max-w-sm overflow-hidden rounded-xl bg-white shadow-sm transition duration-150  ease-in-out [direction:rtl] hover:bg-slate-200/60 dark:bg-slate-800/40 dark:shadow-slate-100/5 dark:hover:bg-slate-700/30 md:max-w-lg'
    >
      {/* <QuickView
        openQuickView={openQuickView}
        setOpenQuickView={setOpenQuickView}
        id={id}
        title={title}
        description={description}
        preview={preview}
        price={price}
        discount={discount}
        priceWithDiscount={priceWithDiscount}
        availability={availability}
        rating={rating}
      /> */}
      <div className='md:flex'>
        <div className=' md:shrink-0'>
          <div
            className={clsx(
              'relative h-44 w-full overflow-hidden bg-slate-200 dark:bg-slate-700 md:h-full md:w-28',
              availability ? 'grayscale-0' : 'blur-sm grayscale'
            )}
          >
            <Image
              alt='product preview image'
              src={preview}
              fill
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
        </div>
        <div className=' w-full p-3 '>
          <h1 className=' text-right text-lg font-bold leading-tight text-slate-900 dark:text-slate-200'>
            {title}
          </h1>
          <p className='  max-w-xs  text-right text-xs font-thin text-slate-600 dark:text-slate-300 '>
            {description}
          </p>
          <div className='  item-center mt-2 flex w-full justify-between'>
            <div className='  flex flex-row'>
              {discount > 0 && (
                <span className='text-l mx-2 self-center rounded-lg bg-orange-500/10 p-px font-bold leading-tight text-arkanOrange'>
                  ٪{parseInt(discount).toLocaleString('fa')}
                </span>
              )}
              <div className='  flex flex-col items-start'>
                {discount > 0 && (
                  <s className='-my-0 text-xs font-bold leading-tight text-slate-400 dark:text-slate-400'>
                    {parseInt(price).toLocaleString('fa')}
                  </s>
                )}
                <div
                  className={`flex flex-row  ${
                    discount > 0 ? '-my-3' : 'pr-2'
                  } `}
                >
                  <p className='text-sm font-bold   leading-tight dark:text-slate-100'>
                    {parseInt(priceWithDiscount).toLocaleString('fa')}
                  </p>
                  <p className='text-xs leading-tight text-slate-900 dark:text-slate-200'>
                    &ensp;تومان
                  </p>
                </div>
              </div>
            </div>
            <div className='flex justify-center space-x-2 '>
              <AddToCartButton
                id={id}
                name={title}
                price={price}
                discount={discount}
                priceWithDiscount={priceWithDiscount}
                availability={availability}
                rating={rating}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ProductCard2.defaultProps = {
  title: 'بدون اسم',
  description: 'لورم ایپسون بدون متن توضیحات طولانی برای این محصول',
  preview:
    'https://arkanstrapi2.storage.iran.liara.space/small_burger_a17d2b808b.jpg',

  price: '100000',
  discount: '25',
  priceWithDiscount: '75000',
  availability: 'true',
}
