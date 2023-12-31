// @ts-nocheck

import React from "react"
import { Page, PageSetting, Post } from "@/payload-types"

import ApiTest from "@/app/api-test"

import { BackgroundColor } from "./background-color"
import { ContentGrid, GalleryImages } from "./blocks"
import { BlogContent } from "./blocks/blog-content"
import { CallToAction } from "./blocks/call-to-action"
import { Content } from "./blocks/content"
import { Map } from "./blocks/map"
import { Media } from "./blocks/media"
import { PostHighlight } from "./blocks/post-highlight"
import { Slider } from "./blocks/slider"
import { VerticalPaddingOptions } from "./vertical-padding"

const blockComponents = {
  galleryImages: GalleryImages,
  map: Map,
  contentGrid: ContentGrid,
  content: Content,
  media: Media,
  slider: Slider,
  postsHighlight: PostHighlight,
  blogContent: BlogContent,
  cta: CallToAction,
}

type PageType = Page["layout"]
type PostType = Post["content"]

type Props = {
  blocks: PageType | PostType
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
        // Get Background color of block
        const backgroundColor = block[`${blockType}BackgroundColor`]
        // Get previous block and next block
        const prevBlock = blocks[index - 1]
        const nextBlock = blocks[index + 1]

        const prevBlockBackground =
          prevBlock?.[`${prevBlock.blockType}BackgroundColor`]
        const nextBlockBackground =
          nextBlock?.[`${nextBlock.blockType}BackgroundColor`]

        let paddingTop: VerticalPaddingOptions = "large"
        let paddingBottom: VerticalPaddingOptions = "large"

        if (backgroundColor === prevBlockBackground) {
          paddingTop = "medium"
        }

        if (backgroundColor === nextBlockBackground) {
          paddingBottom = "medium"
        }

        if (!Block) return null

        return (
          <BackgroundColor
            key={index}
            paddingTop={paddingTop}
            paddingBottom={paddingBottom}
            color={backgroundColor}
          >
            <Block {...block} />
          </BackgroundColor>
        )
      })}
    </React.Fragment>
  )
}
