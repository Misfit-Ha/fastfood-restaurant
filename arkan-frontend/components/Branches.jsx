import { useId, useState } from 'react'
import Image from 'next/image'
import { Tab } from '@headlessui/react'
import clsx from 'clsx'

import { Container } from './Container'
import burgerImage from '../public/image/arkan burger fries.jpg'
import neginAddress from '../public/image/negin address.jpg'
import arkanAddress from '../public/image/arkan address.jpg'
import { FaHamburger, FaQuestion } from 'react-icons/fa'
import { GiSandwich } from 'react-icons/gi'

const features = [
  {
    name: 'آینده آرکان',
    summary: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم  ',
    description:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله',
    image: neginAddress,
    icon: function InventoryIcon() {
      return <FaQuestion className='scale-150 text-white' />
    },
  },

  {
    name: 'سلف سرویس نگین',
    summary: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم  ',
    description:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله',
    image: neginAddress,
    icon: function InventoryIcon() {
      return <GiSandwich className='scale-175 text-white' />
    },
  },

  {
    name: 'برگر های تخصصی آرکان',
    summary:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده ',
    description:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله',
    image: arkanAddress,
    icon: function ReportingIcon() {
      let id = useId()
      return <FaHamburger className='scale-150 text-white ' />
    },
  },
]

function Feature({ feature, isActive, className, ...props }) {
  return (
    <div
      className={clsx(className, { 'opacity-75 hover:opacity-100': !isActive })}
      {...props}
    >
      <div
        className={clsx('ml-auto w-9 rounded-lg', {
          'bg-orange-600': isActive,
          'bg-slate-500': !isActive,
        })}
      >
        <div className='h-9 w-9 p-[10px]'>
          <feature.icon />
        </div>
      </div>
      <h3
        className={clsx('mt-6 text-sm font-medium', {
          'text-orange-600': isActive,
          'text-slate-600': !isActive,
        })}
      >
        {feature.name}
      </h3>
      <p className='font-display mt-2 text-xl text-slate-900'>
        {feature.summary}
      </p>
      <p className='mt-4 text-sm text-slate-600'>{feature.description}</p>
    </div>
  )
}

function FeaturesMobile() {
  return (
    <div className=' -mx-4 mt-20 space-y-10 overflow-hidden px-4 text-right sm:-mx-6 sm:px-6 lg:hidden'>
      {features.map((feature) => (
        <div key={feature.name}>
          <Feature feature={feature} className='mx-auto max-w-2xl ' isActive />
          <div className='relative mt-10 pb-10'>
            <div className='absolute -inset-x-4 bottom-0 top-8 rounded-xl bg-slate-200 sm:-inset-x-6' />
            <div className='relative mx-auto aspect-[844/428] w-[35rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10 dark:shadow-slate-100/5'>
              <Image
                src={feature.image}
                alt=''
                sizes='35rem'
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function FeaturesDesktop() {
  const [selectedIndex, setSelectedIndex] = useState(2)

  return (
    <Tab.Group
      selectedIndex={selectedIndex}
      onChange={setSelectedIndex}
      as='div'
      className=' hidden text-right lg:mt-20  lg:block'
    >
      {({ selectedIndex }) => (
        <>
          <Tab.List className='grid grid-cols-3 gap-x-8 '>
            {features.map((feature, featureIndex) => (
              <Feature
                key={feature.name}
                feature={{
                  ...feature,
                  name: (
                    <Tab className='focus:outline-none [&:not(:focus-visible)]:focus:outline-none '>
                      <span className='absolute inset-0' />
                      {feature.name}
                    </Tab>
                  ),
                }}
                isActive={featureIndex === selectedIndex}
                className='relative'
              />
            ))}
          </Tab.List>
          <Tab.Panels className='rounded-4xl relative mt-20 overflow-hidden rounded-xl bg-slate-200 px-14 py-16 xl:px-16'>
            <div className='-mx-5 flex'>
              {features.map((feature, featureIndex) => (
                <Tab.Panel
                  static
                  key={feature.name}
                  className={clsx(
                    'px-5 transition duration-500  ease-in-out [&:not(:focus-visible)]:focus:outline-none ',
                    {
                      'opacity-60': featureIndex !== selectedIndex,
                    }
                  )}
                  style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
                  aria-hidden={featureIndex !== selectedIndex}
                >
                  <div className='relative aspect-[844/428] w-[52.75rem] overflow-hidden rounded-xl bg-white shadow-lg shadow-slate-900/5 ring-1 ring-slate-500/10 transition duration-500 ease-in-out  hover:scale-105 dark:shadow-slate-100/5'>
                    <Image
                      src={feature.image}
                      alt=''
                      sizes='52.75rem'
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                      }}
                    />
                  </div>
                </Tab.Panel>
              ))}
            </div>
            <div className='rounded-4xl pointer-events-none absolute inset-0 ring-1 ring-inset ring-slate-900/10' />
          </Tab.Panels>
        </>
      )}
    </Tab.Group>
  )
}

export function Branches() {
  return (
    <section
      id='secondary-features'
      aria-labelledby='secondary-features-title'
      className='pb-14 pt-20 sm:pb-20 sm:pt-32 lg:pb-32'
    >
      <Container>
        <div className='mx-auto max-w-2xl md:text-center'>
          <h2
            id='secondary-features-title'
            className='font-display text-3xl tracking-tight text-slate-900 sm:text-4xl'
          >
            زیر مجموعه های آرکان
          </h2>
          <p className='mt-4 text-lg tracking-tight text-slate-700'>
            آرکان علاوه بر برگر های تخصصیش لورم ایپسوم متن ساختگی با تولید سادگی
            نامفهوم
          </p>
        </div>
        <FeaturesMobile />
        <FeaturesDesktop />
      </Container>
    </section>
  )
}
