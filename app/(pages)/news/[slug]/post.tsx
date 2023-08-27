import React from "react"
import { Post } from "@/payload-types"
import { format } from "date-fns"
import Balancer from "react-wrap-balancer"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Gutter } from "@/components/gutter"
import { Media } from "@/components/media"
import { RenderBlocks } from "@/components/render-blocks"
import { RichText } from "@/components/rich-text"

export const NewsPost: React.FC<Post> = (props) => {
  const { title, publishedOn, image, excerpt, content, relatedPosts } = props

  return (
    <React.Fragment>
      <Gutter className="mb-4">
        <label className="text-sm font-semibold tracking-wider text-muted-foreground">
          Bisons News
        </label>
      </Gutter>
      <Gutter>
        <h1 className="w-4/5 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          <Balancer>{title}</Balancer>
        </h1>

        <div className="mt-4 flex gap-2">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src="https://admin.calgarybisons.ca/media/Calgary%20Bisons%20option%202.png"
              alt="@calgarybisons"
            />
            <AvatarFallback className="font-medium">CP</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">Canandian Pro Baseball Academy</p>
            <p className="text-sm text-muted-foreground">
              {format(new Date(publishedOn), "MMMM d, yyyy")}
            </p>
          </div>
        </div>
      </Gutter>

      <div className="mt-16 px-3 md:px-8 lg:px-12 2xl:px-32 3xl:px-48">
        <AspectRatio className="shadow-lg" ratio={16 / 9}>
          {typeof image !== "string" && (
            <Media
              resource={image}
              priority
              fill
              className="rounded-md"
              style={{ objectFit: "cover" }}
            />
          )}
        </AspectRatio>
      </div>
      <Gutter className="mt-16 flex">
        <div className="mx-auto lg:w-4/5">
          <RichText content={excerpt} className="text-2xl font-medium" />
        </div>
      </Gutter>
      <RenderBlocks blocks={content} />
    </React.Fragment>
  )
}
