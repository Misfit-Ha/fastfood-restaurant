const publicVapidKey =
  'BFTFfKbfxTrf-z61TwriSPxMTfmUD28X2oqOQoAMIh31RDWMUyVPJLFSE-VYck8TNyzEbbrT8rycYDOvvT1Pv3w'

export async function getOrders(page = 1, deliveryInfoFilter) {
  //&filters[deliveryInformation][$contains]=${deliveryInfoFilter}
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/api/orders?sort[0]=createdAt:DESC&pagination[page]=${page}&pagination[pageSize]=9&filters[deliveryInformation][$containsi]=${deliveryInfoFilter}`,
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      },
      cache: 'no-store',
    }
  )

  if (!res.ok) {
    console.log(res)
    throw new Error('Failed to fetch orders')
  }

  const data = await res.json()
  const apiOrders = data.data.map((order) => ({
    id: order.id,
    customerName: `${order.attributes.deliveryInformation.firstName} ${order.attributes.deliveryInformation.lastName}`,
    phoneNumber: order.attributes.deliveryInformation.phonenumber,
    totalPrice: parseFloat(order.attributes.total),
    items: order.attributes.cartItems.map((item) => ({
      name: item.title,
      quantity: item.quantity,
    })),
    address: order.attributes.deliveryInformation.address,
    coordinates: `${order.attributes.coordinates.lat},${order.attributes.coordinates.lng}`,
    notes: order.attributes.note,
    state: order.attributes.state,
  }))

  return {
    orders: apiOrders,
    pagination: data.meta.pagination,
  }
}

export async function getUnconfirmedOrders() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/api/orders?sort[0]=createdAt:DESC&filters[state][$eq]=unconfirmed`,
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      },
      cache: 'no-store',
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch unconfirmed orders')
  }

  const data = await res.json()
  const apiOrders = data.data.map((order) => ({
    id: order.id,
    customerName: `${order.attributes.deliveryInformation.firstName} ${order.attributes.deliveryInformation.lastName}`,
    phoneNumber: order.attributes.deliveryInformation.phonenumber,
    totalPrice: parseFloat(order.attributes.total),
    items: order.attributes.cartItems.map((item) => ({
      name: item.title,
      quantity: item.quantity,
    })),
    address: order.attributes.deliveryInformation.address,
    coordinates: `${order.attributes.coordinates.lat},${order.attributes.coordinates.lng}`,
    notes: order.attributes.note,
    state: order.attributes.state,
  }))

  return {
    orders: apiOrders,
  }
}

export async function getUnconfirmedOrdersCount() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND}/api/orders/count?state=unconfirmed`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      },
      cache: 'no-store',
    }
  )

  if (!res.ok) {
    throw new Error('Failed to fetch the count of unconfirmed orders')
  }

  const data = await res.json()

  return data
}

export const updateOrderState = async (id, newState) => {
  console.log(newState)
  console.log(id)
  console.log('updating state')
  const url = `${process.env.NEXT_PUBLIC_BACKEND}/api/orders/${id}`
  const data = {
    data: {
      state: newState,
    },
  }

  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
    },
    body: JSON.stringify(data),
    redirect: 'follow',
  }

  try {
    const response = await fetch(url, requestOptions)
    const result = await response.json()
    console.log(result)

    // Check if the result contains an error
    if (result.error) {
      console.error(`Error updating order state: ${result.error.message}`)
      console.error(`Details: ${JSON.stringify(result.error.details.errors)}`)
    }
  } catch (error) {
    console.error('error', error)
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export async function subscribePush(register) {
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  })
  await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/push-subscribe`, {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
    },
  })
}
