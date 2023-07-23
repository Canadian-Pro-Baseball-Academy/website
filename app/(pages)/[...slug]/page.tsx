import React from "react"
import { Metadata } from "next"
import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import { PAGE, PAGES } from "@/graphql/pages"
import { Page as PageType } from "@/payload-types"

import { request } from "@/lib/cms"
import { Hero } from "@/components/hero"
import { mergeMetadata } from "@/components/seo"

const fetchPage = async (
  incomingSlugSegments?: string[]
): Promise<PageType | null> => {
  const { isEnabled } = draftMode()
  // const token = cookies().get("payload-token");

  const slugSegments = incomingSlugSegments || ["home"]
  const slug = slugSegments.at(-1)

  const collection = `page=${slug}`
  const data = await request<{ Pages: { docs: PageType[] } }>({
    collection,
    query: PAGE,
    variables: { slug },
    // token: token,
    draft: isEnabled,
  })

  const pagePath = `/${slugSegments.join("/")}`

  const page = data.Pages?.docs.find(({ breadcrumbs }) => {
    if (!breadcrumbs) return false
    let { url } = breadcrumbs[breadcrumbs.length - 1]
    return url === pagePath
  })

  if (!page) return null

  return page
}

const Page = async ({ params: { slug } }: { params: { slug: string[] } }) => {
  const page = await fetchPage(slug)

  if (!page) return notFound()

  return (
    <React.Fragment>
      <Hero page={page} />
    </React.Fragment>
  )
}

export default Page

export async function generateStaticParams() {
  const pages = await request<{ Pages: { docs: PageType[] } }>({
    collection: "pages",
    query: PAGES,
  })

  return pages.Pages.docs.map(({ breadcrumbs }) => ({
    slug: breadcrumbs?.[breadcrumbs.length - 1]?.url
      ?.replace(/^\/|\/$/g, "")
      ?.split("/"),
  }))
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string[] }
}): Promise<Metadata> {
  const page = await fetchPage(slug)

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
