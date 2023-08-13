import React from "react"
import { Metadata } from "next"
import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import { COACHES } from "@/graphql/coaches"
import { PageSetting } from "@/payload-types"

import { request } from "@/lib/cms"
import { CoachCard, CoachCardMini } from "@/components/coach-card"
import { Gutter } from "@/components/gutter"
import { Hero } from "@/components/hero"
import { DefaultHero } from "@/components/hero/default"
import { mergeMetadata } from "@/components/seo"
import ApiTest from "@/app/api-test"

const fetchPage = async (): Promise<PageSetting | null> => {
  const { isEnabled } = draftMode()

  const collection = `page-settings=coaching-staff`
  const data = await request<{ PageSettings: { docs: PageSetting[] } }>({
    collection,
    query: COACHES,
    draft: isEnabled,
  })

  const page = data.PageSettings?.docs[0] || null

  if (!page) return null

  return page
}

const CoachingStaffPage = async () => {
  const page = await fetchPage()

  if (!page) return notFound()

  return (
    <React.Fragment>
      {/* <DefaultHero {...page.hero} /> */}
      <Hero page={page} />
      <Gutter className="container 2xl:px-0 3xl:px-0">
        {page.coachingStaff && page.coachingStaff.mainCoaches && (
          <div className="grid gap-4 py-8 ">
            {page.coachingStaff.mainCoaches.map((coach, index) => {
              if (typeof coach === "object") {
                return <CoachCard {...coach} />
              }

              return null
            })}
          </div>
        )}
        {page.coachingStaff && page.coachingStaff.subsidaryCoaches && (
          <div className="flex flex-wrap justify-center py-8">
            {page.coachingStaff.subsidaryCoaches.map((coach, index) => {
              if (typeof coach === "object") {
                return <CoachCardMini {...coach} index={index} />
              }

              return null
            })}
          </div>
        )}
      </Gutter>
    </React.Fragment>
  )
}

export default CoachingStaffPage

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
