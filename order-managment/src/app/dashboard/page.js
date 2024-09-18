import { Cards } from '@/components/OrderCard'
import Pagination from '@/components/Pagination'
import Push from '@/components/Push'
import Search from '@/components/search'
import { getOrders } from '@/lib/data'
import { Suspense } from 'react'

export default async function Page({ searchParams }) {
  const deliveryInfoFilter = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1
  const data = await getOrders(currentPage, deliveryInfoFilter)

  return (
    <div className='space-y-5'>
      <Push />
      <Search placeholder='Search Client Info ...' />
      <Suspense
        key={deliveryInfoFilter + currentPage}
        fallback={<p>Loading</p>}
      >
        <Cards orders={data.orders} />
      </Suspense>
      <Pagination total={data.pagination.pageCount} current={currentPage} />
    </div>
  )
}
