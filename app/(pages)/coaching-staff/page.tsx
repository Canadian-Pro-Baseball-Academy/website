import React from "react"
import { Metadata } from "next"
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

const CoachingStaffPage = async () => {
  const {
    PageSettings: { docs: res },
  } = await request<{ PageSettings: { docs: PageSetting[] } }>({
    collection: "page-settings=coaching-staff",
    query: COACHES,
  })

  const page = res[0]

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
  const metadata = await mergeMetadata({
    title: "Coaching Staff | Calgary Bisons Baseball",
    description:
      "Meet our exceptional coaching staff, guiding athletes to greatness with expertise and passion. Discover the mentors behind our exeptional teams.",
  })

  return metadata
}
