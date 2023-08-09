import React from "react"
import { Media as MediaType, PageSetting } from "@/payload-types"

import { Gutter as GutterOriginal } from "../gutter"
import { Media } from "../media"
import { AspectRatio } from "../ui/aspect-ratio"

const aspectRatios = {
  _1_7778: 1.7778,
  _1_3333: 1.3333,
  _1_5: 1.5,
  _1: 1,
  _1_25: 1.25,
  _3: 3,
  _0_6667: 0.6667,
  _0_5625: 0.5625,
  _2_3333: 2.3333,
}

const flexLayout = {
  _1: 1,
  _2: 2,
  _3: 3,
  _4: 4,
  _5: 5,
}

function splitArrayIntoSubarrays(num: number, arr: any) {
  const subarrays = []
  const chunkSize = Math.floor(arr.length / num)
  let remainingElements = arr.length % num
  let currentIndex = 0

  for (let i = 0; i < num; i++) {
    let subarraySize = chunkSize + (remainingElements > 0 ? 1 : 0)
    subarrays.push(arr.slice(currentIndex, currentIndex + subarraySize))
    currentIndex += subarraySize
    remainingElements--
  }

  return subarrays
}

type Gallery = Exclude<PageSetting["gallery"], undefined>
type Layout = Exclude<Gallery["gallery"], undefined>
type Props = Extract<Layout[0], { blockType: "gallery-images" }>

// TODO: Add leading header
export const GalleryImages: React.FC<Props & { disableGutter?: boolean }> = ({
  imagesFields,
  disableGutter = false,
}) => {
  const { leadingHeader, columns, images: imagesFromProps } = imagesFields

  if (!columns) return null

  const imageColumns = splitArrayIntoSubarrays(
    // @ts-ignore
    flexLayout[columns],
    imagesFromProps
  )

  const Gutter = disableGutter ? "div" : GutterOriginal

  return (
    <section>
      <Gutter className="flex flex-col gap-0 sm:flex-row sm:gap-2">
        {imageColumns.map((images) => {
          return (
            <div className="grow">
              {images.map((image: string | MediaType) => {
                if (typeof image !== "object") return null

                if (!image.aspectRatio) return null
                return (
                  <div className="relative mb-2 overflow-hidden rounded-md">
                    {/* @ts-ignore */}
                    <AspectRatio ratio={aspectRatios[image.aspectRatio]}>
                      <Media
                        resource={image}
                        fill
                        className="h-full w-full"
                        style={{ objectFit: "cover" }}
                      />
                    </AspectRatio>
                  </div>
                )
              })}
            </div>
          )
        })}
      </Gutter>
    </section>
  )
}
