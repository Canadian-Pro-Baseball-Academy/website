import React from "react"
import Link from "next/link"
import { Media as MediaType } from "@/payload-types"
import { differenceInDays, format } from "date-fns"

import { Media } from "./media"
import { AspectRatio } from "./ui/aspect-ratio"
import { Badge } from "./ui/badge"

type Props = {
  title?: string
  date?: string
  description?: string
  className?: string
  media: MediaType | string
  href: string
  orientation?: "horizontal" | "vertical"
}

export const ContentMediaCard: React.FC<Props> = (props) => {
  const { title, description, className, date, media, href, orientation } =
    props
  return (
    <div className="group flex flex-col gap-6">
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
      <div className="flex grow flex-col gap-3">
        {date && (
          <div className="flex gap-2 items-center">
            <p className="text-sm text-muted-foreground">
              {format(new Date(date), "MMMM d, yyyy")}
            </p>
            {differenceInDays(new Date(), new Date(date)) < 10 && (
              <Badge>New</Badge>
            )}
          </div>
        )}
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
