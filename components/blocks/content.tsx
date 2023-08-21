import React from "react"
import { Page, PageSetting, Team } from "@/payload-types"

import { cn } from "@/lib/utils"

import { PayloadLink } from "../cms-link"
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
        columns.map(({ richText, links }) => {
          return (
            <div>
              <RichText content={richText} />
              {Array.isArray(links) && (
                <div className="mt-8">
                  <ul className="flex flex-wrap gap-4 md:flex-nowrap">
                    {links.map(({ link }, i) => (
                      <li key={i} className="w-full md:w-fit">
                        <PayloadLink {...link} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )
        })}
      {singleColumn && (
        <div>
          <RichText content={singleColumn.richText} />
          {Array.isArray(singleColumn.links) && (
            <div className="mt-8">
              <ul className="flex flex-wrap gap-4 md:flex-nowrap">
                {singleColumn.links.map(({ link }, i) => (
                  <li key={i} className="w-full md:w-fit">
                    <PayloadLink {...link} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </Gutter>
  )
}
