"use client"

import React from "react"
import { useGameScheduleStore } from "@/stores"
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import axios from "axios"
import { format, parseISO, startOfDay } from "date-fns"

import { DataTable } from "./data-table"
import { columns, Event } from "./data-table/columns"

async function cleanData(data: any): Promise<Event[]> {
  const events = await Promise.all(
    data.collection.items.map(async (event: any) => {
      const idObject = event.data.find((data: any) => data.name === "id")
      const gameTypeObject = event.data.find(
        (data: any) => data.name === "game_type"
      )
      const cancelledObject = event.data.find(
        (data: any) => data.name === "is_canceled"
      )
      const tbdObject = event.data.find((data: any) => data.name === "is_tbd")
      const opponentRunsObject = event.data.find(
        (data: any) => data.name === "points_for_opponent"
      )
      const teamRunsObject = event.data.find(
        (data: any) => data.name === "points_for_team"
      )
      const dateTimeObject = event.data.find(
        (data: any) => data.name === "start_date"
      )
      const opponentObject = event.data.find(
        (data: any) => data.name === "opponent_name"
      )
      const locationIdObject = event.data.find(
        (data: any) => data.name === "location_id"
      )

      const date = startOfDay(parseISO(dateTimeObject.value as string))

      const time = format(parseISO(dateTimeObject.value as string), "h:mm bbb")

      let locationData = await axios.get(
        `https://api.teamsnap.com/v3/locations/${locationIdObject.value}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEAMSNAP_AUTH_TOKEN}`,
          },
        }
      )

      const location = locationData.data.collection.items.map((data: any) => {
        const latitudeObject = data.data.find(
          (data: any) => data.name === "latitude"
        )
        const longitudeObject = data.data.find(
          (data: any) => data.name === "longitude"
        )
        const addressObject = data.data.find(
          (data: any) => data.name === "address"
        )
        const nameObject = data.data.find((data: any) => data.name === "name")

        return {
          name: nameObject.value as string,
          latitude: latitudeObject.value as string,
          longitude: longitudeObject.value as string,
          address: addressObject.value as string,
        }
      })
      return {
        id: idObject.value as string,
        gameType: gameTypeObject.value as string,
        cancelled: cancelledObject.value as boolean,
        tbd: tbdObject.value as boolean,
        opponentRuns: opponentRunsObject.value as number,
        teamRuns: teamRunsObject.value as number,
        date: date,
        time: time,
        opponent: opponentObject.value as string,
        location: location[0],
        locationId: locationIdObject.value as string,
      }
    })
  )

  return events
}

const queryClient = new QueryClient()

export const GameScheduleProvider = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GameScheduleDataTable />
    </QueryClientProvider>
  )
}

const GameScheduleDataTable = () => {
  const { id, name } = useGameScheduleStore((state) => state.team)
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["game-schedule", id],
    queryFn: () =>
      axios
        .get(
          `https://api.teamsnap.com/v3/events/search?team_id=${id}&is_game=true`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEAMSNAP_AUTH_TOKEN}`,
            },
          }
        )
        .then(async (res) => await cleanData(res.data)),
  })

  if (!data || isLoading) return "Loading..."

  //@ts-ignore
  if (error) return "An error has occurred: " + error.message

  console.log(data)

  return (
    <section className="container">
      <DataTable columns={columns} data={data} />
    </section>
  )
}
