import React from "react"
import { notFound } from "next/navigation"
import { ROSTERS } from "@/graphql/rosters"
import { Team } from "@/payload-types"

import { request } from "@/lib/cms"
import { GenerateHeroData } from "@/lib/utils"
import { Gutter } from "@/components/gutter"
import { DefaultHero } from "@/components/hero/default"

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
      <section className="pb-12">
        <Gutter>
          <TeamButtons teams={teams} />
          <GameScheduleProvider />
        </Gutter>
      </section>
    </React.Fragment>
  )
}

export default GameSchedulePage
