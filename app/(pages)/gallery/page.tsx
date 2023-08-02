import React from "react"
import { notFound } from "next/navigation"
import { GALLERY } from "@/graphql/gallery"
import { PageSetting } from "@/payload-types"

import { request } from "@/lib/cms"
import { DefaultHero } from "@/components/hero/default"
import { RenderBlocks } from "@/components/render-blocks"
import ApiTest from "@/app/api-test"

const RosterPage = async () => {
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

export default RosterPage
