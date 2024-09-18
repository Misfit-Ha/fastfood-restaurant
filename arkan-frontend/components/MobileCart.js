import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Dialog } from '@headlessui/react'

import { FaChevronDown, FaShoppingBasket } from 'react-icons/fa'
import { Button } from './Button'
import NavbarCart from './NavbarCart'
import { SiSpeedtest } from 'react-icons/si'
import CartContext from '../context/CartContext'

export default function MobileCart() {
  let router = useRouter()
  let [isOpen, setIsOpen] = useState(false)
  const { getNumberOfItems } = useContext(CartContext)

  useEffect(() => {
    if (!isOpen) return

    function onRouteChange() {
      setIsOpen(false)
    }

    router.events.on('routeChangeComplete', onRouteChange)
    router.events.on('routeChangeError', onRouteChange)

    return () => {
      router.events.off('routeChangeComplete', onRouteChange)
      router.events.off('routeChangeError', onRouteChange)
    }
  }, [router, isOpen])

  return (
    <>
      <Button
        color='orange'
        variant='thin'
        onClick={() => setIsOpen(true)}
        className='relative md:hidden '
      >
        سبد ({getNumberOfItems.toLocaleString('fa')})
      </Button>

      <Dialog
        open={isOpen}
        onClose={setIsOpen}
        className='fixed inset-0 z-50 flex items-start overflow-y-auto bg-slate-900/50 pr-10 backdrop-blur lg:hidden'
      >
        <Dialog.Panel className='min-h-full w-full max-w-xs bg-slate-100 px-4 pb-12 pt-5 dark:bg-slate-900 sm:px-6'>
          <Dialog.Title className='sr-only'>Navigation</Dialog.Title>
          <div className='flex items-center'>
            <button type='button' onClick={() => setIsOpen(false)}>
              <span className='sr-only'>Close navigation</span>
              <svg
                aria-hidden='true'
                className='h-6 w-6 stroke-slate-500'
                fill='none'
                strokeWidth='2'
                strokeLinecap='round'
              >
                <path d='M5 5l14 14M19 5l-14 14' />
              </svg>
            </button>
            {/*<Link href='/'>
              <a className='ml-6 block mx-auto w-10 overflow-hidden lg:w-auto'>
                <Logo />
              </a>
  </Link>*/}
          </div>
          <div className='py-5'>
            <NavbarCart />
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}
