import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useMemo, useRef, useState } from 'react'

import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css' // Re-uses images from ~leaflet package
import * as L from 'leaflet'
import 'leaflet-defaulticon-compatibility'
import { toast } from 'react-toastify'

const defaultCenter = {
  lat: 28.9674,
  lng: 50.8369,
}

const arkanCoordinates = {
  lat: 28.9571,
  lng: 50.83476,
}

var arkanIcon = L.icon({
  iconUrl: 'arkan-logo-small.png',
  iconSize: [30, 30],
  //shadowUrl: 'my-icon-shadow.png',
  shadowSize: [68, 95],
  shadowAnchor: [22, 94],
})
const userLocationSvgIcon = new L.DivIcon({
  className: 'my-custom-pin',
  iconAnchor: [12, 10],
  iconSize: [25, 25],
  labelAnchor: [-6, 0],
  popupAnchor: [0, -36],
  html: `<svg fill="rgb(51 65 85)" stroke-width="0" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></svg>`,
})

const iranBounds = L.latLngBounds(
  L.latLng(25.799891182088334, 48.69140625),
  L.latLng(29.305561325527698, 52.91015625000001)
)

const cityBounds = L.latLngBounds(
  L.latLng(28.94236400094085, 50.80696105957032),
  L.latLng(29.005438048885104, 50.86807250976563)
)
function DraggableMarker({ position, setPosition }) {
  const markerRef = useRef(null)
  const map = useMap()

  useMapEvents({
    click(e) {
      if (iranBounds.contains(e.latlng)) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      } else {
        console.log('Location is outside of Iran')
      }
    },
  })

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          const newPosition = marker.getLatLng()
          if (cityBounds.contains(newPosition)) {
            setPosition(newPosition)
          } else {
            console.log('Cannot move marker outside of bushehr bounds')
          }
        }
      },
    }),
    [setPosition]
  )

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      zIndexOffset={1000}
    >
      <Popup minWidth={90}>
        انتخاب آدرس
        <br />
      </Popup>
    </Marker>
  )
}

function UserLocationMarker({ setdragableMarkerPosition }) {
  const [position, setPosition] = useState(null)
  const [bbox, setBbox] = useState([])
  const [radius, setRadius] = useState(null)

  const map = useMap()

  useEffect(() => {
    map.locate().on('locationfound', function (e) {
      if (iranBounds.contains(e.latlng)) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
        setRadius(e.accuracy)

        if (radius > 50) {
          const circle = L.circle(e.latlng, radius, {
            color: 'blue',
            fillOpacity: 0.05,
          })
          circle.addTo(map)
        }

        setBbox(e.bounds.toBBoxString().split(','))

        if (cityBounds.contains(e.latlng)) {
          setdragableMarkerPosition(e.latlng)
        } else {
          toast.error('لوکیشن شما خارج از محدوده ی سرویس پیک آرکان است')
        }
      } else {
        toast.error('خطایی در پیدا کردن جی پی اس رخ داد')
      }
    })
  }, [])

  return position === null ? null : (
    <Marker position={position} icon={userLocationSvgIcon}>
      <Popup>
        موقعیت شما <br />
      </Popup>
    </Marker>
  )
}

export default function SimpleMap({
  dragableMarkerPosition,
  setdragableMarkerPosition,
}) {
  return (
    <div className='overflow-hidden rounded-md bg-white p-2 shadow dark:bg-slate-800/40 dark:shadow-slate-100/5 sm:rounded-md '>
      <h2 className='text-right text-sm font-bold text-slate-900 dark:text-slate-200'>
        (اختیاری) آدرس روی نقشه
      </h2>
      <p className='font- text-right text-sm text-slate-700 dark:text-slate-300'>
        لطفا آدرس خودتونو با جا به جایی آیکون آدرس روی نقشه مشخص کنید
      </p>
      <MapContainer
        center={defaultCenter}
        zoom={14}
        scrollWheelZoom={true}
        className='bg-red-500'
        style={{ height: 400, width: '100%' }}
      >
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

        <Marker position={arkanCoordinates} icon={arkanIcon}>
          <Popup>
            :آدرس آرکان برگر <br /> خیابان فرودگاه نزدیک کوچه ی بدر
          </Popup>
        </Marker>
        <UserLocationMarker
          setdragableMarkerPosition={setdragableMarkerPosition}
        />
        <DraggableMarker
          position={dragableMarkerPosition}
          setPosition={setdragableMarkerPosition}
        />
      </MapContainer>
    </div>
  )
}
