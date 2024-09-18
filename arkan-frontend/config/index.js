export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'

export const NEXT_URL =
  process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'

export const PER_PAGE = 25

export const settings = [
  {
    name: 'پرداخت در محل',
  },
]

export const defaultCenter = {
  lat: 28.9674,
  lng: 50.8369,
}

export const deliveryMethodes = [
  {
    name: 'ارسال با پیک موتوری',
  },
  {
    name: 'مراجعه حضوری',
  },
]
