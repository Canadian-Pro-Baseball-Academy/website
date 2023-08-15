import React from "react"
import { PageSetting, Post } from "@/payload-types"

import { GenerateHeroData } from "@/lib/utils"
import { ContentMediaCard } from "@/components/content-media-card"
import { Gutter } from "@/components/gutter"
import { Hero } from "@/components/hero"
import { DefaultHero } from "@/components/hero/default"

export const RenderNewsArchive: React.FC<{
  page: PageSetting
  posts: Post[]
}> = ({ page, posts }) => {
  return (
    <React.Fragment>
      <Hero page={page} />
      <Gutter>
        <div className="grid grid-cols-3 gap-8 py-16">
          {(posts || []).map((post) => {
            return (
              <div key={post.id}>
                <ContentMediaCard
                  title={post.title}
                  description={post?.meta?.description}
                  href={`/news/${post.slug}`}
                  media={post.image}
                />
              </div>
            )
          })}
        </div>
      </Gutter>
    </React.Fragment>
  )
}
