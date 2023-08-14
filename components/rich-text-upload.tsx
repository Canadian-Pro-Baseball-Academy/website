import React from "react"
import { Media as MediaType } from "@/payload-types"

import { cn } from "@/lib/utils"

import { PayloadLink, PayloadLinkType } from "./cms-link"
import { Media } from "./media"

export type RichTextUploadNodeType = {
  fields: {
    link?: PayloadLinkType
    enableLink?: boolean
  }
  value?: MediaType
  relationTo: string
}

export type Props = {
  node: any
  className?: string
}

export const RichTextUpload: React.FC<Props> = (props) => {
  const {
    node: { fields, value },
    className,
  } = props

  let Wrap: React.ComponentType<PayloadLinkType> | string = "div"

  const styles: React.CSSProperties = {}

  let wrapProps: PayloadLinkType = {}

  if (fields?.enableLink) {
    Wrap = PayloadLink
    wrapProps = {
      ...fields?.link,
    }
  }

  return (
    <div
      style={styles}
      className={cn(className, "w-4/5 mx-auto shadow-md my-8")}
    >
      <Wrap {...wrapProps}>
        <Media resource={value as MediaType} />
      </Wrap>
    </div>
  )
}

export default RichTextUpload
