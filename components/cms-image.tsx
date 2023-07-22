import React from "react"
import Image, { StaticImageData } from "next/image"

import { cn } from "@/lib/utils"

import { IMediaProps } from "./media"

export const PayloadImage: React.FC<IMediaProps> = ({
  imgClassName,
  onClick,
  blurURL: blurURLFromProps,
  sizes: sizesFromProps,
  resource,
  priority,
  fill,
  style,
  src: srcFromProps,
  alt: altFromProps,
  width: widthFromProps,
  height: heightFromProps,
}) => {
  let width: number | undefined = widthFromProps
  let height: number | undefined = heightFromProps
  let alt = altFromProps
  let src: StaticImageData | string | undefined = srcFromProps
  let blurURL =
    blurURLFromProps ||
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkcPpfDwADTQHCufSr0QAAAABJRU5ErkJggg=="

  if (!src && resource && typeof resource !== "string") {
    width = resource.width
    height = resource.height
    alt = resource.alt
    src = `https://calgarybisons.payloadcms.app/media/${resource.filename}`
    blurURL = resource.blurURL || blurURL
  }

  const sizes =
    sizesFromProps ||
    ["1536", "1280", "1024", "768", "640"]
      .map((size) => `(max-width: ${size}px) ${size}px`)
      .join(", ")

  return (
    <React.Fragment>
      <Image
        className={cn(imgClassName)}
        src={src || ""}
        alt={alt || ""}
        blurDataURL={blurURL}
        placeholder="blur"
        onClick={onClick}
        fill={fill}
        style={style}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={sizes}
        priority={priority}
      />
    </React.Fragment>
  )
}
