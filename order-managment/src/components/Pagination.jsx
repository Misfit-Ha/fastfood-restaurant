'use client'

import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from '@heroicons/react/20/solid'
import Link from 'next/link'

function pagination(c, m) {
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

export default function Pagination({ total, current }) {
  const pages = pagination(parseInt(current), total)

  return (
    <nav className='flex items-center justify-between border-t border-gray-200 px-4 sm:px-0'>
      <div className='-mt-px flex w-0 flex-1'>
        <Link
          className='inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
          href={`?page=${current > 1 ? current - 1 : current}`}
        >
          <ArrowLongLeftIcon
            className='mr-3 h-5 w-5 text-gray-400'
            aria-hidden='true'
          />
          Previous
        </Link>
      </div>
      <div className='hidden md:-mt-px md:flex'>
        {pages.map((page, index) => (
          <Link
            key={index}
            href={`?page=${page}`}
            className={`inline-flex items-center border-t-2 ${
              page === current
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } px-4 pt-4 text-sm font-medium`}
          >
            {page}
          </Link>
        ))}
      </div>
      <div className='-mt-px flex w-0 flex-1 justify-end'>
        <Link
          className='inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
          href={`?page=${current < total ? current + 1 : current}`}
        >
          Next
          <ArrowLongRightIcon
            className='ml-3 h-5 w-5 text-gray-400'
            aria-hidden='true'
          />
        </Link>
      </div>
    </nav>
  )
}
