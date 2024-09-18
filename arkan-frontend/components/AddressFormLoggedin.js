import AddressRadioButton from './AddressRadioButton'

export default function AddressFormLoggedin() {
  return (
    <div className=' flex h-fit  w-full max-w-2xl  flex-col space-y-2'>
      <p className='text-right text-sm font-bold text-slate-900'>آدرس</p>
      <AddressRadioButton selected={true} />
      <AddressRadioButton selected={false} />
      <p className='pb-10 text-right text-sm font-bold text-orange-700'>
        اضافه کردن آدرس دیگر
      </p>
    </div>
  )
}
