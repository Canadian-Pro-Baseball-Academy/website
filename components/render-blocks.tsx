import React from "react"
import { Page, PageSetting } from "@/payload-types"

import { ContentGrid, GalleryImages, GallerySlider } from "./blocks"

const blockComponents = {
  "gallery-slider": GallerySlider,
  "gallery-images": GalleryImages,
  map: () => <div>Map</div>,
  "content-grid": ContentGrid,
}

type Gallery = Exclude<PageSetting["gallery"], undefined>
type PageType = Page["layout"]

type Props = {
  blocks: Gallery["gallery"] | PageType
}

export const RenderBlocks: React.FC<Props> = ({ blocks }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (!hasBlocks) return null

  return (
    <React.Fragment>
      {blocks.map((block, index) => {
        const { blockType, blockName } = block

        if (!blockType || !(blockType in blockComponents)) return null

        const Block = blockComponents[blockType] as any

        return (
          <div className="py-8">
            <Block key={index} {...block} />
          </div>
        )
      })}
    </React.Fragment>
  )
}
