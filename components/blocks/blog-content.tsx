import React from "react"
import { Post } from "@/payload-types"

import { Gutter } from "../gutter"
import { RichText } from "../rich-text"

type Layout = Exclude<Post["content"], undefined>
type Props = Extract<Layout[0], { blockType: "blogContent" }>

export const BlogContent: React.FC<Props> = ({ blogContentFields }) => {
  if (!blogContentFields) return null

  return (
    <Gutter>
      <div className="mx-auto max-w-[70ch]">
        <RichText content={blogContentFields.richText} />
      </div>
    </Gutter>
  )
}
