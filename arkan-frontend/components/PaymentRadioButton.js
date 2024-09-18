import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { settings } from '../config'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function PaymentRadioButton({ selected, setSelected }) {
  return (
    <div className='overflow-hidden rounded-md bg-white p-2 shadow dark:bg-slate-800/40 dark:shadow-slate-100/5 sm:rounded-md '>
      <RadioGroup value={selected} onChange={setSelected}>
        <RadioGroup.Label className='sr-only'>Payment Method</RadioGroup.Label>
        <p className='text-right text-sm font-bold text-slate-900 dark:text-slate-200 '>
          نوع پرداخت
        </p>
        <div className=' -space-y-px rounded-md dark:bg-slate-800/40'>
          {settings.map((setting, settingIdx) => (
            <RadioGroup.Option
              key={setting.name}
              value={setting}
              className={({ checked }) =>
                classNames(
                  settingIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
                  settingIdx === settings.length - 1
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
    </div>
  )
}
