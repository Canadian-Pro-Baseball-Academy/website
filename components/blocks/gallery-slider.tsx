"use client"

import React from "react"
import { PageSetting } from "@/payload-types"
import useEmblaCarousel, { type EmblaOptionsType } from "embla-carousel-react"

import { cn } from "@/lib/utils"

import { Media } from "../media"
import { AspectRatio } from "../ui/aspect-ratio"

type Layout = Exclude<PageSetting["gallery"]["layout"], undefined>
type Props = Extract<Layout[0], { blockType: "gallery-slider" }>

const OPTIONS: EmblaOptionsType = {
  align: "center",
  dragFree: true,
}

const widths = {
  _1_7778: "flex-[0_0_90%]",
  _1_5: "flex-[0_0_60%]",
  _1_3333: "flex-[0_0_50%]",
  _1: "flex-[0_0_40%]",
}

// TODO: Add Leading Header
export const GallerySlider: React.FC<Props> = ({ sliderFields }) => {
  const { leadingHeader, slides } = sliderFields
  const [emblaRef] = useEmblaCarousel(OPTIONS)
  return (
    <section className="py-6">
      {/* Viewport */}
      <div className="cursor-pointer overflow-hidden" ref={emblaRef}>
        {/* Container */}
        <div className="backface ml-0 flex touch-pan-y">
          {slides.map((slide, index) => {
            const image = typeof slide.image === "object" && slide.image

            if (!image) return null

            const aspectRatio = image.aspectRatio || "_1"

            return (
              <div
                key={index}
                className={cn(
                  "relative ml-4 h-[30vw] min-w-0 overflow-hidden rounded-md",
                  //@ts-ignore
                  widths[aspectRatio]
                )}
              >
                <Media resource={image} fill style={{ objectFit: "cover" }} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
