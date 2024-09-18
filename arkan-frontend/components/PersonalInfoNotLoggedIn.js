export default function PersonalInfoNotLoggedIn({
  deliveryInformation,
  setDeliveryInformation,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target
    setDeliveryInformation((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <div className='mt-5 text-right md:col-span-2 md:mt-0'>
      <form action='#' method='POST'>
        <div className='overflow-hidden shadow dark:shadow-slate-100/5 sm:rounded-md '>
          <div className=' bg-white p-3 dark:bg-slate-800/40'>
            <p className='text-right text-sm font-bold text-slate-900 dark:text-slate-200'>
              اطلاعات
            </p>

            <div className='grid grid-cols-6 gap-2'>
              <div className='col-span-6 sm:col-span-3'>
                <label
                  htmlFor='lastName'
                  className='block text-sm font-medium text-slate-700 dark:text-slate-300 '
                >
                  نام خانوادگی
                </label>
                <input
                  type='text'
                  name='lastName'
                  id='lastName'
                  dir='rtl'
                  value={deliveryInformation.lastName}
                  onChange={handleChange}
                  autoComplete='family-name'
                  className='mt-1 block  w-full rounded-md border-slate-300 text-right shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:border-slate-700/40 dark:bg-slate-900 dark:text-slate-100 dark:shadow-slate-100/5 sm:text-sm'
                />
              </div>

              <div className='order-first col-span-6 sm:order-none sm:col-span-3'>
                <label
                  htmlFor='firstName'
                  className='block text-sm font-medium text-slate-700 dark:text-slate-300'
                >
                  نام
                </label>
                <input
                  type='text'
                  name='firstName'
                  id='firstName'
                  dir='rtl'
                  value={deliveryInformation.firstName}
                  onChange={handleChange}
                  autoComplete='given-name'
                  className='mt-1 block  w-full rounded-md border-slate-300 text-right shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:border-slate-700/40 dark:bg-slate-900 dark:text-slate-100 dark:shadow-slate-100/5 sm:text-sm'
                />
              </div>

              <div className='col-span-6 sm:col-span-4 sm:col-end-7'>
                <label
                  htmlFor='phonenumber'
                  className='block text-sm font-medium text-slate-700 dark:text-slate-300'
                >
                  شماره تماس
                </label>
                <input
                  type='text'
                  name='phonenumber'
                  id='phonenumber'
                  value={deliveryInformation.phonenumber}
                  onChange={handleChange}
                  autoComplete='tel-local'
                  className='mt-1 block w-full rounded-md border-slate-300 text-right shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:border-slate-700/40 dark:bg-slate-900 dark:text-slate-100 dark:shadow-slate-100/5 sm:text-sm'
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
