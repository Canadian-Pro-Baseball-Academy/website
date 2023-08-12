import React from "react"
import { Page, PageSetting, Team } from "@/payload-types"

import { cn } from "@/lib/utils"

import { Gutter as GutterOriginal } from "../gutter"
import { RichText } from "../rich-text"

type Layout = Exclude<Page["layout"], undefined>
type Props = Extract<Layout[0], { blockType: "content" }>

export const Content: React.FC<Props & { disableGutter?: boolean }> = ({
  contentBackgroundColor,
  contentFields,
  disableGutter = false,
}) => {
  if (!contentFields) return null

  const { columns, singleColumn } = contentFields

  const Gutter = disableGutter ? "div" : GutterOriginal

  return (
    <Gutter
      className={cn({
        "!text-primary-foreground": contentBackgroundColor === "primary",
        "text-secondary-foreground": contentBackgroundColor === "secondary",
        "!text-shaded-foreground": contentBackgroundColor === "shaded",
      })}
    >
      {columns &&
        columns.map((column) => {
          return (
            <div>
              <RichText content={column.richText} />
            </div>
          )
        })}
      {singleColumn && (
        <div>
          <RichText content={singleColumn.richText} />
        </div>
      )}
    </Gutter>
  )
}
