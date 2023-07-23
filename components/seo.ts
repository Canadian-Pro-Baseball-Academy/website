import { Metadata } from "next"
import { GLOBALS } from "@/graphql/globals"
import { SiteSetting } from "@/payload-types"

import { request } from "@/lib/cms"

const defaultSEO = async (): Promise<Metadata> => {
  const data = await request<{ SiteSetting: SiteSetting }>({
    collection: "sitesetting",
    query: GLOBALS,
  })

  const meta = data.SiteSetting.meta

  if (!meta)
    return {
      title: "Calgary Bisons Baseball",
    }

  const ogImage =
    typeof meta.image === "object" &&
    meta.image !== null &&
    "url" in meta.image &&
    `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/media/${meta.image.filename}`

  const metadata: Metadata = {
    title: meta?.title || "Calgary Bisons Baseball",
    description: meta?.description,
    keywords:
      meta?.keywords ||
      "Baseball training, Calgary Bisons, Baseball, Youth athletics, Youth Athletics Calgary, Character Development, Sports, Alberta Baseball, Elite Baseball",
    applicationName: "The Calgary Bisons Website",
    authors: [{ name: "Matt Dunn" }],
    creator: "Matt Dunn",
    openGraph: {
      type: "website",
      siteName: "The Calgary Bisons Website",
      title: meta?.title || "Calgary Bisons Baseball",
      description:
        meta?.description ||
        "The Calgary Bisons are an all-encompassing program fostering athletic and personal growth. Join us for elite training and life skills development.",
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : [
            {
              url: "/og-image.svg",
            },
          ],
    },
  }

  return metadata
}

export const mergeMetadata = async (metadata?: Metadata): Promise<Metadata> => {
  const defaults = await defaultSEO()

  const { title, description, keywords, openGraph, ...rest } = defaults

  if (!title || !description || !keywords || !openGraph)
    return {
      title: "Calgary Bisons Baseball",
    }

  return {
    title: metadata?.title || title,
    description: metadata?.description || description,
    keywords: metadata?.keywords || keywords,
    openGraph: {
      type: "website",
      siteName: "The Calgary Bisons Website",
      title: metadata?.title || title,
      description: metadata?.description || description,
      images: metadata?.openGraph?.images
        ? metadata?.openGraph?.images
        : openGraph?.images,
    },
    ...rest,
  }
}
