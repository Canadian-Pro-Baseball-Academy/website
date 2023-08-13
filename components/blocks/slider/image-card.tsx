import React from "react"
import { Page } from "@/payload-types"

import { aspectRatios, cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Media } from "@/components/media"

type Layout = Exclude<Page["layout"], undefined>
type Props = Extract<
  Layout[0],
  { blockType: "slider" }
>["sliderFields"]["imageSlides"][0]

export const widths = {
  _1_7778: "min-w-[889px] max-w-[889px]",
  _1_3333: "min-w-[667px] max-w-[667px]",
  _1_5: "min-w-[750px] max-w-[750px]",
  _1: "min-w-[500px] max-w-[500px]",
  _1_25: "min-w-[625px] max-w-[625px]",
  _3: "min-w-[1500px] max-w-[1500px]",
  _0_8: "min-w-[400px] max-w-[400px]",
  _0_5625: "min-w-[282px] max-w-[282px]",
  _2_3333: "min-w-[1166px] max-w-[1166px]",
}

// TODO: Add support for other image sizes
export const ImageCard: React.FC<Props> = ({ image }) => {
  if (typeof image === "string" || !image.aspectRatio) return null

  return (
    <AspectRatio
      className="overflow-hidden"
      // @ts-ignore
      ratio={aspectRatios[image.aspectRatio]}
    >
      <Media resource={image} />
    </AspectRatio>
  )
}
