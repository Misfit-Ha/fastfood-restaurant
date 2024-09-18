import SocketOrders, { Cards } from '@/components/OrderCard'
import { getUnconfirmedOrders } from '@/lib/data'

export default async function Page() {
  const { orders: unconfirmedOrders } = await getUnconfirmedOrders()

  return (
    <>
      <SocketOrders />
      <Cards orders={unconfirmedOrders} />
    </>
  )
}
