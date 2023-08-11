import React from "react"
import { Page } from "@/payload-types"

import { cn } from "@/lib/utils"
import { Gutter } from "@/components/gutter"

import { RichText } from "../rich-text"
import { Content } from "./content"
import { GalleryImages } from "./gallery-images"
import { Map } from "./map"

const columnComponents = {
  map: Map,
  content: Content,
  galleryImages: GalleryImages,
}

type Layout = Exclude<Page["layout"], undefined>
type Props = Extract<Layout[0], { blockType: "contentGrid" }>

export const ContentGrid: React.FC<Props> = ({ contentGridFields }) => {
  if (!contentGridFields) return null

  const { useLeadingHeader, leadingHeader, alignment, columns } =
    contentGridFields

  const hasColumns = columns && Array.isArray(columns) && columns.length > 0

  if (!hasColumns) return null

  return (
    <section>
      <Gutter>
        {useLeadingHeader && leadingHeader && (
          <div className="mb-8 max-w-[65ch]">
            <RichText content={leadingHeader} />
          </div>
        )}
        <div
          className={cn("flex flex-wrap gap-y-12", {
            "items-center": alignment === "center",
            "items-start": alignment === "start",
            "items-end": alignment === "end",
          })}
        >
          {columns.map(({ width, content }, index) => {
            if (!content) return null

            const { blockType, blockName } = content[0]

            if (!blockType || !(blockType in columnComponents)) return null

            const Block = columnComponents[blockType] as any

            return (
              <div
                key={index}
                className={cn("px-4", {
                  "w-full": width === "full",
                  "w-full md:w-1/2": width === "half",
                  "w-full sm:w-1/2 lg:w-1/3": width === "oneThird",
                  "w-full sm:w-1/2 lg:w-2/3": width === "twoThirds",
                })}
              >
                <Block {...content[0]} disableGutter />
              </div>
            )
          })}
        </div>
      </Gutter>
    </section>
  )
}
