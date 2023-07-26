import { ColumnDef } from "@tanstack/react-table"
import { format, isFuture } from "date-fns"

import { cn } from "@/lib/utils"

import { DataTableColumnHeader } from "./date-table-column-header"

export type Event = {
  id: string
  gameType: "away" | "home"
  cancelled: boolean
  tbd: boolean
  opponentRuns?: string
  teamRuns?: string
  date: Date
  time: string
  opponent: string
  location: {
    name: string
    longitude: string
    latitude: string
    address: string
  }
}

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">
        {format(row.getValue("date"), "MMM do, yyyy")}
      </div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time" />
    ),
    enableHiding: false,
  },
  {
    accessorKey: "opponent",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Opponent" />
    ),
  },

  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => {
      if (!row.original.location.latitude || !row.original.location.longitude) {
        return <div>{row.original.location.name}</div>
      }

      return (
        <div>
          <a
            className={cn("p-0 underline underline-offset-4")}
            href={`https://www.google.com/maps/search/?api=1&query=${row.original.location.address}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {row.original.location.name}
          </a>
        </div>
      )
    },
  },
  {
    accessorKey: "opponentRuns",
    header: "Result",
    enableSorting: false,
    cell: ({ row }) => {
      if (row.original.cancelled) {
        return (
          <div className="font-semibold text-muted-foreground">Cancelled</div>
        )
      }

      if (isFuture(row.original.date)) return <div>--</div>

      const runsAgainst = row.original.opponentRuns
      const runsFor = row.original.teamRuns

      if (!runsAgainst || !runsFor)
        return <div className="text-muted-foreground">N/A</div>

      return (
        <div className="flex items-center space-x-2">
          {parseInt(runsFor) < parseInt(runsAgainst) ? (
            <span className="font-black text-muted-foreground/50">L</span>
          ) : (
            <span className="font-black text-accent/50">W</span>
          )}
          <div>
            <span>{runsFor}</span>&nbsp;-&nbsp;<span>{runsAgainst}</span>
          </div>
        </div>
      )
    },
  },
]
