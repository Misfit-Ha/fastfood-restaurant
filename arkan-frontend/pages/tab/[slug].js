import { Container } from '../../components/Container'
import { Footer2 } from '../../components/Footer2'
import { Header3 } from '../../components/Header3'
import { API_URL, NEXT_URL } from '../../config'
import cookie from 'cookie'
const products = [
  {
    id: 1,
    name: 'Nomad Tumbler',
    description:
      'This durable and portable insulated tumbler will keep your beverage at the perfect temperature during your next adventure.',
    href: '#',
    price: '35.00',
    status: 'Preparing to ship',
    step: 1,
    date: 'March 24, 2021',
    datetime: '2021-03-24',
    address: ['Floyd Miles', '7363 Cynthia Pass', 'Toronto, ON N3Y 4H8'],
    email: 'f•••@example.com',
    phone: '1•••••••••40',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/confirmation-page-03-product-01.jpg',
    imageAlt: 'Insulated bottle with white base and black snap lid.',
  },
  {
    id: 2,
    name: 'Minimalist Wristwatch',
    description:
      'This contemporary wristwatch has a clean, minimalist look and high quality components.',
    href: '#',
    price: '149.00',
    status: 'Shipped',
    step: 0,
    date: 'March 23, 2021',
    datetime: '2021-03-23',
    address: ['Floyd Miles', '7363 Cynthia Pass', 'Toronto, ON N3Y 4H8'],
    email: 'f•••@example.com',
    phone: '1•••••••••40',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/confirmation-page-03-product-02.jpg',
    imageAlt:
      'Arm modeling wristwatch with black leather band, white watch face, thin watch hands, and fine time markings.',
  },
  // More products...
]

function convertStateToStep(state) {
  const states = {
    unconfirmed: 0,
    confirmed: 1,
    ready: 2,
    delivered: 3,
    cancelled: 0,
  }

  return states[state]
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function orderSummeryPage({ odr }) {
  const customerSideID = `${odr.id}`
  const step = convertStateToStep(odr.attributes.state)
  let gregorianDate = new Date(odr.attributes.createdAt)
  let shamsiDateTime = new Intl.DateTimeFormat('fa-IR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(gregorianDate)
  console.log(odr)
  return (
    <main className='bg-slate-50 dark:bg-slate-900'>
      <Header3 />
      <Container className=''>
        <div className='mx-auto mt-5 max-w-3xl rounded-md bg-white px-4 py-16 dark:bg-slate-800/20 sm:px-6 sm:py-5 lg:px-8'>
          <div className='max-w-xl'>
            <h1 className='text-right text-sm font-semibold uppercase tracking-wide text-orange-600'>
              ! از خرید شما متشکریم
            </h1>
            <p className='mt-2 text-right text-4xl font-extrabold tracking-tight dark:text-slate-100 sm:text-5xl'>
              ! سفارش شما در راه است
            </p>
            <p className='mt-2 text-right text-base text-slate-600  dark:text-slate-400'>
              سفارش شماره ی {odr.id.toLocaleString('fa')} به آشپزخونه ی آرکان
              فرستاده شد. وضعیت سفارش به شما موبایلتون فرستاده میشود
            </p>

            <dl className='mt-12 text-right text-sm font-medium'>
              <dt className='text-slate-900 dark:text-slate-200'>کد پیگیری</dt>
              <dd className='mt-2 text-orange-600'>{customerSideID}</dd>
            </dl>
          </div>

          <h3 className='sr-only'>سبد خرید</h3>
          <div className='mx-auto mt-10  max-w-xl border-t border-slate-200 dark:border-slate-700/40 dark:text-slate-200 sm:py-5 lg:px-8'>
            {odr.attributes.cartItems?.map((i) => (
              <div
                className='flex flex-row justify-between text-sm  '
                key={i.title}
              >
                <p className='self-center [direction:rtl]'>
                  <span className='font-bold '>
                    {parseInt(i.price).toLocaleString('fa')}
                  </span>
                  &ensp;تومان
                </p>
                <p className='self-center [direction:rtl]'>
                  <span>x</span>
                  {i.quantity.toLocaleString('fa')}
                </p>
                <p className=' w-[105px] text-right'>{i.title}</p>
              </div>
            ))}

            <div className='flex flex-row justify-between border-b dark:border-slate-700/40'>
              <p className=' [direction:rtl] '>
                <span className='font-bold'>
                  {parseInt(odr.attributes.total).toLocaleString('fa')}
                </span>
                &ensp;تومان
              </p>

              <p>مجموع</p>
            </div>

            <div className='text-right  '>
              <h3 className='sr-only'>اطلاعات شما</h3>

              <h4 className='sr-only'>مشخصات</h4>
              <dl className='grid grid-cols-2 gap-x-6 py-10 text-sm'>
                <div>
                  <dt className='font-medium text-slate-900 dark:text-slate-200'>
                    مشخصات
                  </dt>
                  <dd className='mt-2 text-slate-700 dark:text-slate-400'>
                    <address className='not-italic'>
                      <span className='block'>
                        {odr.attributes.deliveryInformation.phonenumber}
                      </span>
                      <span className='block'>
                        {odr.attributes.deliveryInformation.firstName}{' '}
                        {odr.attributes.deliveryInformation.lastName}
                      </span>
                      <span className='block'>
                        {odr.attributes.deliveryMethod == 'مراجعه حضوری'
                          ? 'مراجعه حضوری'
                          : odr.attributes.deliveryInformation.address}
                      </span>
                    </address>
                  </dd>
                </div>
                <div>
                  <dt className='font-medium text-slate-900 dark:text-slate-200'>
                    نوع پرداخت
                  </dt>
                  <dd className='mt-2 text-slate-700 dark:text-slate-400'>
                    <p>{odr.attributes.paymentMehod}</p>
                  </dd>
                </div>
              </dl>

              <dl className='grid  grid-cols-2 gap-x-6 border-t border-slate-200 py-10 text-sm dark:border-slate-700/40'>
                <div className='col-start-2'>
                  <dt className='font-medium text-slate-900 dark:text-slate-200'>
                    نحو ارسال
                  </dt>
                  <dd className='mt-2 text-slate-700 dark:text-slate-400'>
                    <p>{odr.attributes.deliveryMethod}</p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* statue */}
          <div className='border-t border-slate-200 px-4 py-6 dark:border-slate-700/40 sm:px-6 lg:p-8'>
            <h4 className='sr-only'>Status</h4>
            <p className='text-center text-sm font-medium text-slate-900 dark:text-slate-200'>
              سفارش شما در تاریخ&nbsp;
              <time dateTime={odr.attributes.createdAt}> {shamsiDateTime}</time>
              &nbsp; ثبت شد
            </p>
            <div className='mt-6' aria-hidden='true'>
              <div className='overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700/90'>
                <div
                  className='h-2 rounded-full bg-orange-600'
                  style={{ width: `calc((${step} * 2 + 1) / 8 * 100%)` }}
                />
              </div>
              <div className='mt-6 hidden grid-cols-4 text-sm font-medium text-slate-600 sm:grid'>
                <div className='text-orange-600'>ثبت سفارش</div>
                <div
                  className={classNames(
                    step > 0 ? 'text-orange-600' : '',
                    'text-center'
                  )}
                >
                  آماده سازی
                </div>
                <div
                  className={classNames(
                    step > 1 ? 'text-orange-600' : '',
                    'text-center'
                  )}
                >
                  ارسال
                </div>
                <div
                  className={classNames(
                    step > 2 ? 'text-orange-600' : '',
                    'text-right'
                  )}
                >
                  تحویل
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer2 />
    </main>
  )
}
export async function getServerSideProps({ req, query: { slug } }) {
  try {
    // Get cookies from request
    const cookies = req.headers.cookie

    // Extract token using regex
    const tokenRegex = /token=([^;]+)/
    const match = cookies.match(tokenRegex)
    const token = match ? match[1] : null

    const res = await fetch(`${API_URL}/api/orders/${slug}`)
    if (!res.ok) {
      console.error(`Error fetching order: ${res.statusText}`)
      throw new Error('Error fetching order')
    }
    const tabOrder = await res.json()

    // Pass cookies in headers
    const userAndOrders = await fetch(`${NEXT_URL}/api/user`, {
      headers: {
        cookie: `token=${token}`,
      },
    })

    if (!userAndOrders.ok) {
      console.error(
        `Error fetching user and orders: ${userAndOrders.statusText}`
      )
      throw new Error('Error fetching user and orders')
    }

    const userAndOrdersData = await userAndOrders.json()

    // Check if the current order exists in the user's list of orders
    const orderExistsInUserOrders = userAndOrdersData.user.orders.some(
      (userOrder) => userOrder.id === tabOrder.data.id
    )

    if (!orderExistsInUserOrders) {
      return {
        notFound: true,
      }
    }

    if (tabOrder.data && tabOrder.data.id) {
      return {
        props: {
          odr: tabOrder.data,
        },
      }
    } else {
      return {
        notFound: true,
      }
    }
  } catch (error) {
    console.error(`Caught error: ${error.message}`)

    // Return a generic error page instead of a 404 page for other types of errors
    return {
      props: { error: 'An error occurred while processing your request.' },
    }
  }
}
