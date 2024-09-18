import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

export default function Banner({ setBannerVisible }) {
  return (
    <div className='relative isolate flex items-center gap-x-6 overflow-hidden bg-slate-50 px-6 py-2.5 dark:bg-slate-900 sm:px-3.5 sm:before:flex-1'>
      <div
        className='absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl'
        aria-hidden='true'
      >
        <div
          className='aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#fcb378] to-[#df1515] opacity-50'
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
          }}
        />
      </div>
      <div
        className='absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl'
        aria-hidden='true'
      >
        <div
          className='aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#fcb378] to-[#eb1f1f] opacity-50'
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
          }}
        />
      </div>
      <p className='  text-center text-sm leading-6 text-slate-900 dark:text-slate-50'>
        <strong className=' font-semibold'>
          آرکان برگر تعطیل است، ساعت کاری پیک آرکان از 8 تا 4 صبح است
        </strong>
      </p>
      <div className='flex flex-1 justify-end'>
        <button
          type='button'
          className='-m-3 p-3 focus-visible:outline-offset-[-4px]'
          onClick={() => setBannerVisible(false)}
        >
          <span className='sr-only'>Dismiss</span>
          <AiOutlineClose
            className='h-5 w-5 text-slate-900 dark:text-slate-50'
            aria-hidden='true'
          />
        </button>
      </div>
    </div>
  )
}
