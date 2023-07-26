"use client"

import React from "react"
import { Team } from "@/payload-types"
import { useGameScheduleStore } from "@/stores"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export const TeamButtons: React.FC<{ teams: Team[] }> = ({ teams }) => {
  const setSelectedTeam = useGameScheduleStore((state) => state.setTeam)
  const selectedTeam = useGameScheduleStore((state) => state.team)

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 py-8">
      {teams.map((team, index) => {
        return (
          <button
            key={index}
            className={cn(
              buttonVariants({
                variant:
                  team.teamsnapId === selectedTeam.id ? "primary" : "secondary",
              })
            )}
            onClick={() =>
              setSelectedTeam({
                id: team.teamsnapId,
                name: team.name,
                webCalendar: team?.webCalendar,
              })
            }
          >
            {team.name}
          </button>
        )
      })}
    </div>
  )
}
