import React from "react"
import { Metadata } from "next"
import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import { POST, POST_SLUGS } from "@/graphql/posts"
import { Post as PostType } from "@/payload-types"

import { request } from "@/lib/cms"
import { mergeMetadata } from "@/components/seo"
import ApiTest from "@/app/api-test"

import { NewsPost } from "./post"

const fetchPost = async (slug: string): Promise<PostType | null> => {
  const { isEnabled } = draftMode()
  // const token = cookies().get("payload-token");

  const collection = `posts=${slug}`
  const data = await request<{ Posts: { docs: PostType[] } }>({
    collection,
    query: POST,
    variables: { slug },
    draft: isEnabled,
  })

  return data.Posts?.docs[0] || null
}

const Post = async ({ params: { slug } }: { params: { slug: string } }) => {
  const post = await fetchPost(slug)

  if (!post) return notFound()

  return (
    <div className="mt-36">
      <ApiTest data={post} />
      <NewsPost {...post} />
    </div>
  )
}

export default Post

export async function generateStaticParams() {
  const {
    Posts: { docs: posts },
  } = await request<{ Posts: { docs: PostType[] } }>({
    collection: "posts",
    query: POST_SLUGS,
  })

  return posts.map(({ slug }) => ({
    slug,
  }))
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const page = await fetchPost(slug)

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
