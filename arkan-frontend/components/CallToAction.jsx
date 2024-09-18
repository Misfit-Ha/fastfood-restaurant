import { Button } from './Button'
import { Container } from './Container'
import backgroundImage from '../public/image/background-call-to-action.jpg'
import Image from 'next/image'

export function CallToAction() {
  return (
    <section
      id='get-started-today'
      className='relative z-10 overflow-hidden bg-slate-50 py-32 dark:bg-slate-900'
    >
      <Image
        className='absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 blur-md'
        src={backgroundImage}
        alt=''
        width={2347}
        height={1244}
        unoptimized
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
      <Container className='relative'>
        <div className='mx-auto max-w-lg text-center'>
          <h2 className='font-display text-3xl tracking-tight text-white sm:text-4xl'>
            همین حالا سفارش بده
          </h2>
          <p className='mt-4 text-lg tracking-tight text-white'>
            پیک موتوری آرکان برگر از ساعت 20 تا 4 در خدمت شماست. شماره تماس ما
            ۰۹۰۸ ۴۵۵ ۶۰۷۰ یا اگه مایلید حضوری بیاید خیابان فرودگاه کنار مدرسه ی
            سما
          </p>
          <Button href='/order' color='white' className='mt-10'>
            سفارش آنلاین
          </Button>
        </div>
      </Container>
    </section>
  )
}
