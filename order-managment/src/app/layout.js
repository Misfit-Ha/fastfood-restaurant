import './globals.css'

const APP_NAME = 'Arkan'
const APP_DEFAULT_TITLE = 'Arkan Live Order Management App'
const APP_TITLE_TEMPLATE = '%s - PWA App'
const APP_DESCRIPTION = 'An order managment Dashboard for Arkan'

export const metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
}

export const viewport = {
  themeColor: '#FFFFFF',
}

export default function Layout({ children }) {
  return (
    <html lang='en' className='h-full text-base antialiased'>
      <body className='flex min-h-full flex-col'>
        <>{children}</>
      </body>
    </html>
  )
}
