import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment, useContext, useEffect, useMemo, useState } from 'react'
import { FaCirclePlus, FaPencil, FaRegTrashCan } from 'react-icons/fa6'
import { defaultCenter } from '../config'
import dynamic from 'next/dynamic'
import { AiOutlineClose } from 'react-icons/ai'
import AuthContext from '../context/AuthContext'

function CheckoutEditModal({
  open,
  setOpen,
  selectedAddress,
  updateAddress,
  dragableMarkerPosition,
  setdragableMarkerPosition,
}) {
  const [editedAddress, setEditedAddress] = useState(selectedAddress || {})

  const SimpleMap = useMemo(
    () =>
      dynamic(() => import('../components/SimpleMap'), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  )
  useEffect(() => {
    setEditedAddress(selectedAddress)
  }, [selectedAddress])

  const handleTitleChange = (event) => {
    setEditedAddress({ ...editedAddress, name: event.target.value })
  }

  const handleDescriptionChange = (event) => {
    setEditedAddress({ ...editedAddress, description: event.target.value })
  }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all dark:bg-slate-800 dark:shadow-slate-100/5 sm:my-8 sm:w-full sm:max-w-lg sm:p-6'>
                <div className='absolute left-0 top-0 hidden pl-4 pt-4 sm:block'>
                  <button
                    type='button'
                    className=' focuse:ring-orange-500  rounded-md bg-white text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500  dark:bg-slate-800'
                    onClick={() => setOpen(false)}
                  >
                    <span className='sr-only'>Close</span>
                    <AiOutlineClose className='h-6 w-6' aria-hidden='true' />
                  </button>
                </div>
                <div className=' sm:flex sm:items-start'>
                  <div className='mt-3  w-full  text-center  sm:mt-0 sm:text-left'>
                    <Dialog.Title
                      as='h3'
                      className='text-center text-base font-semibold leading-6 text-slate-900 dark:text-slate-200'
                    >
                      ویرایش آدرس
                    </Dialog.Title>
                    <div className='mt-2 flex w-full items-center justify-center  py-8 '>
                      <div className='mx-auto w-full '>
                        <div className='isolate -space-y-px rounded-md shadow-sm'>
                          <div className='relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-slate-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-orange-600 dark:ring-slate-500 focus-within:dark:ring-orange-600 '>
                            <label
                              for='title'
                              className='block w-full text-right text-xs font-medium text-slate-900 dark:text-slate-300'
                            >
                              عنوان
                            </label>
                            <input
                              dir='rtl'
                              type='text'
                              name='title'
                              id='title'
                              className='block w-full border-0 p-0 text-right text-slate-900 placeholder:text-slate-400 focus:ring-0 dark:border-slate-600  dark:bg-slate-800 dark:text-slate-200 sm:text-sm sm:leading-6'
                              placeholder='آدرس اول'
                              value={editedAddress?.name}
                              onChange={handleTitleChange}
                            />
                          </div>
                          <div className='relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-slate-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-orange-600  dark:ring-slate-500 focus-within:dark:ring-orange-600'>
                            <label
                              for='address'
                              className='block text-right text-xs font-medium text-slate-900 dark:text-slate-300'
                            >
                              آدرس
                            </label>
                            <input
                              dir='rtl'
                              type='text'
                              name='address'
                              id='address'
                              className='block w-full border-0 p-0 text-right text-slate-900 placeholder:text-slate-400 focus:ring-0 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 sm:text-sm sm:leading-6'
                              placeholder='خ فرودگاه، کنار مدرسه سما'
                              value={editedAddress?.description}
                              onChange={handleDescriptionChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <SimpleMap
                      dragableMarkerPosition={dragableMarkerPosition}
                      setdragableMarkerPosition={setdragableMarkerPosition}
                    />
                  </div>

                  <div className='absolute right-8 mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-500/20 sm:mx-0 sm:h-10 sm:w-10'>
                    <FaPencil
                      className='h-6 w-6 text-orange-600'
                      aria-hidden='true'
                    />
                  </div>
                </div>
                <div className=' mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
                  <button
                    type='button'
                    className='hover:bg-tertiary mx-auto w-44 rounded-full bg-arkanOrange px-0 py-2 text-center text-base font-semibold text-white shadow-md shadow-orange-600/50 transition-all duration-200 hover:bg-opacity-80  dark:shadow-slate-100/5 '
                    onClick={() => {
                      if (
                        editedAddress.name !== '' &&
                        editedAddress.description !== '' &&
                        (editedAddress.name !== selectedAddress.name ||
                          editedAddress.description !==
                            selectedAddress.description)
                      ) {
                        updateAddress(selectedAddress.id, editedAddress)
                      }
                      setOpen(false)
                    }}
                  >
                    ثبت
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

function AddNewAdress({ addresses, setSelected, setOpen }) {
  return (
    <button
      onClick={() => {
        setSelected({ id: Date.now(), name: '', description: '' })
        setOpen(true)
      }}
      className={clsx(
        'relative mx-auto flex h-16 w-full cursor-pointer items-center border border-slate-300 border-slate-600/25 bg-orange-500/10 p-4 text-slate-900 focus:outline-none  dark:text-slate-200',
        addresses?.length === 0 ? 'rounded-md' : 'rounded-bl-md rounded-br-md'
      )}
    >
      <>
        <span className='ml-7'>
          <FaCirclePlus className={' scale-150  fill-orange-600/90  '} />
        </span>
        <span className='ml-auto flex flex-col text-right '>
          <span
            className={
              'block  text-sm font-medium text-slate-900 dark:text-slate-300'
            }
          >
            اضافه کردن آدرس جدید
          </span>
        </span>
      </>
    </button>
  )
}

export default function LoggedInAddressesRadio({
  addresses,
  setAddresses,
  selectedAddress,
  setSelectedAddress,
}) {
  const [open, setOpen] = useState(false)
  const [dragableMarkerPosition, setdragableMarkerPosition] =
    useState(defaultCenter)
  const [parentRef, enableAnimations] = useAutoAnimate()

  const updateAddress = (id, newAddress) => {
    const addressExists = addresses.some((address) => address.id === id)

    if (addressExists) {
      setAddresses(
        addresses.map((address) =>
          address.id === id
            ? {
                ...newAddress,
                coordinates: {
                  lat: dragableMarkerPosition.lat,
                  lng: dragableMarkerPosition.lng,
                },
              }
            : address
        )
      )
    } else {
      setAddresses([
        ...addresses,
        {
          ...newAddress,
          coordinates: {
            lat: dragableMarkerPosition.lat,
            lng: dragableMarkerPosition.lng,
          },
        },
      ])
    }
  }

  const deleteAddress = (id) => {
    setAddresses(addresses.filter((address) => address.id !== id))
  }

  return (
    <div className='mx-auto mt-1 w-full '>
      <CheckoutEditModal
        open={open}
        setOpen={setOpen}
        selectedAddress={selectedAddress}
        updateAddress={updateAddress}
        dragableMarkerPosition={dragableMarkerPosition}
        setdragableMarkerPosition={setdragableMarkerPosition}
      />

      <div>
        <h2 className='sr-only'>Select or change customer info</h2>

        <RadioGroup value={selectedAddress} onChange={setSelectedAddress}>
          <RadioGroup.Label className='sr-only'>
            Privacy setting
          </RadioGroup.Label>
          <div
            ref={parentRef}
            className=' mx-auto  -space-y-px  py-2 shadow  dark:shadow-slate-100/5 sm:rounded-md '
          >
            <p className='mr-2 text-right text-sm font-bold text-slate-900 dark:text-slate-200'>
              آدرس ها
            </p>
            {addresses?.map((setting, settingIdx) => (
              <RadioGroup.Option
                key={setting.id}
                value={setting}
                className={({ checked }) =>
                  clsx(
                    settingIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',

                    checked
                      ? 'z-10  border-orange-600/25 bg-orange-500/10'
                      : 'border-slate-600/25 dark:bg-slate-800/40 ',
                    'relative flex cursor-pointer items-center border  p-4 focus:outline-none '
                  )
                }
              >
                {({ active, checked }) => (
                  <>
                    <span
                      className={clsx(
                        checked
                          ? 'border-transparent bg-orange-600'
                          : 'border-slate-300 bg-white dark:bg-slate-300  ',
                        active ? 'ring-2 ring-orange-600 ring-offset-2' : '',
                        'mt-0.5 flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-full border'
                      )}
                      aria-hidden='true'
                    >
                      <span className='h-1.5 w-1.5 rounded-full bg-white dark:bg-slate-300' />
                    </span>

                    <button
                      className='ml-2 rounded-full p-1 transition-colors duration-200 hover:bg-slate-600/20 hover:text-slate-700'
                      onClick={() => {
                        setSelectedAddress(setting)
                        setOpen(true)
                      }}
                    >
                      <FaPencil className='fill-slate-500' />
                    </button>

                    <button
                      onClick={() => {
                        deleteAddress(setting.id)
                      }}
                      className='ml-2 rounded-full  p-1 transition-colors duration-200 hover:bg-slate-600/20 hover:text-slate-700'
                    >
                      <FaRegTrashCan className='fill-slate-500 ' />
                    </button>

                    <span className='ml-auto flex flex-col text-right '>
                      <RadioGroup.Label
                        as='span'
                        className={clsx(
                          checked
                            ? 'text-orange-900 dark:text-orange-500'
                            : 'text-slate-900 dark:text-slate-300',
                          'block  text-sm font-medium '
                        )}
                      >
                        {setting.name}
                      </RadioGroup.Label>
                      <RadioGroup.Description
                        as='span'
                        className={clsx(
                          checked ? 'text-orange-700' : 'text-slate-500',
                          'block text-sm'
                        )}
                      >
                        {setting.description}
                      </RadioGroup.Description>
                    </span>
                  </>
                )}
              </RadioGroup.Option>
            ))}
            <AddNewAdress
              addresses={addresses}
              setSelected={setSelectedAddress}
              setOpen={setOpen}
            />
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

/*

function SetButton({ handleClick }) {
  return (
    <button
      type='submit'
      onClick={handleClick}
      className='hover:bg-tertiary mx-auto w-44 rounded-full bg-arkanOrange px-0 py-2 text-center text-base font-semibold text-white shadow-md shadow-orange-600/50 transition-all duration-200 hover:bg-opacity-80  dark:shadow-slate-100/5 '
    >
      تنظیم
    </button>
  )
}



  */
