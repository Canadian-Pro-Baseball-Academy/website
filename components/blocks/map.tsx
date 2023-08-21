"use client"

import React, { useEffect, useRef, useState } from "react"
import { Page } from "@/payload-types"
import maplibregl, { Map as MapType, StyleSpecification } from "maplibre-gl"

import "maplibre-gl/dist/maplibre-gl.css"

import { cn } from "@/lib/utils"

import { buttonVariants } from "../ui/button"

const MapStyle: StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "&copy; OpenStreetMap Contributors",
      maxzoom: 19,
    },
  },
  layers: [
    {
      id: "osm",
      type: "raster",
      source: "osm", // This must match the source key above
    },
  ],
}

const CalgaryCenter = [-114.062019, 51.04427]
const defaultZoom = 13

type Layout = Exclude<Page["layout"], undefined>
type Props = Extract<Layout[0], { blockType: "map" }>

export const Map: React.FC<Props> = ({ mapFields }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<MapType | null>(null)
  const lngLat = (mapFields.map as [number, number]) || CalgaryCenter

  useEffect(() => {
    if (map.current || !mapContainer.current) return // stops map from intializing more than once

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      // Note this styling may have to change depending on the map style you want to use
      // style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`,
      style: MapStyle,
      center: lngLat,
      zoom: mapFields.options.zoom,
    })

    map.current.addControl(new maplibregl.NavigationControl(), "top-right")

    new maplibregl.Marker({ color: "#000000" })
      .setLngLat(lngLat)
      .addTo(map.current)
  }, [lngLat, mapFields.options.zoom])

  return (
    <div>
      <div className="relative h-96 w-full rounded-md">
        <div
          ref={mapContainer}
          className="absolute h-full w-full overflow-hidden rounded-md"
        />
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${lngLat[1]},${lngLat[0]}`}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "cursor-pointer text-right text-sm",
            buttonVariants({ variant: "link" }),
            "w-full md:w-full"
          )}
        >
          Click here for directions
        </a>
      </div>
    </div>
  )
}
