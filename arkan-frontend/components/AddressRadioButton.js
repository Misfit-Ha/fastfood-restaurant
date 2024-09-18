import {
  FaCheck,
  FaPen,
  FaTrashAlt,
  FaMapMarkerAlt,
  FaCircle,
} from 'react-icons/fa'

export default function AddressRadioButton({ selected }) {
  return (
    /* AddressRadioButton */
    <div
      className={`container flex flex-row items-center justify-between rounded-md border-[3px] px-3 ${
        selected
          ? 'border-green-600 bg-green-100'
          : 'border-slate-300 bg-white '
      }  h-20`}
    >
      {/*buttons container */}
      <div className=' space-x-1'>
        <button
          type='button'
          className={`inline-flex items-center rounded-full border border-transparent p-1 text-white shadow-sm dark:shadow-orange-600/40  ${
            selected
              ? 'bg-green-600 hover:bg-green-700 '
              : 'bg-slate-200 hover:bg-slate-300'
          }   focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
        >
          <FaCircle className='scale-75' />
        </button>
        <button
          type='button'
          className='inline-flex items-center rounded-full border border-transparent bg-yellow-600 p-1 text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:shadow-orange-600/40'
        >
          <FaPen />
        </button>
        <button
          type='button'
          className='focus:ring-red-2 inline-flex items-center rounded-full border border-transparent bg-red-600 p-1 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-yellow-500'
        >
          <FaTrashAlt />
        </button>
      </div>
      <div className='flex items-center space-x-5'>
        <p className='text-right text-base text-slate-700'>
          خ عاشوری بهارستان 7 درب سوم سمت چپ
        </p>
        <FaMapMarkerAlt className='scale-[2]   pr-1 text-slate-700' />
      </div>
    </div>
  )
}
