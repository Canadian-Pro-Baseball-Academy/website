import React from "react"
import Link from "next/link"
import { Media as MediaType } from "@/payload-types"

import { Media } from "./media"
import { AspectRatio } from "./ui/aspect-ratio"

type Props = {
  title?: string
  description?: string
  className?: string
  media: MediaType | string
  href: string
  orientation?: "horizontal" | "vertical"
}

export const ContentMediaCard: React.FC<Props> = (props) => {
  const { title, description, className, media, href, orientation } = props
  return (
    <div className="flex flex-col gap-6 group">
      {typeof media !== "string" && (
        <Link className="relative shrink-0 grow-0" href={href} prefetch={false}>
          <AspectRatio className="shadow-md" ratio={3 / 2}>
            <Media
              fill
              style={{ objectFit: "cover" }}
              resource={media}
              sizes="(max-width: 768px) 100vw, 20vw"
            />
          </AspectRatio>
        </Link>
      )}
      <div className="grow flex flex-col gap-3">
        <Link
          className="scroll-m-20 text-xl font-medium tracking-tight group-hover:underline"
          href={href}
          prefetch={false}
        >
          {title}
        </Link>
        <p>{description}</p>
      </div>
    </div>
  )
}
