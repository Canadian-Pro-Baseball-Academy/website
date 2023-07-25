"use client"

import { useGameScheduleStore } from "@/stores"
import { Table } from "@tanstack/react-table"
import { CalendarDaysIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const webCalendar = useGameScheduleStore((state) => state.team.webCalendar)

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search Opponents..."
          value={
            (table.getColumn("opponent")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("opponent")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[200px] lg:w-[300px]"
        />
      </div>
      {webCalendar && (
        <div>
          <a
            className={cn(
              buttonVariants({ variant: "outline" }),
              "ml-auto flex h-8"
            )}
            href={webCalendar}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="hidden mr-2 sm:block">Download Calendar</span>
            <CalendarDaysIcon className="h-4 w-4" />
          </a>
        </div>
      )}
    </div>
  )
}
