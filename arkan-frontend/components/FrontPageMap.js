import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import * as data from '../data/roads.json'

import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css' // Re-uses images from ~leaflet package
import * as L from 'leaflet'
import 'leaflet-defaulticon-compatibility'

const defaultCenter = {
  lat: 28.9571,
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

let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
updateMode()
darkModeMediaQuery.addEventListener('change', updateModeWithoutTransitions)
let isSystemDarkMode = darkModeMediaQuery.matches
let isDarkMode =
  window.localStorage.isDarkMode === 'true' ||
  (!('isDarkMode' in window.localStorage) && isSystemDarkMode)

export default function SimpleMap() {
  const roads = data.elements
  const polylineOptions = {
    weight: 4,
    color: '#FF7A01',
    dashArray: '5, 15',
    opacity: 0.4,
  }

  return (
    <div className='overflow-hidden rounded-md bg-white shadow dark:bg-slate-800/40 dark:shadow-slate-100/5 sm:rounded-md '>
      <MapContainer
        center={arkanCoordinates}
        zoom={15}
        scrollWheelZoom={true}
        className='bg-red-500'
        style={{ height: '100%', width: '100%' }}
        attributionControl={false}
        zoomControl={false}
      >
        {isDarkMode ? (
          <TileLayer url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png' />
        ) : (
          <TileLayer url='https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png' />
        )}
        <Marker position={arkanCoordinates} icon={arkanIcon}>
          <Popup>
            :آدرس آرکان برگر <br /> خیابان فرودگاه نزدیک کوچه ی بدر
          </Popup>
        </Marker>

        {roads.map((element, index) => (
          <Polyline
            key={index}
            positions={element.geometry.map((coord) => [coord.lat, coord.lon])}
            pathOptions={polylineOptions}
          />
        ))}
      </MapContainer>
    </div>
  )
}
