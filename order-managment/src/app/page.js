import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Page() {
  return (
    <div className='flex min-h-screen flex-col justify-center bg-white p-6 align-middle'>
      <Link
        href='/login'
        className='flex items-center gap-5 self-center rounded-lg bg-orange-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-orange-400 md:text-base'
      >
        <span>Log in</span> <ArrowRightIcon className='w-5 md:w-6' />
      </Link>
    </div>
  )
}
