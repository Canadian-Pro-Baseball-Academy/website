import React from "react"
import { PageSetting } from "@/payload-types"

import { GalleryImages, GallerySlider } from "./blocks"

const blockComponents = {
  "gallery-slider": GallerySlider,
  "gallery-images": GalleryImages,
}

type Props = {
  blocks: PageSetting["gallery"]["layout"]
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

        return <Block key={index} {...block} />
      })}
    </React.Fragment>
  )
}
