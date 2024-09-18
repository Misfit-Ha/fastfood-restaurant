import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { Button } from './Button'
import { useRouter } from 'next/router'

export default function PleaseSignUpModal() {
  const [open, setOpen] = useState(true)
  const router = useRouter()

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
          <div className='flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all dark:border-slate-600   dark:border-slate-700/40  dark:bg-slate-900 dark:text-slate-100 sm:my-8 sm:w-full sm:max-w-sm sm:p-6'>
                <div>
                  <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100/20'>
                    <ExclamationCircleIcon
                      className='h-6 w-6 text-orange-600'
                      aria-hidden='true'
                    />
                  </div>
                  <div className='mt-3 text-center sm:mt-5'>
                    <Dialog.Title
                      as='h3'
                      className='text-lg leading-6 text-slate-900 dark:text-slate-200'
                    >
                      ثبت نام سایت
                    </Dialog.Title>
                    <div className='mt-2'>
                      <p className='text-sm text-slate-600 dark:text-slate-300'>
                        لطفا برای تجربه ی بهتر در سایت ثبت نام کنید
                      </p>
                    </div>
                  </div>
                </div>
                <div className='mt-5 flex justify-center sm:mt-6'>
                  <Button
                    color='orange'
                    onClick={() => {
                      setOpen(false)
                      router.push('/account/loginOrRegister')
                    }}
                  >
                    رفتن به صفحه ثبت نام
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
