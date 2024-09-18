export default function PersonalInfoLoggedIn({
  name,
  setName,
  phonenumber,
  setPhonenumber,
}) {
  return (
    <div className=' mx-auto flex w-full  flex-col justify-center p-2 shadow dark:bg-slate-800/40 dark:shadow-slate-100/5 sm:rounded-md'>
      <p className='mx-auto text-right text-sm font-bold text-slate-900 dark:text-slate-200 sm:mx-0'>
        اطلاعات تماس
      </p>
      <div className='mx-auto flex w-full flex-col justify-between space-x-0 space-y-4  sm:mx-0 sm:flex-row sm:space-x-4 sm:space-y-0'>
        <div className='mb-4 w-full text-right'>
          <label
            className='mb-2 block text-right text-sm font-medium text-slate-800 dark:text-slate-200'
            htmlFor='phonenumber'
          >
            شماره موبایل
          </label>
          <input
            className='px w-full appearance-none   rounded  border  border-slate-200 bg-white px-3 py-2 text-sm leading-tight text-slate-800 shadow-sm   outline-none     placeholder:text-slate-400    focus:border-orange-300 focus:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-600 dark:border-slate-600 dark:border-slate-700/40 dark:bg-slate-900   dark:text-slate-100  dark:shadow-slate-100/5 '
            id='phonenumber'
            type='tel'
            value={phonenumber}
            placeholder='09123456789'
            onChange={(e) => setPhonenumber(e.target.value)}
          />
        </div>

        <div className='mb-4 w-full  text-right'>
          <label
            className='mb-2 block text-sm font-medium text-slate-800 dark:text-slate-200'
            htmlFor='name'
          >
            نام
          </label>
          <input
            className='px w-full appearance-none   rounded  border  border-slate-200 bg-white px-3 py-2 text-right text-sm leading-tight text-slate-800   shadow-sm     outline-none    placeholder:text-slate-400 focus:border-orange-300 focus:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-600 dark:border-slate-600 dark:border-slate-700/40 dark:bg-slate-900   dark:text-slate-100  dark:shadow-slate-100/5 '
            id='name'
            type='text'
            value={name}
            placeholder='نام'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
