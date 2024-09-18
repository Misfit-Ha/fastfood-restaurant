'use client'
import {
  CheckIcon,
  ChevronUpIcon,
  EyeIcon,
  NoSymbolIcon,
  TruckIcon,
} from '@heroicons/react/20/solid'
import { Fragment, forwardRef, useEffect, useState } from 'react'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { Disclosure } from '@headlessui/react'
import clsx from 'clsx'
import updateOrderStateRevalidate from '@/lib/actions'
import { BellAlertIcon } from '@heroicons/react/20/solid'
import { socket } from '@/app/socket'

const stateDetails = {
  unconfirmed: {
    class: 'text-amber-700 ring-amber-600',
    transition: 'confirmed',
    buttonText: 'Confirm?',
    icon: (
      <BellAlertIcon className='h-5 w-5 text-amber-700' aria-hidden='true' />
    ),
  },
  confirmed: {
    class: 'text-blue-700 ring-blue-600',
    transition: 'ready',
    buttonText: 'Ready?',
    icon: <EyeIcon className='h-5 w-5 text-blue-700' aria-hidden='true' />,
  },
  ready: {
    class: 'text-purple-700 ring-purple-600',
    transition: 'delivered',
    buttonText: 'Delivered?',
    icon: <TruckIcon className='h-5 w-5 text-purple-700' aria-hidden='true' />,
  },
  delivered: {
    class: 'text-emerald-700 ring-emerald-600',
    buttonText: 'Delivered',
    icon: <CheckIcon className='h-5 w-5 text-emerald-700' aria-hidden='true' />,
  },
  canceled: {
    class: 'text-red-700 ring-red-600',
    icon: <NoSymbolIcon className='h-5 w-5 text-red-700' aria-hidden='true' />,
  },
}

function transformOrderData(order) {
  return {
    id: order.data.id,
    customerName: `${order.data.attributes.deliveryInformation.firstName} ${order.data.attributes.deliveryInformation.lastName}`,
    phoneNumber: order.data.attributes.deliveryInformation.phonenumber,
    totalPrice: parseFloat(order.data.attributes.total),
    items: order.data.attributes.cartItems.map((item) => ({
      name: item.title,
      quantity: item.quantity,
    })),
    address: order.data.attributes.deliveryInformation.address,
    coordinates: `${order.data.attributes.coordinates.lat},${order.data.attributes.coordinates.lng}`,
    notes: order.data.attributes.note,
    state: order.data.attributes.state,
  }
}

export const DesktopCard = forwardRef(function DesktopCard(
  { order, As = 'li', ...props },
  ref
) {
  const [loading, setLoading] = useState(false)
  const [buttonText, setButtonText] = useState('Confirm')
  const [currentState, setCurrentState] = useState(order.state)

  const handleButtonClick = async () => {
    setLoading(true)
    setButtonText('Loading...')
    await new Promise((resolve) => setTimeout(resolve, 5000))

    try {
      const nextState = stateDetails[currentState].transition
      if (!nextState) {
        throw new Error(`Invalid state transition from ${currentState}`)
      }

      await updateOrderStateRevalidate(order.id, nextState)
      setCurrentState(nextState)
      setButtonText(nextState === 'delivered' ? 'Delivered' : 'Confirm')
    } catch (error) {
      console.error('Error updating order state:', error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <As {...props}>
      <div className='flex min-h-72 items-center space-x-6 p-6'>
        <div className='flex w-full flex-col text-center md:text-start'>
          <div className='flex justify-center space-x-3 md:justify-between'>
            <h3 className='truncate text-sm font-medium text-gray-900'>
              {order.id} - {order.customerName}
            </h3>
            <span
              className={clsx(
                'inline-flex flex-shrink-0 items-center rounded-full px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
                stateDetails[currentState].class
              )}
            >
              {currentState}
            </span>
          </div>
          <p className='mt-1 truncate text-sm text-gray-500'>
            {order.phoneNumber}
          </p>
          <p className='mt-1 truncate text-sm text-gray-500'>{order.address}</p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${order.coordinates}`}
            className='mt-1 truncate text-sm text-blue-500'
          >
            Map
          </a>
          <p className='mt-1 truncate text-sm text-gray-500'>
            {order.notes ? order.notes : 'No note'}
          </p>
          <p className='mt-1 truncate text-sm text-gray-500'>
            Total Price: {order.totalPrice}
          </p>
          <ul className='mt-1 truncate text-sm text-gray-500'>
            {order.items.map((item) => (
              <li key={order.id + '-' + item.id}>
                {item.name}: {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <div className='-mt-px flex divide-x divide-gray-200'>
          <div className='-ml-px flex w-0 flex-1'>
            <button
              className={clsx(
                'relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold',
                currentState === 'delivered' || loading
                  ? 'text-gray-500'
                  : 'text-gray-900 hover:bg-gray-100'
              )}
              onClick={handleButtonClick}
              disabled={currentState === 'delivered' || loading}
            >
              {stateDetails[currentState].icon}
              {loading ? 'Loading...' : stateDetails[currentState].buttonText}
            </button>
          </div>
        </div>
      </div>
    </As>
  )
})

const MobileCard = forwardRef(function MobileCard({ order, ...props }, ref) {
  return (
    <Disclosure {...props} as='li' key={order.id}>
      {({ open }) => (
        <>
          <Disclosure.Button className='flex w-full'>
            <UserCircleIcon className='h-12 w-12 flex-none rounded-full bg-gray-50' />
            <div className='min-w-0 flex-auto'>
              <p className='text-left text-sm font-semibold leading-6 text-gray-900'>
                <a href={'#'}>
                  <span className='absolute inset-x-0 -top-px bottom-0' />
                  {order.customerName}
                </a>
              </p>
              <p className='mt-1 flex text-xs leading-5 text-gray-500'>
                <a
                  href={`mailto:${order.phoneNumber}`}
                  className='relative truncate hover:underline'
                >
                  {order.phoneNumber}
                </a>
              </p>
            </div>
            <div className='flex items-center gap-x-4'>
              <div className='hidden sm:flex sm:flex-col sm:items-end'>
                <p className='text-sm leading-6 text-gray-900'>
                  {order.totalPrice}
                </p>
                <div className='mt-1 flex items-center gap-x-1.5'>
                  <span
                    className={clsx(
                      'inline-flex flex-shrink-0 items-center rounded-full px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset',
                      stateDetails[order.state].class
                    )}
                  >
                    {order.state}
                  </span>
                </div>
              </div>

              <div
                className={clsx(
                  `h-3 w-3 rounded-full ${stateDetails[order.state].class}`,
                  {
                    'animate-pulse bg-amber-500': order.state === 'unconfirmed',
                  }
                )}
              />

              <ChevronUpIcon
                className={clsx(
                  open ? 'rotate-180 transform' : '',
                  'h-5 w-5 scale-150 font-bold text-gray-500'
                )}
              />
            </div>
          </Disclosure.Button>
          <Disclosure.Panel as='div' className='mt-2'>
            <DesktopCard
              order={order}
              As='div'
              className='pointer-events-auto rounded-lg shadow'
            />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
})

export default function SocketOrders() {
  const [orders, setOrders] = useState([])
  const [isConnected, setIsConnected] = useState(false)
  const [isReconnecting, setIsReconnecting] = useState(false)
  const [transport, setTransport] = useState('N/A')

  useEffect(() => {
    Notification.requestPermission()

    if (socket.connected) {
      onConnect()
    }

    function onConnect() {
      setIsConnected(true)
      setTransport(socket.io.engine.transport.name)

      socket.io.engine.on('upgrade', (transport) => {
        setTransport(transport.name)
      })
    }

    function onDisconnect() {
      setIsConnected(false)
      setTransport('N/A')
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('reconnect_attempt', () => {
      setIsReconnecting(true)
    })

    socket.on('reconnect', () => {
      setIsReconnecting(false)
    })

    socket.on('order:create', (order) => {
      const transformedOrder = transformOrderData(order)
      setOrders((prevOrders) => [transformedOrder, ...prevOrders])
      const items = transformedOrder.items
        .map((item) => `${item.quantity}x${item.name}`)
        .join(', ')

      new Notification(
        `New socket order from ${transformedOrder.customerName}`,
        {
          body: `Total ${transformedOrder.totalPrice}\n${items}`,
        }
      )
    })

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, [])

  return (
    <>
      <p>
        <span
          className={clsx(
            'mr-2 inline-flex h-5 w-5 animate-pulse rounded-full align-middle',
            {
              'bg-green-600': isConnected,
              'bg-red-600': !isConnected,
              'bg-yellow-600': transport === 'polling',
              'bg-gray-600': isReconnecting,
            }
          )}
        ></span>
        {isConnected ? 'Connected' : 'Disconnected'}
      </p>
      <Cards orders={orders} />
    </>
  )
}

export function Cards({ orders }) {
  return (
    <ul
      role='list'
      className='flex flex-col justify-center sm:justify-start md:flex-row md:flex-wrap'
    >
      {orders.map((order, index) => (
        <Fragment key={order.id + '-' + index}>
          <DesktopCard
            order={order}
            className='pointer-events-auto col-span-1 hidden w-1/3 min-w-80 divide-y divide-gray-200 rounded-lg shadow md:block'
          />
          <MobileCard
            order={order}
            className='relative flex flex-col justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 md:hidden'
          />
        </Fragment>
      ))}
    </ul>
  )
}
