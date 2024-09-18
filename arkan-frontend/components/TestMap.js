import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css' // Re-uses images from ~leaflet package
import * as L from 'leaflet'
import 'leaflet-defaulticon-compatibility'
import { useEffect, useRef, useState } from 'react'

import * as data from '../data/roads.json'

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

export default function SimpleMap() {
  const roads = data.elements
  const polylineOptions = {
    weight: 5,
    color: '#FF7A01',
    dashArray: '25, 25',
    opacity: 0.5,
  }

  return (
    <div className='overflow-hidden rounded-md bg-white shadow dark:bg-slate-800/40 dark:shadow-slate-100/5 sm:rounded-md '>
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
