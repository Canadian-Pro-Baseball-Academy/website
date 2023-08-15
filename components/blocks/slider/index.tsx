"use client"

import React from "react"
import { Page } from "@/payload-types"
import {
  Slide,
  SliderNav,
  SliderProvider,
  SliderTrack,
} from "@faceless-ui/slider"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Gutter } from "@/components/gutter"
import { RichText } from "@/components/rich-text"

import { ContentCard } from "./content-card"
import { ImageCard } from "./image-card"

const cardTypes = {
  contentSlider: ContentCard,
  imageSlider: ImageCard,
  relationshipSlider: () => <div>Relationship Slider</div>,
}

type Layout = Exclude<Page["layout"], undefined>
type Props = Extract<Layout[0], { blockType: "slider" }>

export const SliderBlock: React.FC<Props> = ({
  sliderBackgroundColor,
  sliderFields,
}) => {
  const { sliderType, useLeadingHeader, leadingHeader } = sliderFields

  let slides = null
  switch (sliderType) {
    case "contentSlider":
      slides = sliderFields.contentSlides
      break
    case "imageSlider":
      slides = sliderFields.imageSlides
      break
    case "relationshipSlider":
      slides = sliderFields.relationshipSlides
      break
  }

  if (!slides || slides.length === 0) return null

  const CardToRender = cardTypes[sliderType] as any

  return (
    <div>
      <Gutter>
        {useLeadingHeader && leadingHeader && (
          <RichText content={leadingHeader} className="max-w-1200px mb-8" />
        )}
        <SliderNav
          className="mb-6"
          prevButtonProps={{
            className: "w-8 mr-2",
            children: <ArrowLeft className="h-8 w-8" />,
          }}
          nextButtonProps={{
            className: "w-8",
            children: <ArrowRight className="h-8 w-8" />,
          }}
        />
      </Gutter>

      <div className="relative">
        <SliderTrack className={cn("scrollbar mb-8")}>
          {slides.map((slide, index) => {
            return (
              <Slide
                key={index}
                index={index}
                className={cn(
                  "relative mr-12",
                  "mb-8",
                  "first:ml-5 md:first:ml-10 lg:first:ml-20 2xl:first:ml-60 3xl:first:ml-96",
                  "min-w-[300px] lg:min-w-[600px]",
                  {
                    "max-w-[625px]": sliderType === "contentSlider",
                    "max-w-[800px]": sliderType === "imageSlider",
                    "max-w-[700px]": sliderType === "relationshipSlider",
                  }
                )}
              >
                <CardToRender {...slide} />
              </Slide>
            )
          })}
        </SliderTrack>
        <div />
      </div>
    </div>
  )
}

export const Slider: React.FC<Props> = (props) => {
  return (
    <SliderProvider slidesToShow={1.5}>
      <SliderBlock {...props} />
    </SliderProvider>
  )
}
