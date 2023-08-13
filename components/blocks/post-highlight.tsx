import React from "react"
import { Page } from "@/payload-types"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

import { ContentMediaCard } from "../content-media-card"
import { Gutter } from "../gutter"
import { RichText } from "../rich-text"

type Layout = Exclude<Page["layout"], undefined>
type Props = Extract<Layout[0], { blockType: "postsHighlight" }>

export const PostHighlight: React.FC<Props> = ({ postHighlightFields }) => {
  const { useLeadingHeader, leadingHeader, posts } = postHighlightFields

  if (!posts || posts.length === 0) return null

  return (
    <div>
      <Gutter>
        {useLeadingHeader && leadingHeader && (
          <RichText content={leadingHeader} className="max-w-[900px] mb-8" />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => {
            if (typeof post !== "object") return null
            return (
              <div key={index}>
                <ContentMediaCard
                  title={post.title}
                  description={post.meta?.description}
                  href={`/news/${post.slug}`}
                  media={post.image}
                  orientation={posts.length < 3 ? "horizontal" : undefined}
                />
              </div>
            )
          })}
        </div>
      </Gutter>
    </div>
  )
}
