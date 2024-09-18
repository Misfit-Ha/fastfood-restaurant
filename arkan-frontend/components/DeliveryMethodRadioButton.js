import { RadioGroup } from '@headlessui/react'
import { deliveryMethodes } from '../config'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import LoggedInAddressesRadio from './LoggedInAddressesRadio'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DeliveryMethodRadioButton({
  delSelected,
  setDelSelected,
  deliveryInformation,
  setDeliveryInformation,
  user,
  addresses,
  setAddresses,
  selectedAddress,
  setSelectedAddress,
}) {
  const [parent, enableAnimations] = useAutoAnimate(/* optional config */)

  const handleChange = (e) => {
    const { name, value } = e.target
    setDeliveryInformation((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <div
      className=' overflow-hidden rounded-md bg-white  shadow dark:bg-slate-800/40 dark:shadow-slate-100/5 sm:rounded-md '
      ref={parent}
    >
      <RadioGroup value={delSelected} onChange={setDelSelected}>
        <RadioGroup.Label className='sr-only'>Payment Method</RadioGroup.Label>
        <p className='mr-2 text-right text-sm font-bold text-slate-900 dark:text-slate-200 '>
          نوع تحویل
        </p>
        <div className=' -space-y-px rounded-md dark:bg-slate-800/40'>
          {deliveryMethodes.map((setting, settingIdx) => (
            <RadioGroup.Option
              key={setting.name}
              value={setting}
              className={({ checked }) =>
                classNames(
                  settingIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                  settingIdx === deliveryMethodes.length - 1
                    ? 'rounded-bl-md rounded-br-md'
                    : '',
                  checked
                    ? 'z-10 border-orange-600/25 bg-orange-500/10'
                    : 'border-slate-600/25',
                  'relative flex cursor-pointer border p-4 focus:outline-none'
                )
              }
            >
              {({ active, checked }) => (
                <div className='flex w-full justify-between'>
                  <span
                    className={classNames(
                      checked
                        ? 'border-transparent bg-orange-600'
                        : 'border-slate-300 bg-white',
                      active ? ' ring-orange-500' : '',
                      'mt-0.5 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full border'
                    )}
                    aria-hidden='true'
                  >
                    <span className='h-1.5 w-1.5 rounded-full bg-white' />
                  </span>
                  <div className='ml-3 flex flex-col'>
                    <RadioGroup.Label
                      as='span'
                      className={classNames(
                        checked
                          ? 'text-orange-900 dark:text-orange-600'
                          : 'text-slate-900 dark:text-slate-200',
                        'block text-sm font-medium'
                      )}
                    >
                      {setting.name}
                    </RadioGroup.Label>
                  </div>
                </div>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
      {delSelected.name == deliveryMethodes[0].name &&
        (user && !user.usedQuickRegister ? (
          <LoggedInAddressesRadio
            addresses={addresses}
            setAddresses={setAddresses}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
        ) : (
          <div className='p-3'>
            <label
              htmlFor='address'
              className='block pt-5 text-right text-sm font-medium text-slate-700 dark:text-slate-300'
            >
              آدرس
            </label>
            <input
              type='text'
              name='address'
              id='address'
              dir='rtl'
              value={deliveryInformation.address}
              onChange={handleChange}
              autoComplete='street-address'
              className='mt-1 block w-full rounded-md border-slate-300 text-right shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:border-slate-700/40 dark:bg-slate-900 dark:text-slate-100 dark:shadow-slate-100/5 sm:text-sm'
            />
          </div>
        ))}
    </div>
  )
}
