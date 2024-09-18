import { RootLayout } from '@/components/RootLayout'
import { getUnconfirmedOrdersCount } from '@/lib/data'

export default async function Layout({ children }) {
  const count = await getUnconfirmedOrdersCount()

  return <RootLayout count={count}>{children}</RootLayout>
}
