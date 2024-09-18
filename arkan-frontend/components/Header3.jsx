import Link from 'next/link'
import Head from 'next/head'

import { useRouter } from 'next/router'
import { Listbox, Popover, Transition } from '@headlessui/react'
import clsx from 'clsx'

import { Container } from './Container'
import avatarImage from '../public/arkan-logo-small.png'
import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import CartContext from '../context/CartContext'
import NavbarCart from './NavbarCart'
import AuthContext, { AuthProvider } from '../context/AuthContext'
import {
  FaBasketShopping,
  FaArrowRightFromBracket,
  FaReceipt,
  FaAddressCard,
  FaRegCircleUser,
} from 'react-icons/fa6'
import { usePathname } from 'next/navigation'
import { FaRegUserCircle, FaUserCircle } from 'react-icons/fa'

const loggedInLinks = [
  {
    title: 'رسید سفارشات',
    icon: FaReceipt,
    path: '/receipts ',
  },
  {
    title: 'تغییر اطلاعات',
    icon: FaAddressCard,
    path: '/changeInfo',
  },
]

const notLoggedInLink = [
  {
    title: 'ثبت نام / ورود',
    icon: FaRegCircleUser,
    path: '/account/loginOrRegister',
  },
]

function CloseIcon(props) {
  return (
    <svg viewBox='0 0 24 24' aria-hidden='true' {...props}>
      <path
        d='m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

function ChevronDownIcon(props) {
  return (
    <svg viewBox='0 0 8 6' aria-hidden='true' {...props}>
      <path
        d='M1.75 1.75 4 4.25l2.25-2.5'
        fill='none'
        strokeWidth='1.3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

function SunIcon(props) {
  return (
    <svg
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
      {...props}
    >
      <path d='M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z' />
      <path
        d='M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061'
        fill='none'
      />
    </svg>
  )
}

function MoonIcon(props) {
  return (
    <svg viewBox='0 0 24 24' aria-hidden='true' {...props}>
      <path
        d='M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

function SlidingBackground({ top, divRef }) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (divRef.current) {
      setDimensions({
        width: divRef.current.offsetWidth,
        height: divRef.current.offsetHeight,
      })
    }
  }, [divRef])

  return (
    <div
      className='absolute -z-10 rounded-[0.625rem]  bg-slate-100 transition-all duration-200 dark:bg-slate-900/40'
      style={{
        top: top,
        width: dimensions.width,
        height: dimensions.height,
      }}
    ></div>
  )
}
//TODO when user logsout setTop doesnt get set to 0
function DesktopAccountRoutesList({ showLinks }) {
  const path = usePathname()
  const [top, setTop] = useState(0)
  const divRef = useRef(null)

  const { logout, user } = useContext(AuthContext)

  const links =
    user && !user.usedQuickRegister ? loggedInLinks : notLoggedInLink

  return (
    <div dir='rtl' className='absolute '>
      <div>
        {showLinks && (
          <div className='relative mt-10 flex'>
            <Listbox
              as='div'
              className='pointer-events-auto z-20 space-y-1  rounded-xl bg-white p-3  text-sm font-medium shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-800   dark:ring-white/5 '
            >
              {links.map((link, index) => (
                <Listbox.Option
                  ref={divRef}
                  className={
                    'relative flex cursor-pointer select-none items-center justify-start rounded-[0.625rem]  p-1'
                  }
                  key={index}
                  onMouseEnter={(e) => {
                    setTop(e.currentTarget.offsetTop)
                  }}
                >
                  <div className='rounded-md bg-white p-1 shadow ring-1 ring-slate-900/5 dark:bg-slate-700 dark:ring-inset dark:ring-white/5'>
                    <link.icon
                      className={clsx(
                        'h-4 w-4',
                        path === link.path
                          ? 'fill-sky-400 dark:fill-sky-400'
                          : 'fill-slate-400'
                      )}
                    />
                  </div>
                  <Link
                    href={link.path}
                    className={clsx('mr-3', {
                      'text-blue-600': path === link.path,
                      'text-sky-400 dark:text-sky-400': path === link.path,
                      'text-slate-700 dark:text-slate-400': path !== link.path,
                    })}
                  >
                    {link.title}
                  </Link>
                </Listbox.Option>
              ))}
              {user && !user.usedQuickRegister && (
                <Listbox.Option
                  ref={divRef}
                  className={
                    'relative flex cursor-pointer select-none items-center justify-start rounded-[0.625rem] p-1 text-slate-700  dark:text-slate-400'
                  }
                  key={'3'}
                  onMouseEnter={(e) => {
                    setTop(e.currentTarget.offsetTop)
                  }}
                  onClick={(e) => {
                    logout()
                    setTop(0)
                  }}
                >
                  <div className='rounded-md bg-white p-1 shadow ring-1 ring-slate-900/5 dark:bg-slate-700 dark:ring-inset dark:ring-white/5'>
                    <FaArrowRightFromBracket
                      className={'h-4 w-4 fill-slate-400'}
                    />
                  </div>
                  <span className='mr-3'>خروج</span>
                </Listbox.Option>
              )}

              {top > 0 && <SlidingBackground top={top - 4} divRef={divRef} />}
            </Listbox>
          </div>
        )}
      </div>
    </div>
  )
}

function MobileNavItem({ href, children, className }) {
  return (
    <li>
      <Popover.Button
        as={Link}
        href={href}
        className={clsx(
          className,
          'block py-2 text-slate-800  dark:text-slate-300'
        )}
      >
        {children}
      </Popover.Button>
    </li>
  )
}

function MobileLogoutButton({}) {
  const { logout } = useContext(AuthContext)
  return (
    <li>
      <Popover.Button
        onClick={logout}
        className='mx-auto block py-2  text-slate-800 dark:text-slate-300'
      >
        خروج
      </Popover.Button>
    </li>
  )
}
function MobileNavigation(props) {
  const { user } = useContext(AuthContext)

  return (
    <Popover {...props}>
      <Popover.Button className='group rounded-full bg-white/80 px-3 py-2 shadow-lg shadow-slate-800/5 ring-1 ring-slate-900/5 backdrop-blur transition dark:bg-slate-900/80 dark:shadow-slate-100/5 dark:ring-white/10 dark:hover:ring-white/20'>
        <ChevronDownIcon className=' h-6 w-6 fill-slate-100 stroke-slate-500 transition group-hover:fill-slate-200 group-hover:stroke-slate-700 dark:fill-slate-700 dark:stroke-slate-500 [@media(prefers-color-scheme:dark)]:fill-orange-50 [@media(prefers-color-scheme:dark)]:stroke-orange-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-orange-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-orange-600' />
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter='duration-150 ease-out'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='duration-150 ease-in'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Popover.Overlay className='fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm dark:bg-black/80' />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter='duration-150 ease-out'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='duration-150 ease-in'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <Popover.Panel
            focus
            className='fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-slate-800'
          >
            <div className='flex flex-row-reverse items-center justify-between'>
              <Popover.Button
                aria-label='Close menu'
                className='absolute -m-1 p-1'
              >
                <CloseIcon className='h-6 w-6 text-slate-500 dark:text-slate-400' />
              </Popover.Button>
              <h2 className=' mx-auto text-sm font-medium text-slate-600 dark:text-slate-400'>
                صفحات
              </h2>
            </div>
            <nav className='mt-6'>
              <ul className='-my-2 divide-y divide-slate-100 text-center text-base text-slate-800 dark:divide-slate-100/5 dark:text-slate-300'>
                <MobileNavItem href='/'>خانه</MobileNavItem>
                <MobileNavItem href='/order'>سفارش آنلاین</MobileNavItem>
                <MobileNavItem href='/#Galley'>گالری</MobileNavItem>
                <MobileNavItem href='/#Locations'>آدرس</MobileNavItem>
                {user && !user.usedQuickRegister ? (
                  <>
                    <MobileNavItem
                      className={'w-full border-t-2 border-orange-600'}
                      href='/receipts'
                    >
                      رسید سفارشات
                    </MobileNavItem>
                    <MobileNavItem href='/ChangeInfo'>
                      تغییر اطلاعات
                    </MobileNavItem>
                    <MobileLogoutButton />
                  </>
                ) : (
                  <MobileNavItem
                    className={'w-full border-t-2 border-orange-600'}
                    href='/account/loginOrRegister'
                  >
                    ورود یا ثبت نام
                  </MobileNavItem>
                )}
              </ul>
            </nav>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  )
}

function NavItem({ href, children }) {
  let isActive = useRouter().pathname === href

  return (
    <li>
      <Link
        href={href}
        className={clsx(
          'relative block px-3 py-2 text-center text-black transition  dark:text-white ',
          isActive
            ? 'text-orange-500 dark:text-orange-400'
            : 'hover:text-orange-500 dark:hover:text-orange-400'
        )}
      >
        <div>
          {children}
          {isActive && (
            <span className='absolute inset-x-1 -bottom-px h-[2px] bg-gradient-to-r from-orange-500/0 via-orange-500/40 to-orange-500/0 dark:from-orange-400/0 dark:via-orange-400/40 dark:to-orange-400/0' />
          )}
        </div>
      </Link>
    </li>
  )
}

function DesktopNavigation(props) {
  return (
    <nav {...props}>
      <ul className=' flex whitespace-nowrap  rounded-full bg-white/80 px-3 text-sm font-medium text-slate-800 shadow-lg shadow-slate-800/5 ring-1 ring-slate-900/5 backdrop-blur dark:bg-slate-900/80 dark:text-slate-200 dark:shadow-slate-100/5 dark:ring-white/10'>
        <NavItem href='/#locations'>آدرس</NavItem>
        <NavItem href='/#Galley'>گالری</NavItem>
        <NavItem href='/order'>سفارش</NavItem>
        <NavItem href='/'>خانه</NavItem>
      </ul>
    </nav>
  )
}
function ModeToggle() {
  const { setDarkMode } = useContext(AuthContext)

  function disableTransitionsTemporarily() {
    document.documentElement.classList.add('[&_*]:!transition-none')
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
  }

  function toggleMode() {
    disableTransitionsTemporarily()

    let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    let isSystemDarkMode = darkModeMediaQuery.matches
    let isDarkMode = document.documentElement.classList.toggle('dark')

    setDarkMode(isDarkMode)

    if (isDarkMode === isSystemDarkMode) {
      delete window.localStorage.isDarkMode
    } else {
      window.localStorage.isDarkMode = isDarkMode
    }
  }

  return (
    <button
      type='button'
      aria-label='Toggle dark mode'
      className='group rounded-full bg-white/80 px-3 py-2 shadow-lg shadow-slate-800/5 ring-1 ring-slate-900/5 backdrop-blur transition dark:bg-slate-900/80 dark:shadow-slate-100/5 dark:ring-white/10 dark:hover:ring-white/20'
      onClick={toggleMode}
    >
      <SunIcon className='h-6 w-6 fill-slate-100 stroke-slate-500 transition group-hover:fill-slate-200 group-hover:stroke-slate-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-orange-50 [@media(prefers-color-scheme:dark)]:stroke-orange-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-orange-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-orange-600' />
      <MoonIcon className='hidden h-6 w-6 fill-slate-700 stroke-slate-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-slate-400 [@media_not_(prefers-color-scheme:dark)]:fill-orange-400/10 [@media_not_(prefers-color-scheme:dark)]:stroke-orange-500' />
    </button>
  )
}

function clamp(number, a, b) {
  let min = Math.min(a, b)
  let max = Math.max(a, b)
  return Math.min(Math.max(number, min), max)
}

function AvatarContainer({ className, ...props }) {
  return (
    <div
      className={clsx(
        className,
        'hidden h-10 w-10 rounded-full bg-white/80 p-0.5 shadow-lg shadow-slate-800/5 ring-1 ring-slate-900/5 backdrop-blur dark:bg-slate-900/80 dark:shadow-slate-100/5 dark:ring-white/10 md:block'
      )}
      {...props}
    />
  )
}

function Avatar({ large = false, className, toggleShowLinks, ...props }) {
  return (
    <Link
      href='/'
      aria-label='Home'
      className={clsx(className, 'pointer-events-auto')}
      onClick={(event) => {
        event.preventDefault()
        toggleShowLinks()
      }}
      {...props}
    >
      <FaUserCircle className={'h-9 w-9 rounded-full fill-orange-600'} />
    </Link>
  )
}

function MobileCart2(props) {
  const { getNumberOfItems } = useContext(CartContext)

  return (
    <Popover {...props}>
      <Popover.Button className='group  rounded-full bg-arkanOrange/80 px-3 py-2 text-sm font-medium text-white shadow-lg shadow-slate-800/5 ring-1 ring-slate-900/5 backdrop-blur dark:bg-slate-900/80 dark:text-slate-200 dark:shadow-slate-100/5 dark:ring-white/10 dark:hover:ring-white/20'>
        <FaBasketShopping className='h-6 w-6 fill-white dark:fill-slate-500' />
        {getNumberOfItems > 0 && (
          <span className='absolute right-0 top-0  -translate-y-1/2 translate-x-1/2 rounded-full bg-red-600 px-2 py-1 text-xs font-bold leading-none text-red-100'>
            {getNumberOfItems.toLocaleString('fa')}
          </span>
        )}
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter='duration-150 ease-out'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='duration-150 ease-in'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Popover.Overlay className='fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm dark:bg-black/80' />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter='duration-150 ease-out'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='duration-150 ease-in'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <Popover.Panel
            focus
            className='fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-slate-900/5 dark:bg-slate-900 dark:ring-slate-800'
          >
            <div className='flex flex-row-reverse items-center justify-between'>
              <Popover.Button aria-label='Close menu' className='-m-1 p-1'>
                <CloseIcon className='h-6 w-6 text-slate-500 dark:text-slate-400' />
              </Popover.Button>
            </div>
            <nav className='mt-6'>
              <NavbarCart />
            </nav>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  )
}

export function Header3({
  title = 'Arkan Burger ',
  description = 'order arkan style of burgers online',
  keywords = 'online food order, fastfood, burger, pizza,hotdogs , salads,',
}) {
  const [showLinks, setShowLinks] = useState(false)

  const toggleShowLinks = () => setShowLinks(!showLinks)
  let isHomePage = useRouter().pathname === '/'

  let headerRef = useRef()
  let avatarRef = useRef()
  let isInitial = useRef(true)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        if (showLinks) {
          setShowLinks(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [headerRef, showLinks])

  useEffect(() => {
    let downDelay = avatarRef.current?.offsetTop ?? 0
    let upDelay = 64

    function setProperty(property, value) {
      document.documentElement.style.setProperty(property, value)
    }

    function removeProperty(property) {
      document.documentElement.style.removeProperty(property)
    }

    function updateHeaderStyles() {
      let { top, height } = headerRef.current.getBoundingClientRect()
      let scrollY = clamp(
        window.scrollY,
        0,
        document.body.scrollHeight - window.innerHeight
      )

      if (isInitial.current) {
        setProperty('--header-position', 'sticky')
      }

      setProperty('--content-offset', `${downDelay}px`)

      if (isInitial.current || scrollY < downDelay) {
        setProperty('--header-height', `${downDelay + height}px`)
        setProperty('--header-mb', `${-downDelay}px`)
      } else if (top + height < -upDelay) {
        let offset = Math.max(height, scrollY - upDelay)
        setProperty('--header-height', `${offset}px`)
        setProperty('--header-mb', `${height - offset}px`)
      } else if (top === 0) {
        setProperty('--header-height', `${scrollY + height}px`)
        setProperty('--header-mb', `${-scrollY}px`)
      }

      if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
        setProperty('--header-inner-position', 'fixed')
        removeProperty('--header-top')
        removeProperty('--avatar-top')
      } else {
        removeProperty('--header-inner-position')
        setProperty('--header-top', '0px')
        setProperty('--avatar-top', '0px')
      }
    }

    function updateStyles() {
      updateHeaderStyles()
      isInitial.current = false
    }

    updateStyles()
    window.addEventListener('scroll', updateStyles, { passive: true })
    window.addEventListener('resize', updateStyles)

    return () => {
      window.removeEventListener('scroll', updateStyles, { passive: true })
      window.removeEventListener('resize', updateStyles)
    }
  }, [isHomePage])

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
      </Head>

      <header
        className='pointer-events-none relative z-50 flex flex-col bg-transparent '
        style={{
          height: 'var(--header-height)',
          marginBottom: 'var(--header-mb)',
        }}
      >
        <div
          ref={headerRef}
          className='top-0 z-10 h-16 pt-6 '
          style={{ position: 'var(--header-position)' }}
        >
          <Container
            className='top-[var(--header-top,theme(spacing.6))] w-full'
            style={{ position: 'var(--header-inner-position)' }}
          >
            <div className='relative flex gap-4'>
              <div className='flex flex-1'>
                <MobileCart2 className='pointer-events-auto md:hidden' />
                <AvatarContainer>
                  <Avatar toggleShowLinks={toggleShowLinks} />
                </AvatarContainer>
                <AuthProvider>
                  <DesktopAccountRoutesList
                    showLinks={showLinks}
                    toggleShowLinks={toggleShowLinks}
                  />
                </AuthProvider>
              </div>

              <div className='flex flex-1 justify-end md:justify-center '>
                <MobileNavigation className='pointer-events-auto md:hidden' />
                <DesktopNavigation className='pointer-events-auto hidden md:block ' />
              </div>
              <div className='flex justify-end md:flex-1'>
                <div className='pointer-events-auto'>
                  <ModeToggle />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>

      {/*isHomePage && <div style={{ height: 'var(--content-offset)' }} />*/}
    </>
  )
}
