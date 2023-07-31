import React from "react"
import { Metadata } from "next"
import { COACHES } from "@/graphql/coaches"
import { PageSetting } from "@/payload-types"

import { request } from "@/lib/cms"
import { CoachCard, CoachCardMini } from "@/components/coach-card"
import { Gutter } from "@/components/gutter"
import { DefaultHero } from "@/components/hero/default"
import { mergeMetadata } from "@/components/seo"
import ApiTest from "@/app/api-test"

const CoachingStaffPage = async () => {
  const {
    PageSetting: { coachingStaff: page },
  } = await request<{
    PageSetting: { coachingStaff: PageSetting["coachingStaff"] }
  }>({
    collection: "coaches",
    query: COACHES,
  })

  return (
    <React.Fragment>
      <DefaultHero {...page.hero} />
      <ApiTest data={page} />
      <Gutter>
        {page.coaches && page.coaches.mainCoaches && (
          <div className="grid grid-cols-2 py-8">
            {page.coaches.mainCoaches.map((coach, index) => {
              if (typeof coach === "object") {
                return <CoachCard {...coach} index={index} />
              }

              return null
            })}
          </div>
        )}
        {page.coaches && page.coaches.subsidaryCoaches && (
          <div className="flex flex-wrap justify-center py-8">
            {page.coaches.subsidaryCoaches.map((coach, index) => {
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
