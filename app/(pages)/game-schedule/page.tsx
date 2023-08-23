import React from "react"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { ROSTERS } from "@/graphql/rosters"
import { Team } from "@/payload-types"

import { request } from "@/lib/cms"
import { GenerateHeroData } from "@/lib/utils"
import { Gutter } from "@/components/gutter"
import { DefaultHero } from "@/components/hero/default"
import { mergeMetadata } from "@/components/seo"
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

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await mergeMetadata({
    title: `Game Schedule | Calgary Bisons Baseball`,
    description:
      "Explore the upcoming game schedule of Calgary Bisons. Get ready for thrilling matchups and support our team's journey in the world of baseball.",
    keywords:
      "Calgary Bisons game schedule, upcoming matches, exciting matchups, team journey, baseball season, support our team",
  })

  return metadata
}
