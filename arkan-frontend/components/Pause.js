import { FaPause } from 'react-icons/fa'

export default function Pause({ onPlayerClick }) {
  return (
    <button
      onClick={onPlayerClick}
      aria-label='Pause Video'
      aria-pressed='false'
      className='clean-btn z-2 h-30 w-30 absolute bottom-0 right-0 mx-10 my-10 text-white sm:mx-0 md:mx-5 lg:mx-10'
    >
      <FaPause />
    </button>
  )
}
