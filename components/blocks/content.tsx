import React from "react"
import { Page, PageSetting, Team } from "@/payload-types"

import { RichText } from "../rich-text"

type Props = {
  contentFields?: {
    columns?: {
      width: "oneThird" | "half" | "twoThirds" | "full"
      alignment: "left" | "center" | "right"
      richText?: {
        [k: string]: unknown
      }[]
      links?: {
        link: {
          type?: "reference" | "custom"
          newTab?: boolean
          reference:
            | {
                value: string | Page
                relationTo: "pages"
              }
            | {
                value: string | PageSetting
                relationTo: "page-settings"
              }
            | {
                value: string | Team
                relationTo: "teams"
              }
          url: string
          label: string
          appearance?:
            | "primary"
            | "secondary"
            | "destructive"
            | "outline"
            | "ghost"
            | "link"
        }
        id?: string
      }[]
      id?: string
    }[]
  }
  id?: string
  blockName?: string
  blockType: "content"
}

export const Content: React.FC<Props> = ({ contentFields }) => {
  if (!contentFields || !contentFields.columns) return null

  const { columns } = contentFields

  return (
    <div>
      {columns.map((column) => {
        return (
          <div>
            <RichText content={column.richText} />
          </div>
        )
      })}
    </div>
  )
}
