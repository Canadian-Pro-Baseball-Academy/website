import React from "react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { GALLERY } from "@/graphql/gallery"
import { PAGE } from "@/graphql/pages"
import { Page, PageSetting } from "@/payload-types"

import { request } from "@/lib/cms"
import { Hero } from "@/components/hero"
import { DefaultHero } from "@/components/hero/default"
import { RenderBlocks } from "@/components/render-blocks"
import { mergeMetadata } from "@/components/seo"
import ApiTest from "@/app/api-test"

const GalleryPage = async () => {
  const {
    PageSettings: { docs: res },
  } = await request<{ PageSettings: { docs: PageSetting[] } }>({
    collection: "page-settings=gallery",
    query: GALLERY,
  })

  const page = res[0]

  if (!page) return notFound()

  return (
    <React.Fragment>
      <ApiTest data={page} />
      <Hero page={page} />
      <RenderBlocks blocks={page.gallery?.gallery} />
    </React.Fragment>
  )
}

export default GalleryPage

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await mergeMetadata({
    title: "Photo Gallery | Calgary Bisons Baseball",
    description:
      "The Calgary Bisons photo gallery! Experience the highlights of our elite program, showcasing talent, dedication, and victories on the field.",
  })

  return metadata
}
