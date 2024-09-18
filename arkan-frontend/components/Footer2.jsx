import Image from 'next/image'
import Link from 'next/link'

import { Container } from './Container'
import qrCode from '../public/image/avatar.jpg'
import clsx from 'clsx'
import avatarImage from '../public/arkan-logo-small.png'
import { useRouter } from 'next/router'

function Avatar({ large = false, className, ...props }) {
  return (
    <Link
      href='/'
      aria-label='Home'
      className={clsx(className, 'pointer-events-auto')}
      {...props}
    >
      <Image
        src={avatarImage}
        alt=''
        className={clsx(
          'rounded-full bg-slate-100 object-cover dark:bg-slate-900',
          large ? 'h-12 w-12' : 'h-9 w-9'
        )}
        sizes={large ? '4rem' : '2.25rem'}
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    </Link>
  )
}

function NavItem({ href, children }) {
  let isActive = useRouter().pathname === href

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          'relative block px-3 py-2 text-black transition  dark:text-white ',
          isActive
            ? 'text-orange-500 dark:text-orange-400'
            : 'hover:text-orange-500 dark:hover:text-orange-400'
        )}
      >
        <div>
          {children}
          {isActive && (
            <span className='absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-orange-500/0 via-orange-500/40 to-orange-500/0 dark:from-orange-400/0 dark:via-orange-400/40 dark:to-orange-400/0' />
          )}
        </div>
      </Link>
    </li>
  )
}

export function Footer2() {
  return (
    <footer className='border-t border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-950'>
      <Container>
        <div className='flex flex-col items-center justify-between gap-y-12 pb-6  md:items-start lg:flex-row lg:items-center lg:py-16'>
          <div>
            <div className='flex items-center py-5 text-slate-800 dark:text-slate-200'>
              <Avatar large />
              <div className='ml-4'>
                <p className='text-base font-bold '>Arkan</p>
                <p className='mt-1 text-sm'>
                  Arkan specialty burgers and fastfood restaurant
                </p>
              </div>
            </div>
          </div>
          <div className='group relative -mx-4 flex items-center self-auto rounded-2xl p-4 transition-colors hover:bg-zinc-100 dark:hover:bg-slate-800/40 lg:mx-0 lg:self-auto lg:p-6'>
            <div className='relative flex h-24 w-24 flex-none items-center justify-center '>
              <Image
                src={qrCode}
                alt=''
                className='rounded-md'
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
            <div className='ml-8 lg:w-64 '>
              <p className='text-right text-base font-bold text-slate-800 dark:text-slate-200'>
                <Link
                  className='text-orange-600'
                  href='https://goo.gl/maps/CsXA7KZ6Nb3jgafX7'
                >
                  <span className='absolute  inset-0 text-right sm:rounded-2xl  ' />
                  خیابان فرودگاه، جنب مدرسه سما
                </Link>
              </p>
              <div className='mt-1 flex justify-between text-right text-sm text-slate-700 dark:text-slate-300  '>
                <p className='text-sm'>۰۹۰۸ ۴۵۵ ۶۰۷۰</p>
                <p>شماره تماس</p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center border-t border-slate-200  pb-12 pt-8 dark:border-slate-800 md:flex-row-reverse md:justify-between md:pt-6'>
          <form className=' flex w-full flex-col  place-items-center justify-center md:w-auto md:flex-row '>
            <ul className='-mt-1 flex  bg-inherit text-sm font-medium text-slate-800'>
              <NavItem href='/#Locations'>آدرس</NavItem>
              <NavItem href='/#Galley'>گالری</NavItem>
              <NavItem href='/#get-started-today'>درباره ما</NavItem>
              <NavItem href='/order'>سفارش</NavItem>
              <NavItem href='/'>خانه</NavItem>
            </ul>
            <Link
              href='https://www.instagram.com/arkan.burger/'
              className='ml-4 flex-none'
            >
              <span className='hidden text-slate-500 dark:text-slate-300 lg:inline'>
                اینستاگرام ما را دنبال کنید
              </span>
              <span className='text-slate-500 dark:text-slate-300 lg:hidden'>
                اینستاگرام ما را دنبال کنید
              </span>
            </Link>
          </form>
          <p className='mt-6 text-sm text-slate-500 md:mt-0'>
            &copy; Copyright {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
