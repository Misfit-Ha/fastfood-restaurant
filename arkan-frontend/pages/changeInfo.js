import { Container } from '../components/Container'
import { Footer2 } from '../components/Footer2'
import { Header3 } from '../components/Header3'
import { API_URL, NEXT_URL, defaultCenter } from '../config'
import { Fragment, useContext, useEffect, useMemo, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import clsx from 'clsx'
import { FaCirclePlus, FaPencil, FaRegTrashCan } from 'react-icons/fa6'
import 'react-toastify/dist/ReactToastify.css'

import { ToastContainer, toast } from 'react-toastify'
import { Dialog, Transition } from '@headlessui/react'
import { AiOutlineClose } from 'react-icons/ai'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import AuthContext from '../context/AuthContext'
import dynamic from 'next/dynamic'

function EditModal({
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
                    className='hover:bg-tertiary mx-auto w-44 rounded-full bg-arkanOrange px-0 py-2 text-center text-base font-semibold text-white shadow-md shadow-orange-600/50 transition-all duration-200 hover:bg-opacity-80   dark:shadow-slate-100/5 '
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

function PasswordForm({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}) {
  return (
    <div className=' mx-auto flex w-full max-w-xl flex-col justify-center p-2 shadow dark:bg-slate-800/40 dark:shadow-slate-100/5 sm:rounded-md'>
      <p className='mx-auto text-right text-sm font-bold text-slate-900 dark:text-slate-200 sm:mx-0'>
        تغییر رمز عبور
      </p>
      <div className='mx-auto flex w-full flex-col justify-between space-x-0 space-y-4  sm:mx-0 sm:flex-row sm:space-x-4 sm:space-y-0'>
        <div className='mb-4 w-full  text-right'>
          <label
            className='mb-2 block text-sm font-medium text-slate-800 dark:text-slate-200'
            htmlFor='confirmPassword'
          >
            تایید رمز عبور
          </label>
          <input
            className='px w-full appearance-none   rounded  border  border-slate-200 bg-white px-3 py-2 text-sm leading-tight text-slate-800 shadow-sm   outline-none     placeholder:text-slate-400    focus:border-orange-300 focus:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-600 dark:border-slate-600 dark:border-slate-700/40 dark:bg-slate-900   dark:text-slate-100  dark:shadow-slate-100/5 '
            id='confirmPassword'
            type='password'
            value={confirmPassword}
            placeholder='تایید رمز عبور'
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className='mb-4 w-full text-right'>
          <label
            className='mb-2 block text-right text-sm font-medium text-slate-800 dark:text-slate-200'
            htmlFor='password'
          >
            رمز عبور جدید
          </label>
          <input
            className='px w-full appearance-none   rounded  border  border-slate-200 bg-white px-3 py-2 text-sm leading-tight text-slate-800 shadow-sm   outline-none     placeholder:text-slate-400    focus:border-orange-300 focus:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-600 dark:border-slate-600 dark:border-slate-700/40 dark:bg-slate-900   dark:text-slate-100  dark:shadow-slate-100/5  '
            id='password'
            type='password'
            value={password}
            placeholder='رمز عبور جدید'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

function PersonalInfoForm({ name, setName, phonenumber, setPhonenumber }) {
  return (
    <div className=' mx-auto flex w-full max-w-xl flex-col justify-center p-2 shadow dark:bg-slate-800/40 dark:shadow-slate-100/5 sm:rounded-md'>
      <p className='mx-auto text-right text-sm font-bold text-slate-900 dark:text-slate-200 sm:mx-0'>
        اطلاعات تماس
      </p>
      <div className='mx-auto flex w-full flex-col justify-between space-x-0 space-y-4  sm:mx-0 sm:flex-row sm:space-x-4 sm:space-y-0'>
        <div className='mb-4 w-full text-right'>
          <label
            className='mb-2 block text-right text-sm font-medium text-slate-800 dark:text-slate-200'
            htmlFor='phonenumber'
          >
            شماره موبایل
          </label>
          <input
            className='px w-full appearance-none   rounded  border  border-slate-200 bg-white px-3 py-2 text-sm leading-tight text-slate-800 shadow-sm   outline-none     placeholder:text-slate-400    focus:border-orange-300 focus:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-600 dark:border-slate-600 dark:border-slate-700/40 dark:bg-slate-900   dark:text-slate-100  dark:shadow-slate-100/5 '
            id='phonenumber'
            type='tel'
            value={phonenumber}
            placeholder='09123456789'
            onChange={(e) => setPhonenumber(e.target.value)}
          />
        </div>

        <div className='mb-4 w-full  text-right'>
          <label
            className='mb-2 block text-sm font-medium text-slate-800 dark:text-slate-200'
            htmlFor='name'
          >
            نام
          </label>
          <input
            className='px w-full appearance-none   rounded  border  border-slate-200 bg-white px-3 py-2 text-right text-sm leading-tight text-slate-800   shadow-sm     outline-none    placeholder:text-slate-400 focus:border-orange-300 focus:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-600 dark:border-slate-600 dark:border-slate-700/40 dark:bg-slate-900   dark:text-slate-100  dark:shadow-slate-100/5 '
            id='name'
            type='text'
            value={name}
            placeholder='نام'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

function AddNewAdress({ addresses, setSelected, setOpen }) {
  return (
    <button
      onClick={() => {
        setSelected({
          id: Date.now(),
          name: '',
          description: '',
          coordinates: null,
        })
        setOpen(true)
      }}
      className={clsx(
        'relative mx-auto flex h-16 w-full cursor-pointer items-center border border-orange-600/25  bg-orange-500/10 p-4 text-slate-900  focus:outline-none  dark:text-slate-200',
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

function Addresses({ addresses, setAddresses }) {
  const [selected, setSelected] = useState(null)
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
    <div className='mx-auto w-full'>
      <EditModal
        open={open}
        setOpen={setOpen}
        selectedAddress={selected}
        updateAddress={updateAddress}
        dragableMarkerPosition={dragableMarkerPosition}
        setdragableMarkerPosition={setdragableMarkerPosition}
      />
      <div className='mx-auto'>
        <h1 className='text-center text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-200 sm:text-3xl'>
          تغییر اطلاعات
        </h1>
      </div>

      <div className='mt-16'>
        <h2 className='sr-only'>Change customer info</h2>

        <RadioGroup value={selected} onChange={setSelected}>
          <RadioGroup.Label className='sr-only'>
            Privacy setting
          </RadioGroup.Label>
          <div
            ref={parentRef}
            className=' mx-auto max-w-xl -space-y-px  p-2 shadow dark:bg-slate-800/40 dark:shadow-slate-100/5 sm:rounded-md '
          >
            <p className='text-right text-sm font-bold text-slate-900 dark:text-slate-200 '>
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
                      ? 'z-10 border-orange-600/25 bg-orange-500/10'
                      : 'border-slate-600/25',
                    'relative flex cursor-pointer items-center border  p-4 focus:outline-none'
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
                        setSelected(setting)
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
                            ? 'border-orange-600/25   text-orange-600 '
                            : ' text-slate-900 dark:text-slate-300',
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
              setSelected={setSelected}
              setOpen={setOpen}
            />
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

function SetButton({ handleClick }) {
  return (
    <button
      type='submit'
      onClick={handleClick}
      className='hover:bg-tertiary mx-auto w-44 rounded-full bg-arkanOrange px-0 py-2 text-center text-base font-semibold text-white shadow-md shadow-orange-600/50 transition-all duration-200 hover:bg-opacity-80   dark:shadow-slate-100/5 '
    >
      تنظیم
    </button>
  )
}

export default function ChangeInfo({ userInfoData }) {
  const { updateUser } = useContext(AuthContext)
  const { darkMode } = useContext(AuthContext)
  const [error, setError] = useState(null)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [phonenumber, setPhonenumber] = useState('')
  const [addresses, setAddresses] = useState([])
  useEffect(() => {
    console.log(userInfoData)
    setName(userInfoData.user.username)
    setPhonenumber(userInfoData.user.email.split('@')[0]) // remove everything after @
    setAddresses(
      userInfoData.user.addresses?.map((address) => ({
        id: address.id,
        name: address.name,
        description: address.description,
        coordinates: address.coordinates,
      }))
    )
  }, [])

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])
  const handleClick = async (e) => {
    e.preventDefault()
    let changes = {}
    // Check if name or phone number has changed
    if (name !== userInfoData.user.username) {
      changes.username = name
    }
    if (phonenumber !== userInfoData.user.email.split('@')[0]) {
      changes.phonenumber = phonenumber
    }

    // Check if addresses have changed
    const originalAddresses = userInfoData.user.addresses?.map((address) => ({
      id: address.id,
      name: address.name,
      description: address.description,
    }))
    if (JSON.stringify(addresses) !== JSON.stringify(originalAddresses)) {
      changes.addresses = addresses
    }
    console.log(changes)
    // Check if password fields are filled
    if (password.length > 0) {
      if (password.length < 5) {
        setError('پسورد باید حداقل از ۶ کاراکتر باشد')
        return
      } else if (password !== confirmPassword) {
        setError('پسورد ها مطابقت ندارند')
        return
      } else {
        changes.password = password
      }
    }

    // If there are any changes, call updateUser function
    console.log(changes)
    if (Object.keys(changes).length > 0) {
      const updatedFields = await updateUser(changes)
      console.log('updatedFields')

      console.log(updatedFields)
      if (updatedFields.length > 0) {
        toast.success(`تغییرات با موفقیت اعمال شد`)
      }
    }
  }

  return (
    <main className='bg-slate-50 dark:bg-slate-900'>
      <ToastContainer rtl theme={darkMode ? 'dark' : 'light'} />

      <Header3 />

      <Container>
        <div className='flex  flex-col justify-center space-y-10 py-16 '>
          <Addresses addresses={addresses} setAddresses={setAddresses} />
          <PersonalInfoForm
            name={name}
            setName={setName}
            phonenumber={phonenumber}
            setPhonenumber={setPhonenumber}
          />
          <PasswordForm
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
          />
          <SetButton handleClick={handleClick} />
        </div>
      </Container>
      <Footer2 />
    </main>
  )
}

export async function getServerSideProps({ req }) {
  const cookies = req.headers.cookie
  console.log(cookies)
  let token = null
  if (cookies) {
    // Extract token using regex
    const tokenRegex = /; token=([^;]+)/
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
  //TODO fix this and the one in checkout
  console.log(`token=${token}`)
  // Pass cookies in headers
  const userInfo = await fetch(`${NEXT_URL}/api/user`, {
    headers: {
      cookie: `token=${token}`,
    },
  })

  if (!userInfo.ok) {
    console.error(`Error fetching user and orders: ${userInfo.statusText}`)
  }

  const userInfoData = await userInfo.json()

  return {
    props: { userInfoData },
  }
}
