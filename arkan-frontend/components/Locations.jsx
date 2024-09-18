import Image from 'next/image'
import { Container } from './Container'
import backgroundImage from '../public/image/background-call-to-action.jpg'
import { useMemo } from 'react'
import dynamic from 'next/dynamic'

/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
const features = [
  {
    name: 'شعبه ی آرکان برگر',
    description:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/product-feature-07-detail-01.jpg',
    imageAlt: 'Picture of the store',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Locations() {
  const CoverageMap = useMemo(
    () =>
      dynamic(() => import('../components/FrontPageMap'), {
        loading: () => <p>A map is loading</p>,
        ssr: false, // This line is important. It's what prevents server-side render
      }),
    []
  )

  return (
    <Container className=' dark:bg-slate-900 dark:text-slate-200'>
      <div
        id='Locations'
        className='mx-auto max-w-2xl pb-28 pt-1  lg:max-w-7xl  '
      >
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='text-3xl tracking-tight text-slate-800  dark:text-slate-200 sm:text-3xl'>
            برگر های تخصصی در{' '}
            <span className='text-arkanOrange'>شهر بوشهر</span>
          </h2>
          <p className='mt-4 text-slate-500 dark:text-slate-400'>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی
          </p>
        </div>

        <div className='mt-16 space-y-16'>
          {features.map((feature, featureIdx) => (
            <div
              key={feature.name}
              className='flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8 '
            >
              <div
                className={classNames(
                  featureIdx % 2 === 0
                    ? 'lg:col-start-1'
                    : 'lg:col-start-8 xl:col-start-9',
                  'mt-6 lg:col-span-5 lg:row-start-1 lg:mt-0 xl:col-span-4'
                )}
              >
                <h3 className='text-right text-lg font-medium text-slate-800 dark:text-slate-200'>
                  {feature.name}
                </h3>
                <p className='mt-2 text-right text-sm text-slate-500 dark:text-slate-400'>
                  {feature.description}
                </p>
              </div>
              <div
                className={classNames(
                  featureIdx % 2 === 0
                    ? 'lg:col-start-6 xl:col-start-5'
                    : 'lg:col-start-1',
                  'flex-auto lg:col-span-7 lg:row-start-1 xl:col-span-8'
                )}
              >
                <div className='aspect-h-2 aspect-w-5 overflow-hidden rounded-lg '>
                  <Image
                    src={backgroundImage}
                    alt={feature.imageAlt}
                    className='object-cover object-center'
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                    }}
                  />
                </div>
              </div>
            </div>
          ))}

          <div
            key='nameKey'
            className='flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8 '
          >
            {/**
             * odd lg:col-start-8 xl:col-start-9
             * even lg:col-start-1
             */}
            <div className='mt-6 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:mt-0 xl:col-span-4 xl:col-start-9'>
              <h3 className='text-right text-lg font-medium text-slate-800 dark:text-slate-200'>
                name
              </h3>
              <p className='mt-2 text-right text-sm text-slate-500 dark:text-slate-400'>
                description
              </p>
            </div>
            {/**lg:col-start-6 xl:col-start-5 */}
            <div className='flex-auto lg:col-span-7 lg:col-start-1 lg:row-start-1 xl:col-span-8'>
              <div className='aspect-h-2 aspect-w-5 overflow-hidden rounded-lg '>
                <CoverageMap className='object-cover object-center' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
