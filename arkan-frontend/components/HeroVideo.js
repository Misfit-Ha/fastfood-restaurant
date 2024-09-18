import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { Hero } from './Hero2'
import Pause from './Pause'
import Play from './Play'

export default function HeroVideo() {
  const videoRef = useRef()

  const [isHeroPlaying, setIsHeroPlaying] = useState(true)

  const handlePlay = () => {
    setIsHeroPlaying(true)
    videoRef.current.play()
  }

  const handlePause = () => {
    setIsHeroPlaying(false)
    videoRef.current.pause()
  }

  return (
    <section className=' top-0 flex min-h-screen flex-col dark:bg-slate-900'>
      <div className='absolute inset-0 overflow-hidden bg-black'>
        <video
          title='Arkan Hero'
          autoPlay
          loop
          muted
          ref={videoRef}
          frameBorder='0'
          allow='autoplay; fullscreen'
          className='pointer-events-none absolute left-1/2 top-1/2 min-h-full w-full -translate-x-1/2 -translate-y-1/2 [height:56.25vw] [min-width:177.77777777777777vh]'
          data-ready='true'
        >
          <source src='video\Arkan Hero.mp4' type='video/mp4' />
        </video>

        {isHeroPlaying == true ? (
          <Pause onPlayerClick={handlePause} />
        ) : (
          <Play onPlayerClick={handlePlay} />
        )}
      </div>
      <div className='relative m-auto w-full '>
        <Hero />
      </div>
    </section>
  )
}
