import React from "react"
import { COACHES } from "@/graphql/coaches"
import { PageSetting } from "@/payload-types"

import { request } from "@/lib/cms"
import { CoachCard } from "@/components/coach-card"
import { Gutter } from "@/components/gutter"
import { DefaultHero } from "@/components/hero/default"

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
      <Gutter>
        {page.coaches && page.coaches.coachesOrder && (
          <div className="grid grid-cols-2 py-8">
            {page.coaches.coachesOrder.map((coach, index) => {
              if (typeof coach === "object") {
                return <CoachCard {...coach} index={index} />
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
