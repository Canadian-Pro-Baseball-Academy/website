import React from "react"
import { Metadata } from "next"
import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import { COACHES } from "@/graphql/coaches"
import { POSTS, POSTS_SUMMARY } from "@/graphql/posts"
import { PageSetting, Post } from "@/payload-types"

import { request } from "@/lib/cms"
import { mergeMetadata } from "@/components/seo"

import { RenderNewsArchive } from "./render-news-archive"

const fetchPage = async (): Promise<PageSetting | null> => {
  const { isEnabled } = draftMode()

  const collection = `page-settings=news`
  const data = await request<{ PageSettings: { docs: PageSetting[] } }>({
    collection,
    query: POSTS_SUMMARY,
    draft: isEnabled,
  })

  return data.PageSettings?.docs[0] || null
}

const Page = async () => {
  const currentDate = new Date()
  const {
    Posts: { docs: blogPosts },
  } = await request<{ Posts: { docs: Post[] } }>({
    collection: "posts",
    query: POSTS,
    variables: {
      publishedOn: currentDate,
    },
  })

  const page = await fetchPage()

  if (!page) return notFound()

  return <RenderNewsArchive page={page} posts={blogPosts} />
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchPage()

  const ogImage =
    typeof page?.meta?.image === "object" &&
    page?.meta?.image !== null &&
    "url" in page?.meta?.image &&
    `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/media/${page.meta.image.filename}`

  const metadata = await mergeMetadata({
    title: page?.meta?.title,
    description: page?.meta?.description,
    keywords: page?.meta?.keywords,
    openGraph: {
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
    },
  })

  return metadata
}

export default Page
