import React from "react"
import { Metadata } from "next"
import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import { ROSTER, ROSTERS } from "@/graphql/rosters"
import { Page, Team as TeamType } from "@/payload-types"

import { request } from "@/lib/cms"
import { GenerateHeroData } from "@/lib/utils"
import { DefaultHero } from "@/components/hero/default"
import { RosterTable } from "@/components/roster-table"
import { mergeMetadata } from "@/components/seo"
import ApiTest from "@/app/api-test"

const fetchTeam = async (slug?: string): Promise<TeamType | null> => {
  const { isEnabled } = draftMode()

  if (!slug) return null

  const data = await request<{ Teams: { docs: TeamType[] } }>({
    collection: `teams`,
    query: ROSTER,
    variables: { slug },
    draft: isEnabled,
  })

  const team = data.Teams.docs.find(({ teamsnapId }) => {
    if (!teamsnapId) return false
    return teamsnapId === slug
  })

  if (!team) return null

  return team
}

const RosterPage = async ({
  params: { slug },
}: {
  params: { slug: string }
}) => {
  const roster = await fetchTeam(slug)

  if (!roster) return notFound()

  const hero = GenerateHeroData(roster.name)

  return (
    <React.Fragment>
      <ApiTest data={roster} />
      <DefaultHero {...hero} />
      <RosterTable {...roster} />
    </React.Fragment>
  )
}

export default RosterPage

export async function generateStaticParams() {
  const rosters = await request<{ Teams: { docs: TeamType[] } }>({
    collection: "teams",
    query: ROSTERS,
  })

  return rosters.Teams.docs.map(({ teamsnapId }) => ({
    slug: teamsnapId,
  }))
}

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const roster = await fetchTeam(slug)

  const ogImage =
    typeof roster?.teamPhoto === "object" &&
    roster?.teamPhoto !== null &&
    "filename" in roster.teamPhoto &&
    `${process.env.NEXT_PUBLIC_CMS_URL}/media/${roster.teamPhoto.filename}`

  const metadata = await mergeMetadata({
    title: `${roster?.name} | Calgary Bisons Rosters`,
    description:
      "Explore our impressive roster page, showcasing a lineup of exceptional athletes. Witness their dedication and skills that make our team shine.",
    keywords:
      "athletes, roster, team lineup, player profiles, player statistics, sportsmanship, dedication, talent showcase, exceptional athletes, team members, player details, team roster, sports team, team players",
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
