import { useState } from 'react'

export default function Notes({ note, setNote }) {
  return (
    <div className='flex w-full items-start space-x-4 py-2'>
      <div className='min-w-0 flex-1'>
        <form action='#' className='relative'>
          <div className='overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-orange-600 dark:bg-slate-900 dark:ring-slate-700/40 dark:focus-within:ring-orange-600  '>
            <label htmlFor='note' className='sr-only '>
              Add your note
            </label>
            <textarea
              dir='rtl'
              rows={3}
              name='note'
              id='note'
              className='block w-full resize-none border-0 bg-transparent py-1.5 text-slate-900 placeholder:text-slate-400 focus:ring-0 dark:text-slate-200 sm:text-sm sm:leading-6 '
              placeholder='یادداشت خود را اینجا اضافه کنید...'
              value={note}
              onChange={(e) => {
                setNote(e.target.value)
              }}
            />
          </div>
        </form>
      </div>
    </div>
  )
}
