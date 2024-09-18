import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from '@heroicons/react/solid'
import Link from 'next/link'

function paginationArray(c, m) {
  var current = c,
    last = m,
    delta = 2,
    left = current - delta,
    right = current + delta + 1,
    range = [],
    rangeWithDots = [],
    l

  for (let i = 1; i <= last; i++) {
    if (i == 1 || i == last || (i >= left && i < right)) {
      range.push(i)
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1)
      } else if (i - l !== 1) {
        rangeWithDots.push('...')
      }
    }
    rangeWithDots.push(i)
    l = i
  }

  return rangeWithDots
}

export default function Pagination({ lastPage, currPage }) {
  const rangeWithDots = paginationArray(currPage, lastPage)

  return (
    <nav className='flex items-center justify-between border-t border-slate-200 px-4 pb-2 dark:border-slate-700 sm:px-0'>
      <div className='-mt-px flex w-0 flex-1'>
        {currPage > 1 && (
          <Link
            href={`/admin?page=${currPage - 1}`}
            className='inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-slate-200 '
          >
            <ArrowNarrowLeftIcon
              className='mr-3 h-5 w-5 text-slate-400 dark:text-slate-600'
              aria-hidden='true'
            />
            قبل
          </Link>
        )}
      </div>
      <div className='hidden md:-mt-px md:flex'>
        {rangeWithDots.map((page) => (
          <Link
            key={page}
            href={`/admin?page=${page}`}
            /* Current: "border-orange-500 text-orange-600", Default: "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300" */
            className={` ${
              page == currPage
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:hover:border-slate-700'
            }  inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium`}
          >
            {page}
          </Link>
        ))}
      </div>
      <div className='-mt-px flex w-0 flex-1 justify-end'>
        {currPage < lastPage && (
          <Link
            href={`/admin?page=${currPage + 1}`}
            className='inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-slate-200 '
          >
            بعد
            <ArrowNarrowRightIcon
              className='ml-3 h-5 w-5 text-slate-400 dark:text-slate-600'
              aria-hidden='true'
            />
          </Link>
        )}
      </div>
    </nav>
  )
}
