import React from "react"
import { Page, PageSetting, Team } from "@/payload-types"

import { RichText } from "../rich-text"

type Layout = Exclude<Page["layout"], undefined>
type Props = Extract<Layout[0], { blockType: "content" }>

export const Content: React.FC<Props> = ({ contentFields }) => {
  if (!contentFields) return null

  const { columns, singleColumn } = contentFields

  return (
    <div>
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
    </div>
  )
}
