import Link from 'next/link'

import { Container } from './Container'
import Image from 'next/image'
import backgroundImage from '../public/image/background-faqs.jpg'

const faqs = [
  [
    {
      question: 'لورم ایپسوم متن ساختگی با تولید ',
      answer:
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه',
    },
    {
      question: 'لورم ایپسوم متن ساختگی با تولید ',
      answer:
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه',
    },
    {
      question: 'لورم ایپسوم متن ساختگی با تولید ',
      answer:
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه',
    },
  ],
  [
    {
      question: 'لورم ایپسوم متن ساختگی با تولید ',
      answer:
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه',
    },
    {
      question: 'لورم ایپسوم متن ساختگی با تولید ',
      answer:
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه',
    },
    {
      question: 'لورم ایپسوم متن ساختگی با تولید ',
      answer:
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه',
    },
  ],
  [
    {
      question: 'لورم ایپسوم متن ساختگی با تولید ',
      answer:
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه',
    },
    {
      question: 'لورم ایپسوم متن ساختگی با تولید ',
      answer:
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه',
    },
    {
      question: 'لورم ایپسوم متن ساختگی با تولید ',
      answer:
        'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه',
    },
  ],
]

export function Faqs() {
  return (
    <section
      id='faqs'
      aria-labelledby='faqs-title'
      className='relative overflow-hidden py-20 dark:bg-slate-900 sm:py-32 '
    >
      <Image
        className='absolute left-1/3  top-0 max-w-none -translate-y-1/4 translate-x-[-30%] dark:hidden'
        src={backgroundImage}
        alt=''
        width={1558}
        height={946}
        unoptimized
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
      <Container>
        <div className=' bg-transparent  text-center lg:mx-0 '>
          <h2
            id='faqs-title'
            className='text-3xl  font-medium tracking-tight text-slate-800 dark:text-slate-200'
          >
            سوالات متداول
          </h2>
        </div>
        <ul
          role='list'
          className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-right sm:mt-20 lg:max-w-none lg:grid-cols-3'
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role='list' className='space-y-10'>
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className='text-lg font-semibold leading-6 text-slate-800 dark:text-slate-200 '>
                      {faq.question}
                    </h3>
                    <p className='mt-4 text-sm text-slate-700 dark:text-slate-300'>
                      {faq.answer}
                    </p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
