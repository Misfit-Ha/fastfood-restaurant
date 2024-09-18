import { FaPlay } from 'react-icons/fa'

export default function Play({ onPlayerClick }) {
  return (
    <button
      onClick={onPlayerClick}
      aria-label='Play Video'
      aria-pressed='true'
      className='clean-btn z-1 h-30 w-30 absolute bottom-0 right-0 mx-10 my-10 text-white sm:mx-0 md:mx-5 lg:mx-10'
    >
      <FaPlay />
    </button>
  )
}
