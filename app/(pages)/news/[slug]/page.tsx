import React from "react"
import { draftMode } from "next/headers"
import { POST, POST_SLUGS } from "@/graphql/posts"
import { Post as PostType } from "@/payload-types"

import { request } from "@/lib/cms"
import ApiTest from "@/app/api-test"

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

  return (
    <div>
      <ApiTest data={post} />
      {slug}
    </div>
  )
}

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

export default Post
