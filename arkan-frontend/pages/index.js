import HeroVideo from '../components/HeroVideo'
import { Header3 } from '../components/Header3'
import { Footer2 } from '../components/Footer2'

export default function Home() {
  return (
    <>
      <Header3
        title={'آرکان - خانه'}
        description={'سفارش فست فود و ارسال با پیک رایگان'}
        keywords={'خانه, فست فود'}
      />

      <main className='-mb-16 bg-slate-50 dark:bg-slate-900 '>
        <HeroVideo />
        {/* 
        <Locations />
        <PrimaryFeatures />
        <Reviews />
        <CallToAction />
        <Faqs /> */}
      </main>
      <Footer2 />
    </>
  )
}
