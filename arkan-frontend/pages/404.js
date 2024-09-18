import Image from 'next/image'
import Link from 'next/link'
import backgroundImage from '../public/image/404-bg.jpg'
import logo from '../public/arkan-logo-small.png'
import { Header3 } from '../components/Header3'

export default function NotFoundPage() {
  return (
    <>
      <Header3
        title={'آرکان - 404'}
        description={'سفارش فست فود و ارسال با پیک رایگان'}
        keywords={'404, فست فود'}
      />
      <div className='-mt-16 flex h-screen min-h-full flex-col bg-white dark:bg-slate-900 lg:relative'>
        <div className='inset-0 hidden lg:absolute lg:inset-y-0 lg:right-0 lg:block lg:w-1/2'>
          <Image
            className='absolute h-full w-full object-cover'
            src={backgroundImage}
            alt='background for 404 page, picture taken in darak, chabahar'
          />
        </div>
        <div className='flex flex-grow flex-col'>
          <main className='flex flex-grow flex-col bg-white dark:bg-slate-900'>
            <div className='mx-auto flex w-full max-w-7xl flex-grow flex-col px-4 sm:px-6 lg:px-8'>
              <div className='my-auto flex-shrink-0 py-16 text-right sm:py-32'>
                <p className='text-base font-semibold text-orange-600'>404</p>
                <h1 className='mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-200 sm:text-5xl'>
                  !صفحه ی مورد نظر پیدا نشد
                </h1>
                <div className='mt-6'>
                  <Link
                    href='/'
                    className='text-base font-medium text-orange-600 hover:text-orange-500'
                  >
                    بازگشت به خانه
                    <span aria-hidden='true'> &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </main>
          <footer className='flex-shrink-0 bg-slate-50 dark:bg-slate-800/40'>
            <div className='mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8'>
              <nav className='flex justify-end space-x-4 '>
                <Link
                  href='/order'
                  className='text-sm font-medium text-slate-500 hover:text-slate-600 dark:hover:text-slate-400'
                >
                  سفارش آنلاین
                </Link>
                <span
                  className='inline-block border-l border-slate-300 dark:border-slate-700/40'
                  aria-hidden='true'
                />
                <Link
                  href='https://www.google.com/maps/place/ArkanBurger/@28.9573251,50.8346774,21z/data=!4m5!3m4!1s0x0:0xc84b728e28d1c2e0!8m2!3d28.9572927!4d50.8347793?coh=164777&entry=tt&shorturl=1'
                  className='text-sm font-medium text-slate-500 hover:text-slate-600 dark:hover:text-slate-400'
                >
                  آدرس
                </Link>
                <span
                  className='inline-block border-l border-slate-300 dark:border-slate-700/40'
                  aria-hidden='true'
                />
                <Link
                  href='https://www.instagram.com/arkan.burger'
                  className='text-sm font-medium text-slate-500 hover:text-slate-600 dark:hover:text-slate-400'
                >
                  اینستاگرام
                </Link>
              </nav>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}
