import React from "react"
import { Media as MediaType, Page } from "@/payload-types"

import { aspectRatios } from "@/lib/utils"

import { Gutter as GutterOriginal } from "../gutter"
import { Media } from "../media"
import { RichText } from "../rich-text"
import { AspectRatio } from "../ui/aspect-ratio"

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

type Layout = Exclude<Page["layout"], undefined>
type Props = Extract<Layout[0], { blockType: "galleryImages" }>

// TODO: Add leading header
export const GalleryImages: React.FC<Props & { disableGutter?: boolean }> = ({
  imagesFields,
  disableGutter = false,
}) => {
  const { useLeadingHeader, leadingHeader, columns, images } = imagesFields

  if (!columns) return null

  const imageColumns = splitArrayIntoSubarrays(
    // @ts-ignore
    flexLayout[columns],
    images
  )

  const Gutter = disableGutter ? "div" : GutterOriginal

  return (
    <section>
      <Gutter className="flex flex-col flex-wrap gap-0 sm:flex-row sm:gap-2">
        {useLeadingHeader && leadingHeader && (
          <div className="mb-8 w-full">
            <RichText content={leadingHeader} />
          </div>
        )}
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
