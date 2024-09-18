import { useEffect, useState } from 'react'
import { Container } from '../components/Container'
import { Footer2 } from '../components/Footer2'
import { Header3 } from '../components/Header3'
import { API_URL, NEXT_URL } from '../config'
import Image from 'next/image'

function translateState(state) {
  switch (state) {
    case 'confirmed':
      return 'درحال آماده سازی'
    case 'unconfirmed':
      return 'تأیید نشده'
    case 'ready':
      return 'درحال ارسال'
    case 'delivered':
      return 'تحویل داده شده'
    case 'canceled':
      return 'لغو شده'
    default:
      return state
  }
}

async function fetchImageSrc(productId) {
  const response = await fetch(
    `${API_URL}/api/products/${productId}?populate=image`
  )
  const productData = await response.json()
  const src =
    API_URL +
    productData.data.attributes.image.data.attributes.formats.thumbnail.url

  return src
}

function OrderHistory({ orders }) {
  //fix for images GET http://localhost:3000/[object%20Promise] 404 (Not Found)
  const [imageSources, setImageSources] = useState({})
  useEffect(() => {
    const fetchAllImageSources = async () => {
      const sources = {}
      for (const order of orders) {
        for (const product of order.cartItems) {
          const src = await fetchImageSrc(product.id)
          sources[product.id] = src
        }
      }
      setImageSources(sources)
    }

    fetchAllImageSources()
  }, [])
  //TODO use shamsi in reviews
  //TODO this is a static date
  let gregorianDate = new Date('2023-10-01T03:28:37.900Z')
  let shamsiDateTime = new Intl.DateTimeFormat('fa-IR', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(gregorianDate)

  return (
    <div className=''>
      <div className='mx-auto max-w-7xl  px-4 py-16 sm:px-6 lg:px-8 lg:pb-24'>
        <div className='mx-auto max-w-xl '>
          <h1 className='text-center text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl'>
            رسید سفارش ها
          </h1>
        </div>

        <div className='mt-16'>
          <h2 className='sr-only'>Recent orders</h2>

          <div className='space-y-20'>
            {orders.map((order) => {
              // Convert order.createdAt to Shamsi date
              let gregorianDate = new Date(order.createdAt)
              let shamsiDate = new Intl.DateTimeFormat('fa-IR', {
                dateStyle: 'short',
                timeStyle: 'short',
              }).format(gregorianDate)

              return (
                <div key={order.id}>
                  <h3 className='sr-only'>
                    Order placed on{' '}
                    <time dateTime={order.createdAt}>{order.createdAt}</time>{' '}
                  </h3>

                  <div className='rounded-lg bg-slate-50 px-4 py-6 dark:bg-slate-800/60 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8'>
                    <a
                      href={`tab/${order.id}`}
                      className='mt-6 flex w-full items-center justify-center rounded-md border border-slate-300 px-4  py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:border-slate-700 dark:text-slate-300 hover:dark:bg-slate-800/60 sm:mt-0 sm:w-auto'
                    >
                      نمایش رسید
                      <span className='sr-only'>for order {order.id}</span>
                    </a>

                    <dl className='flex-auto space-y-6 divide-y divide-slate-200 text-right text-sm text-slate-600 dark:text-slate-400 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8'>
                      <div className='flex justify-between pt-6 font-medium text-slate-900 dark:text-slate-100 sm:block sm:pt-0'>
                        <dt>وضعیت</dt>
                        <dd className='sm:mt-1'>
                          {translateState(order.state)}
                        </dd>
                      </div>
                      <div className='flex justify-between pt-6 font-medium text-slate-900 dark:text-slate-100 sm:block sm:pt-0'>
                        <dt>جمع کل</dt>
                        <dd className='sm:mt-1'>
                          تومان{' '}
                          <span>
                            {parseInt(order.total).toLocaleString('fa')}
                          </span>
                        </dd>
                      </div>

                      <div className='flex justify-between pt-6 sm:block sm:pt-0'>
                        <dt className='font-medium text-slate-900 dark:text-slate-100'>
                          شماره سفارش{' '}
                        </dt>
                        <dd className='sm:mt-1'>
                          {order.id.toLocaleString('fa')}
                        </dd>
                      </div>

                      <div className='flex justify-between sm:block'>
                        <dt className='font-medium text-slate-900 dark:text-slate-100'>
                          تاریخ سفارش
                        </dt>
                        <dd className='sm:mt-1'>
                          <time dateTime={order.createdAt}>{shamsiDate}</time>
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <table className='mt-4 w-full text-slate-500 dark:text-slate-400 sm:mt-6'>
                    <caption className='sr-only'>Products</caption>
                    <thead className='sr-only  text-right text-sm text-slate-500 dark:text-slate-400 sm:not-sr-only'>
                      <tr>
                        <th scope='col' className='w-0 py-3  font-normal'>
                          اطلاعات
                        </th>
                        <th
                          scope='col'
                          className='hidden py-3 pl-8 font-normal sm:table-cell'
                        >
                          تعداد
                        </th>
                        <th
                          scope='col'
                          className='hidden w-1/5 py-3 pl-8 font-normal sm:table-cell'
                        >
                          قیمت
                        </th>
                        <th
                          scope='col'
                          className='py-3 pl-8  font-normal sm:w-2/5 lg:w-1/3'
                        >
                          محصول
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-slate-200 border-b border-slate-200 text-right text-sm  dark:divide-slate-700 dark:border-slate-700 sm:border-t'>
                      {order.cartItems.map((product) => {
                        return (
                          <tr key={product.id}>
                            <td className='whitespace-nowrap py-6 text-right font-medium'>
                              <a href={'/order'} className='text-orange-600'>
                                نمایش{' '}
                                <span className='hidden lg:inline'>محصول</span>
                                <span className='sr-only'>
                                  , {product.title}
                                </span>
                              </a>
                            </td>
                            <td className='hidden  py-6 pl-8 text-right sm:table-cell'>
                              {product.quantity.toLocaleString('fa')}
                            </td>
                            <td className='hidden py-6 pl-8 sm:table-cell'>
                              تومان{' '}
                              <span>
                                {parseInt(
                                  product.priceWithDiscount
                                ).toLocaleString('fa')}
                              </span>
                            </td>
                            <td className='py-6 pl-8'>
                              <div className='flex items-center justify-end'>
                                <div>
                                  <div className='font-medium text-slate-900 dark:text-slate-100'>
                                    {product.title}
                                  </div>
                                  <div className='mt-1 sm:hidden'>
                                    {product.priceWithDiscount}
                                  </div>
                                </div>

                                <Image
                                  className='ml-6 h-16 w-16 rounded object-cover object-center'
                                  src={imageSources[product.id]}
                                  alt={`image of ${product.title}`}
                                  width={50}
                                  height={50}
                                  loading='lazy'
                                />
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Receipts({ userAndOrdersData }) {
  return (
    <main className='bg-slate-50 dark:bg-slate-900'>
      <Header3 />
      <Container>
        <OrderHistory orders={userAndOrdersData.user.orders} />
      </Container>
      <Footer2 />
    </main>
  )
}

export async function getServerSideProps({ req }) {
  const cookies = req.headers.cookie

  let token = null
  if (cookies) {
    // Extract token using regex
    const tokenRegex = /token=([^;]+)/
    const match = cookies.match(tokenRegex)
    token = match ? match[1] : null // so i dont get match undefined error again
  }

  if (!token) {
    return {
      redirect: {
        destination: '/account/loginOrRegister',
        permanent: false,
      },
    }
  }

  // Pass cookies in headers
  const userAndOrders = await fetch(`${NEXT_URL}/api/user`, {
    headers: {
      cookie: `token=${token}`,
    },
  })

  if (!userAndOrders.ok) {
    console.error(`Error fetching user and orders: ${userAndOrders.statusText}`)
    throw new Error('Error fetching user and orders')
  }

  const userAndOrdersData = await userAndOrders.json()

  return {
    props: { userAndOrdersData },
  }
}
