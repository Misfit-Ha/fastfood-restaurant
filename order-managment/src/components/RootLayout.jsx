'use client'

import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'
import { socket } from '@/app/socket'
import { signout } from '@/lib/actions'
import { UserCircleIcon } from '@heroicons/react/20/solid'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'All', href: '/dashboard', current: true },
  { name: 'Live', href: '/dashboard/new', current: false },
  { name: 'Log In', href: '/login', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
]

function RootLayoutInner({ children, count }) {
  let pathname = usePathname()

  const currentNavItem = navigation.find((item) => item.href === pathname)
  const [newOrders, setNewOrders] = useState(null)
  //const audio = new Audio(soundFile)
  const router = useRouter()

  useEffect(() => {
    setNewOrders(count)
    socket.on('order:create', (order) => {
      setNewOrders((prevOrders) => prevOrders + 1)
      //audio.play()
    })

    return () => {
      socket.off('order:create')
    }
  }, [count])

  const handleBellClick = () => {
    if (pathname !== '/dashboard/new') {
      console.log('redirecting...')
      router.push('/dashboard/new')
    }
  }
  return (
    <>
      <div className='min-h-screen bg-white'>
        <Disclosure as='nav' className='border-b border-gray-200 bg-white'>
          {({ open }) => (
            <>
              <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className='flex h-16 justify-between'>
                  <div className='flex'>
                    <div className='flex flex-shrink-0 items-center'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className='block h-8 w-auto lg:hidden'
                        src='https://tailwindui.com/img/logos/mark.svg?color=orange&shade=600'
                        alt='Your Company'
                      />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className='hidden h-8 w-auto lg:block'
                        src='https://tailwindui.com/img/logos/mark.svg?color=orange&shade=600'
                        alt='Your Company'
                      />
                    </div>
                    <div className='hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8'>
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={clsx(
                            pathname === item.href
                              ? 'border-orange-500 text-gray-900'
                              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                            'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
                          )}
                          aria-current={
                            pathname === item.href ? 'page' : undefined
                          }
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className='flex items-center sm:ml-6'>
                    <button
                      type='button'
                      className={`mr-2 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${open ? 'hidden' : ''}`}
                      onClick={handleBellClick}
                    >
                      <span className='sr-only'>View notifications</span>
                      <BellIcon className='h-6 w-6' aria-hidden='true' />
                      {newOrders > 0 && (
                        <span className='absolute top-9 h-4 w-4 rounded-full bg-red-600 text-xs text-red-100'>
                          {newOrders}
                        </span>
                      )}
                    </button>
                    {/* Profile dropdown */}
                    <Menu as='div' className='relative ml-3 hidden sm:block'>
                      <div>
                        <Menu.Button className='flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'>
                          <span className='sr-only'>Open user menu</span>
                          <UserCircleIcon className='h-8 w-8 fill-gray-400' />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter='transition ease-out duration-200'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                      >
                        <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={clsx(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                          {/* --------------- Sign out --------------*/}

                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href='#'
                                onClick={async () => {
                                  await signout()
                                }}
                                className={clsx(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Sign Out
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>

                    <div className='-mr-2 flex items-center sm:hidden'>
                      {/* Mobile menu button */}
                      <Disclosure.Button className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'>
                        <span className='sr-only'>Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className='block h-6 w-6'
                            aria-hidden='true'
                          />
                        ) : (
                          <Bars3Icon
                            className='block h-6 w-6'
                            aria-hidden='true'
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className='sm:hidden'>
                <div className='space-y-1 pb-3 pt-2'>
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as='a'
                      href={item.href}
                      className={clsx(
                        item.current
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800',
                        'block border-l-4 py-2 pl-3 pr-4 text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className='border-t border-gray-200 pb-3 pt-4'>
                  <div className='flex items-center px-4'>
                    <div className='flex-shrink-0'>
                      <UserCircleIcon className='h-10 w-10 fill-gray-400' />
                    </div>
                    <div className='ml-3'>
                      <div className='text-base font-medium text-gray-800'>
                        {user.name}
                      </div>
                      <div className='text-sm font-medium text-gray-500'>
                        {user.email}
                      </div>
                    </div>
                    <button
                      type='button'
                      className='ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2'
                      onClick={handleBellClick}
                    >
                      <span className='sr-only'>View notifications</span>
                      <BellIcon className='h-6 w-6' aria-hidden='true' />
                      {newOrders > 0 && (
                        <span className='absolute -mt-2 h-4 w-4 rounded-full bg-red-600 text-xs text-red-100'>
                          {newOrders}
                        </span>
                      )}
                    </button>
                  </div>
                  <div className='mt-3 space-y-1'>
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as='a'
                        href={item.href}
                        className='block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800'
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}

                    {/* ----------------- Sign out ----------------- */}

                    <Disclosure.Button
                      as='a'
                      href='#'
                      onClick={async () => {
                        await signout()
                      }}
                      className='block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800'
                    >
                      Sign Out
                    </Disclosure.Button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <div className='py-10'>
          <div>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
              <h1 className='mb-5 text-3xl font-bold leading-tight tracking-tight text-gray-900'>
                {currentNavItem.name}
              </h1>
            </div>
          </div>
          <main>
            <div className='mx-auto max-w-7xl sm:px-6 lg:px-8'>{children}</div>
          </main>
        </div>
      </div>
    </>
  )
}

export function RootLayout({ lang, count, children }) {
  let pathname = usePathname()
  return (
    <RootLayoutInner lang={lang} count={count} key={pathname}>
      {children}
    </RootLayoutInner>
  )
}
