"use client"

import React from "react"
import { Team } from "@/payload-types"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Gutter } from "@/components/gutter"

function cleanPositions(positions: string[]) {
  const cleanedPositions = positions.map((position) => {
    switch (position) {
      case "pitcher":
        return "P"
      case "outfield":
        return "OF"
      case "catcher":
        return "C"
      case "firstBase":
        return "1B"
      case "secondBase":
        return "2B"
      case "thirdBase":
        return "3B"
      case "shortstop":
        return "SS"
      case "middleInfield":
        return "Middle INF"
      case "cornerInfield":
        return "Corner INF"
      case "infield":
        return "INF"
      case "utility":
        return "UTIL"
    }
  })

  return cleanedPositions
}

export const RosterTable: React.FC<Team> = ({ name, roster }) => {
  if (!roster) return null

  return (
    <section className="container py-16">
      <h2 className="font-heading scroll-m-20 font-bold text-3xl tracking-tight transition-colors first:mt-0">
        Team Roster
      </h2>
      <Table className="mt-6">
        <TableCaption>Complete Roster for the {name}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Number</TableHead>
            <TableHead className="w-[150px]">First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Hometown</TableHead>
            <TableHead className="text-right">Position</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roster.map((player, index) => {
            return (
              <TableRow>
                <TableCell className="font-medium">
                  {player.number ? player.number : <EmptyPlaceholder />}
                </TableCell>
                <TableCell>{player.firstName}</TableCell>
                <TableCell>{player.lastName}</TableCell>
                <TableCell>
                  {player.homeTown ? player.homeTown : <EmptyPlaceholder />}
                </TableCell>
                <TableCell className="text-right">
                  {player.positions &&
                  Array.isArray(player.positions) &&
                  player.positions?.length > 0 ? (
                    <React.Fragment>
                      {cleanPositions(player.positions).join(" / ")}
                    </React.Fragment>
                  ) : (
                    <EmptyPlaceholder />
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </section>
  )
}

const EmptyPlaceholder = () => (
  <span className="font-normal text-muted-foreground/50">--</span>
)
