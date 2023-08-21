import React from "react"
import { notFound } from "next/navigation"
import { ROSTERS } from "@/graphql/rosters"
import { Team } from "@/payload-types"

import { request } from "@/lib/cms"
import { GenerateHeroData } from "@/lib/utils"
import { Gutter } from "@/components/gutter"
import { DefaultHero } from "@/components/hero/default"
import { VerticalPadding } from "@/components/vertical-padding"

import { GameScheduleProvider } from "./table-provider"
import { TeamButtons } from "./teams"

const GameSchedulePage = async () => {
  const {
    Teams: { docs: teams },
  } = await request<{ Teams: { docs: Team[] } }>({
    collection: "teams",
    query: ROSTERS,
  })

  if (!teams) return notFound()

  const hero = GenerateHeroData("Game Schedule")

  return (
    <React.Fragment>
      <DefaultHero {...hero} />
      <VerticalPadding bottom="large">
        <section>
          <Gutter>
            <p className="text-center text-sm text-muted-foreground">
              Click one of the above buttons to see their current game schedule
            </p>
            <TeamButtons teams={teams} />
            <div className="container mt-8">
              {/* https://api.teamsnap.com/v3/teams_results/8495762 */}
              <GameScheduleProvider />
            </div>
          </Gutter>
        </section>
      </VerticalPadding>
    </React.Fragment>
  )
}

export default GameSchedulePage
