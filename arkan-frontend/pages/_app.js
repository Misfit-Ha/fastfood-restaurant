import '../styles/globals.css'
import { CartProvider } from '../context/CartContext.js'
import { CheckoutProvider } from '../context/CheckoutContext'
import NextNProgress from 'nextjs-progressbar'
import { AuthProvider } from '../context/AuthContext.js'
import localFont from 'next/font/local'

const modeScript = `
let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

updateMode()
darkModeMediaQuery.addEventListener('change', updateModeWithoutTransitions)
window.addEventListener('storage', updateModeWithoutTransitions)

function updateMode() {
let isSystemDarkMode = darkModeMediaQuery.matches
let isDarkMode = window.localStorage.isDarkMode === 'true' || (!('isDarkMode' in window.localStorage) && isSystemDarkMode)

if (isDarkMode) {
document.documentElement.classList.add('dark')

} else {
document.documentElement.classList.remove('dark')

}

if (isDarkMode === isSystemDarkMode) {
delete window.localStorage.isDarkMode
}
}

function disableTransitionsTemporarily() {
document.documentElement.classList.add('[&_*]:!transition-none')
window.setTimeout(() => {
document.documentElement.classList.remove('[&_*]:!transition-none')
}, 0)
}

function updateModeWithoutTransitions() {
disableTransitionsTemporarily()
updateMode()
}
`

const iranSans = localFont({
  src: [
    {
      path: '../public/fonts/IRANSansMobile.ttf',
      weight: '400',
      style: 'normal',
    },

    {
      path: '../public/fonts/IRANSansMobile_Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-iran-sans',
})

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CartProvider>
        <CheckoutProvider>
          <NextNProgress
            color='rgb(255,122,1)'
            height={3}
            options={{ easing: 'ease', showSpinner: false }}
          />
          <style jsx global>{`
            :root {
              --font-iran-sans: ${iranSans.style.fontFamily};
            }
          `}</style>
          <script dangerouslySetInnerHTML={{ __html: modeScript }} />
          <div className={iranSans.className}>
            <Component {...pageProps} />
          </div>
        </CheckoutProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default MyApp
