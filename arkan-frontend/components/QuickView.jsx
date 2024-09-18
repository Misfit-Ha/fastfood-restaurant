import { Fragment, useContext, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'
import { Button } from './Button'
import CartContext from '../context/CartContext'
import { API_URL } from '../config'
import { toast } from 'react-toastify'
import AuthContext from '../context/AuthContext'
import Image from 'next/image'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

async function postReview(review) {
  const url = `${API_URL}/api/reviews`
  const raw = {
    data: {
      author: review.attributes.author,
      rating: review.attributes.rating,
      content: review.attributes.content,
      date: review.attributes.date,
      product: review.attributes.productID,
    },
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(raw),
  })

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`
    throw new Error(message)
  }

  const result = await response.json()
  return result
}

function PurchaseCount({ id }) {
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity } =
    useContext(CartContext)
  const quantity = getItemQuantity(id)

  return (
    <>
      <div className=' flex h-[36px] w-[120px] flex-row items-center justify-between  rounded-full bg-slate-200/75 text-sm font-medium shadow-inner transition duration-150 ease-in-out dark:bg-slate-600/60 dark:shadow-slate-100/5'>
        <button
          type='button'
          onClick={(event) => {
            event.stopPropagation()
            decreaseCartQuantity(id)
          }}
          className=' h-[36px] w-[36px] rounded-full   bg-transparent p-0 text-arkanOrange  transition  duration-200  ease-in hover:bg-slate-300 focus:outline-none active:shadow-md dark:shadow-slate-100/5 dark:hover:bg-slate-500'
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

        <span className='  px-[7.1px] text-base font-bold text-slate-900 dark:text-slate-100'>
          {parseInt(quantity).toLocaleString('fa')}
        </span>

        <button
          type='button'
          onClick={(event) => {
            event.stopPropagation()
            increaseCartQuantity(id)
          }}
          className=' h-[36px] w-[36px] rounded-full bg-white  p-0 text-arkanOrange  shadow-sm transition duration-200 ease-in focus:outline-none active:shadow-md dark:bg-slate-800/40  dark:shadow-slate-100/5 dark:hover:text-white'
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

function UserRating({ rating, setRating }) {
  const [hover, setHover] = useState(0)

  return (
    <div className='flex items-center '>
      {[0, 1, 2, 3, 4].map((index) => (
        <StarIcon
          key={index}
          className={classNames(
            (hover || rating) > index
              ? 'text-orange-500'
              : 'text-slate-200 dark:text-slate-500',
            'h-7 w-7 flex-shrink-0 cursor-pointer'
          )}
          onMouseEnter={() => setHover(index + 1)}
          onMouseLeave={() => setHover(rating)}
          onClick={() => setRating(index + 1)}
          aria-hidden='true'
        />
      ))}
      <p className='mx-2 text-right text-sm font-bold text-slate-900 dark:text-slate-300'>
        :انتخاب امتیاز
      </p>
    </div>
  )
}

function WriteReview({ reviews, setReviews, productID }) {
  const [review, setReview] = useState('')
  const [loading, setLoading] = useState(false)
  const [rating, setRating] = useState(0)

  const { user } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const newReview = {
        attributes: {
          author: user.username,
          rating: rating,
          content: review,
          date: new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }),
          productID: productID,
        },
      }
      const savedReview = await postReview(newReview)
      setReviews([...reviews, savedReview.data])
      setReview('')
      toast.success('Review submitted successfully')
    } catch (error) {
      toast.error('Error submitting review')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex w-full items-start space-x-4'>
      <div className='min-w-0 flex-1'>
        <form onSubmit={handleSubmit}>
          <div className='border-b  border-slate-600/25  focus-within:border-orange-600'>
            <label htmlFor='review' className='sr-only'>
              Add your review
            </label>
            <textarea
              dir='rtl'
              rows={3}
              name='review'
              id='review'
              className='block w-full resize-none border-0 border-b border-transparent p-0 pb-2 text-slate-900 placeholder:text-slate-400 focus:border-orange-600 focus:ring-0 dark:bg-slate-900  dark:text-slate-300 sm:text-sm sm:leading-6'
              placeholder='نظر خود را اینجا بنویسید...'
              value={review}
              onChange={(e) => {
                setReview(e.target.value)
              }}
            />
          </div>
          <div className='flex justify-end '>
            <UserRating rating={rating} setRating={setRating} />
          </div>

          <div className='flex justify-between pt-4'>
            <div className='ml-auto flex-shrink-0'>
              <button
                type='submit'
                className='inline-flex items-center rounded-full  bg-orange-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600'
                disabled={loading}
              >
                {loading ? 'Processing...' : 'ارسال'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

function Reviews({ productID }) {
  const [reviews, setReviews] = useState([])
  const [isReviewsLoading, setIsReviewsLoading] = useState(false)
  const { user } = useContext(AuthContext)
  useEffect(() => {
    setIsReviewsLoading(true)
    fetch(`${API_URL}/api/products/1?populate=reviews`)
      .then((response) => response.json())
      .then((data) => {
        setReviews(data.data.attributes.reviews.data)
        setIsReviewsLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setIsReviewsLoading(false)
      })
  }, [])

  return (
    <div className=''>
      <div className='mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8'>
        <h2 className='pb-3 text-right text-lg font-medium text-slate-900 dark:text-slate-200'>
          نظرات
        </h2>
        <div className=' space-y-4 divide-y divide-slate-200 border-b border-t  border-slate-600/25 pb-3 dark:divide-slate-500'>
          {isReviewsLoading ? (
            <div className=' inset-0 flex h-full w-full items-center justify-center backdrop-blur-sm'>
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
          ) : (
            <>
              {user && !user.usedQuickRegister && (
                <WriteReview
                  reviews={reviews}
                  setReviews={setReviews}
                  productID={productID}
                />
              )}
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className='pt-4 lg:grid lg:grid-cols-12 lg:gap-x-8'
                >
                  <div className='lg:col-span-8 lg:col-start-1 xl:col-span-9 xl:col-start-1 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8'>
                    <div className='mt-4 lg:mt-6 xl:col-span-2 xl:mt-0'>
                      <div
                        className='space-y-6  text-right text-sm  text-slate-900 dark:text-slate-300'
                        dangerouslySetInnerHTML={{
                          __html: review.attributes.content,
                        }}
                      />
                    </div>
                    <div className='flex  items-center justify-end xl:col-span-1'>
                      <div className='flex items-center '>
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              review.attributes.rating > rating
                                ? 'text-orange-500'
                                : 'text-slate-200 dark:text-slate-500',
                              'h-5 w-5 flex-shrink-0'
                            )}
                            aria-hidden='true'
                          />
                        ))}
                      </div>
                      <p className='ml-3 text-sm text-slate-700 '>
                        {review.rating}
                        <span className='sr-only'> out of 5 stars</span>
                      </p>
                    </div>
                  </div>

                  <div className=' mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-end xl:col-span-3 xl:col-start-10'>
                    <p className='font-medium text-slate-900 dark:text-slate-200'>
                      {review.attributes.author}
                    </p>
                    <time
                      dateTime={review.attributes.datetime}
                      className='ml-4 border-l  border-slate-600/25 pl-4 text-slate-500 dark:text-slate-400 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0'
                    >
                      {review.attributes.date}
                    </time>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function AvailableButton({
  increaseCartQuantity,
  id,
  name,
  price,
  discount,
  priceWithDiscount,
}) {
  return (
    <Button
      onClick={(event) => {
        event.stopPropagation()
        increaseCartQuantity(id, name, price, discount, priceWithDiscount)
      }}
      type='submit'
      className='w-full '
      color='orange'
    >
      اضافه کن به سبد
    </Button>
  )
}

function UnavailableButton() {
  return (
    <Button disabled type='submit' className='w-full ' color='disabled'>
      ناموجود
    </Button>
  )
}
//TODO FIX Clicking outside doesnt work
export default function QuickView({
  openQuickView,
  setOpenQuickView,
  id,
  title,
  description,
  preview,
  price,
  discount,
  priceWithDiscount,
  availability,
  rating,
}) {
  const [showReviews, setShowReviews] = useState(false)
  const { getItemQuantity, increaseCartQuantity } = useContext(CartContext)
  const quantity = getItemQuantity(id)
  return (
    <Transition.Root show={openQuickView} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        onClose={() => setOpenQuickView(false)}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 hidden bg-slate-500 bg-opacity-75 transition-opacity md:block' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto '>
          <div className='flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'
              enterTo='opacity-100 translate-y-0 md:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 md:scale-100'
              leaveTo='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'
            >
              <Dialog.Panel className='flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl'>
                <div className='relative flex w-full items-center overflow-hidden rounded-md bg-white px-4 pb-8 pt-14 shadow-2xl dark:bg-slate-900 sm:px-6 sm:pt-8 md:p-6 lg:p-8'>
                  <button
                    type='button'
                    className='absolute left-4 top-4 text-slate-400 hover:text-slate-500 sm:left-6 sm:top-8 md:left-6 md:top-6 lg:left-8 lg:top-8'
                    onClick={(e) => {
                      setOpenQuickView(false)
                      setShowReviews(false)
                    }}
                  >
                    <span className='sr-only'>Close</span>
                    <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                  </button>

                  <div className='grid w-full grid-cols-1 items-start gap-x-6 gap-y-8  sm:grid-cols-12 lg:gap-x-8'>
                    <div className='text-right sm:col-span-8 lg:col-span-7 '>
                      <h2 className='text-2xl font-bold text-slate-900 sm:pl-12'>
                        {title}
                      </h2>

                      <section
                        aria-labelledby='information-heading'
                        className='mt-3 '
                      >
                        <h3 id='information-heading' className='sr-only'>
                          Product information
                        </h3>

                        <div className='flex flex-col items-end '>
                          {discount > 0 && (
                            <s className='-my-0 text-base font-bold leading-tight text-slate-400 dark:text-slate-400'>
                              {parseInt(price).toLocaleString('fa')}
                            </s>
                          )}
                          <div
                            className={`flex flex-row  ${
                              discount > 0 ? '-my-3' : 'pr-2'
                            } `}
                          >
                            <p className='text-base font-bold leading-tight  dark:text-slate-100'>
                              {parseInt(priceWithDiscount).toLocaleString('fa')}
                            </p>
                            <p className='text-base leading-tight text-slate-900 dark:text-slate-200'>
                              &ensp;تومان
                            </p>
                          </div>
                        </div>

                        {/* Reviews */}
                        <div className='mt-3'>
                          <h4 className='sr-only'>Reviews</h4>
                          <div className='flex items-center justify-end'>
                            <div className='flex items-center'>
                              <div className='flex items-center'>
                                {[0, 1, 2, 3, 4].map((index) => (
                                  <StarIcon
                                    key={index}
                                    className={classNames(
                                      index < rating
                                        ? 'text-orange-500'
                                        : 'text-slate-200 dark:text-slate-500',
                                      'h-5 w-5 flex-shrink-0'
                                    )}
                                    aria-hidden='true'
                                  />
                                ))}
                              </div>
                            </div>
                            <p className='sr-only'>{rating} out of 5 stars</p>
                          </div>
                        </div>

                        <div className='mt-6'>
                          <h4 className='sr-only'>Description</h4>

                          <p className='text-sm text-slate-700 dark:text-slate-300'>
                            {description}
                          </p>
                        </div>
                      </section>

                      <section
                        aria-labelledby='options-heading'
                        className='mt-6'
                      >
                        <h3 id='options-heading' className='sr-only'>
                          Product options
                        </h3>

                        <form>
                          <div className='mt-6 flex justify-center'>
                            {availability ? (
                              quantity > 0 ? (
                                <PurchaseCount id={id} />
                              ) : (
                                <AvailableButton
                                  increaseCartQuantity={increaseCartQuantity}
                                  id={id}
                                  name={title}
                                  price={price}
                                  discount={discount}
                                  priceWithDiscount={priceWithDiscount}
                                />
                              )
                            ) : (
                              <UnavailableButton />
                            )}
                          </div>

                          <p className='absolute left-4 top-4 text-center sm:static sm:mt-6'>
                            <a
                              href='#'
                              className='font-medium text-orange-600 hover:text-orange-500'
                              onClick={(e) => {
                                e.preventDefault()
                                setShowReviews(!showReviews)
                              }}
                            >
                              {showReviews ? 'بستن نظرات' : 'نمایش نظرات'}
                            </a>
                          </p>
                        </form>
                      </section>
                    </div>
                    <div className='sm:col-span-4 lg:col-span-5'>
                      <div className='aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-slate-100 '>
                        <Image
                          src={preview}
                          width={300}
                          height={300}
                          className='object-cover object-center'
                        />

                        {/*  TODO Next Image */}
                      </div>
                    </div>
                    <div className='col-span-full '>
                      {showReviews && <Reviews productID={id} />}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
