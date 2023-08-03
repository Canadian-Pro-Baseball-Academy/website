import React from "react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { GALLERY } from "@/graphql/gallery"
import { PageSetting } from "@/payload-types"

import { request } from "@/lib/cms"
import { DefaultHero } from "@/components/hero/default"
import { RenderBlocks } from "@/components/render-blocks"
import { mergeMetadata } from "@/components/seo"

const GalleryPage = async () => {
  const {
    PageSetting: { gallery: page },
  } = await request<{
    PageSetting: { gallery: PageSetting["gallery"] }
  }>({
    collection: "coaches",
    query: GALLERY,
  })

  if (!page) return notFound()

  return (
    <React.Fragment>
      <DefaultHero {...page.hero} />
      <RenderBlocks blocks={page.layout} />
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
