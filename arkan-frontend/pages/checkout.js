import CheckoutSummary from '../components/CheckoutSummary'
import PaymentRadioButton from '../components/PaymentRadioButton'
import AddressFormNotLoggedin from '../components/PersonalInfoNotLoggedIn'
import { useContext, useEffect, useMemo, useState } from 'react'
import { API_URL, settings, deliveryMethodes, defaultCenter } from '../config'
import { ToastContainer, toast } from 'react-toastify'
import CartContext from '../context/CartContext'
import { useRouter } from 'next/router'
import { Footer2 } from '../components/Footer2'
import { Header3 } from '../components/Header3'
import { Container } from '../components/Container'
import dynamic from 'next/dynamic'
import { CheckoutProvider } from '../context/CheckoutContext'
import DeliveryMethodRadioButton from '../components/DeliveryMethodRadioButton'
import AuthContext from '../context/AuthContext'
import PersonalInfoNotLoggedIn from '../components/PersonalInfoNotLoggedIn'
import PersonalInfoLoggedIn from '../components/PersonalInfoLoggedIn'
import 'react-toastify/dist/ReactToastify.css'
import PleaseSignUpModal from '../components/PleaseSignUpModal'

function checkEmptyFields(deliveryInformation, CheckAddress) {
  for (const key in deliveryInformation) {
    if (deliveryInformation.hasOwnProperty(key)) {
      if (CheckAddress === false && key === 'address') {
        continue
      }
      if (deliveryInformation[key] === '') {
        return true
      }
    }
  }
  return false
}

export default function CheckoutPage() {
  const router = useRouter()
  const SimpleMap = useMemo(
    () =>
      dynamic(() => import('../components/SimpleMap'), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  )
  //dont use totalInLatin for the final price getit from the server

  const { getNumberOfItems, cartItems, totalInLatin, resetCart } =
    useContext(CartContext)
  const { quickRegister, user, updateUser, darkMode } = useContext(AuthContext)
  const [name, setName] = useState('')
  const [phonenumber, setPhonenumber] = useState('')
  const [addresses, setAddresses] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [note, setNote] = useState('')
  console.log('selectedAddress1')
  console.log(selectedAddress)

  useEffect(() => {
    setName(user?.username)
    setPhonenumber(user?.email.split('@')[0]) // remove everything after @
    setAddresses(user?.addresses)
    setSelectedAddress(user?.addresses?.[user?.addresses?.length - 1])
  }, [user])

  const [selected, setSelected] = useState(settings[0])
  const [delSelected, setDelSelected] = useState(deliveryMethodes[0])
  const [spinner, setSpinner] = useState(false)
  const [deliveryInformation, setDeliveryInformation] = useState({
    lastName: '',
    firstName: '',
    phonenumber: '',
    address: '',
  })
  const [dragableMarkerPosition, setdragableMarkerPosition] =
    useState(defaultCenter)

  const handleClick = async () => {
    if (user && !user.usedQuickRegister) {
      if (!name || !phonenumber || !selectedAddress) {
        toast.error('لطفا همه ی فیلد ها را پر کنید!')
      } else if (!selectedAddress) {
        toast.error('لطفا آدرس خود را انتخاب کنید!')
      } else {
        await handleRegisteredUpdate()
        setSpinner(true)
      }
    } else {
      if (
        checkEmptyFields(
          deliveryInformation,
          delSelected === deliveryMethodes[0]
        )
      ) {
        toast.error('لطفا همه ی فیلد ها را پر کنید!')
      } else if (cartItems.length < 1) {
        toast.error('سبد خرید شما خالی است')
      } else {
        setSpinner(true)
        const user = {
          email: `${deliveryInformation.phonenumber}@phonenumber.com`,
          username: deliveryInformation.phonenumber,
          password: null,
          phonenumber: deliveryInformation.phonenumber,
          usedQuickRegister: true,
        }

        await quickRegister(user)
      }
    }
  }

  async function handleRegisteredUpdate() {
    let changes = {}
    if (name !== user.username) {
      changes.username = name
    }
    if (phonenumber !== user.email.split('@')[0]) {
      changes.phonenumber = phonenumber
    }

    const originalAddresses = user.addresses?.map((address) => ({
      id: address.id,
      name: address.name,
      description: address.description,
    }))
    if (JSON.stringify(addresses) !== JSON.stringify(originalAddresses)) {
      changes.addresses = addresses
    }
    console.log('changes')
    console.log(changes)
    if (Object.keys(changes).length > 0) {
      const updatedFields = await updateUser(changes)
      if (updatedFields.length > 0) {
        toast.success(`تغییرات با موفقیت اعمال شد`)
      }
    }
  }

  useEffect(() => {
    if (spinner && user) {
      const sendOrderRequest = async () => {
        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        console.log('selectedAddress1')
        console.log(selectedAddress)

        var payloadRegisteredUser = {
          data: {
            deliveryInformation: {
              lastName: '',
              firstName: name,
              phonenumber: phonenumber,
              address:
                selectedAddress?.name + ' ' + selectedAddress?.description,
            },
            paymentMehod: selected.name,
            deliveryMethod: delSelected.name,
            numberOfItems: getNumberOfItems,
            cartItems,
            total: totalInLatin,
            coordinates: dragableMarkerPosition,
            users_permissions_user: user.id,
            note: note,
          },
        }
        var payloadUnregisteredUser = {
          data: {
            deliveryInformation,
            paymentMethod: selected.name,
            deliveryMethod: delSelected.name,
            numberOfItems: getNumberOfItems,
            cartItems,
            total: totalInLatin,
            coordinates: dragableMarkerPosition,
            users_permissions_user: user.id,
            note: note,
          },
        }

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(
            user.usedQuickRegister
              ? payloadUnregisteredUser
              : payloadRegisteredUser
          ),
          redirect: 'follow',
        }

        const res = await fetch(`${API_URL}/api/orders`, requestOptions)
        console.log(res)

        setSpinner(false)

        if (res.ok) {
          const orderResponse = await res.json()

          router.push(`/tab/${orderResponse.data.id}`)
          resetCart()
        } else {
          toast.error('مشکلی در ارتباط با سرور پیش آمد')

          console.error('Error in response:', res)
        }
      }

      sendOrderRequest()
    }
  }, [user, spinner])

  return (
    <>
      <div className='h-max bg-gradient-to-b from-white to-slate-200 dark:from-slate-900 dark:to-slate-950'>
        <ToastContainer rtl theme={darkMode ? 'dark' : 'light'} />

        <Header3
          title={'آرکان - تسویه حساب'}
          description={'تسویه حساب و ارسال سفارش'}
          keywords={'تسویه حساب'}
        />
        <Container>
          <CheckoutProvider>
            <section className='container mx-auto flex  flex-col-reverse justify-center gap-10 py-10 md:flex-row  '>
              {/*left menue */}

              <p className='text-right text-sm  font-bold text-slate-900 dark:text-slate-200'></p>
              <CheckoutSummary
                handleClick={handleClick}
                spinner={spinner}
                note={note}
                setNote={setNote}
              />
              {/* right menues */}
              <div className=' flex h-fit  w-full max-w-2xl  flex-col space-y-2'>
                {user && !user?.usedQuickRegister ? (
                  <PersonalInfoLoggedIn
                    name={name}
                    setName={setName}
                    phonenumber={phonenumber}
                    setPhonenumber={setPhonenumber}
                  />
                ) : (
                  <PersonalInfoNotLoggedIn
                    deliveryInformation={deliveryInformation}
                    setDeliveryInformation={setDeliveryInformation}
                  />
                )}

                {/* delivery method*/}
                <DeliveryMethodRadioButton
                  delSelected={delSelected}
                  setDelSelected={setDelSelected}
                  deliveryInformation={deliveryInformation}
                  setDeliveryInformation={setDeliveryInformation}
                  user={user}
                  setAddresses={setAddresses}
                  addresses={addresses}
                  selectedAddress={selectedAddress}
                  setSelectedAddress={setSelectedAddress}
                />

                {/* payment method */}
                <PaymentRadioButton
                  selected={selected}
                  setSelected={setSelected}
                />

                {/*Map */}
                {(!user || user.usedQuickRegister) &&
                  delSelected.name !== 'مراجعه حضوری' && (
                    <SimpleMap
                      dragableMarkerPosition={dragableMarkerPosition}
                      setdragableMarkerPosition={setdragableMarkerPosition}
                    />
                  )}
              </div>
            </section>
          </CheckoutProvider>
        </Container>
        <Footer2 />
      </div>
    </>
  )
}
//TODO addresses not working, does it save address?
