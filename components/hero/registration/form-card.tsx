"use client"

import React from "react"
import Link from "next/link"
import { TeamSnapForm } from "@/payload-types"
import axios from "axios"
import { format, isFuture, parseISO } from "date-fns"
import { useQuery } from "react-query"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { PayloadLink } from "@/components/cms-link"
import { RichText } from "@/components/rich-text"

const GetRegistrationForm = (id: number) => {
  return useQuery({
    queryKey: ["registrationForm", id],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.teamsnap.com/v3/registration_forms/search?id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TEAMSNAP_AUTH_TOKEN}`,
          },
        }
      )

      const data = await response.data
      const item = data.collection.items[0]

      const closeAtObject = item.data.find(
        (data: any) => data.name === "close_at"
      )
      const openAtObject = item.data.find(
        (data: any) => data.name === "open_at"
      )
      const participantCountObject = item.data.find(
        (data: any) => data.name === "participant_count"
      )
      const participantLimitObject = item.data.find(
        (data: any) => data.name === "participant_limit"
      )

      return {
        closesAt: closeAtObject.value as string,
        openAt: openAtObject.value as string,
        isOpen: isFuture(parseISO(closeAtObject.value)),
        participantCount: participantCountObject.value as string,
        participantLimit: participantLimitObject.value as string,
      }
    },
  })
}

export const FormCard: React.FC<TeamSnapForm> = ({
  title,
  description,
  teamSnapId,
  // links,
}) => {
  const { data, isLoading } = GetRegistrationForm(parseInt(teamSnapId))

  if (isLoading || !data) return <FormCardSkeleton />

  return (
    <div className="h-full min-h-[5rem] w-full bg-background px-6 py-4 shadow-md">
      <h1 className="scroll-m-20 font-heading text-xl font-semibold tracking-tight">
        {title}
      </h1>

      <div
        className={cn(
          "mt-1 flex items-center gap-2",
          data.isOpen ? "text-green-500" : "text-red-500"
        )}
      >
        <div
          className={cn(
            "h-2 w-2 rounded-full font-semibold",
            data.isOpen ? "bg-green-500" : "bg-red-500"
          )}
        />{" "}
        <p>{data.isOpen ? "Currently Open" : "Closed"}</p>
      </div>

      <RichText
        className="mt-4 line-clamp-4 text-muted-foreground"
        content={description}
      />

      <Separator className="my-4" orientation="horizontal" />

      {/* Registration Info */}
      <div>
        <p>
          Opens on{" "}
          <span className="font-medium capitalize">
            {format(parseISO(data.openAt), "MMM do, yyyy")} @{" "}
            {format(parseISO(data.openAt), "h:mm bbbb")}
          </span>
        </p>
        <p className="!mt-0">
          Closes on{" "}
          <span className="font-medium capitalize">
            {format(parseISO(data.closesAt), "MMM do, yyyy")} @{" "}
            {format(parseISO(data.closesAt), "h:mm bbbb")}
          </span>
        </p>
      </div>
      {parseInt(data.participantLimit) !== 0 && (
        <div className="mt-4 flex gap-4">
          <p>
            <span className="font-semibold">{data.participantCount}</span> spots
            taken
          </p>
          <p className="!mt-0">
            <span className="font-semibold">{data.participantLimit}</span> spots
            available
          </p>
        </div>
      )}
      <div className="mt-6">
        <ul className="flex gap-2">
          <li className="w-full">
            <Link
              className={cn(
                "w-full",
                buttonVariants({ variant: "primary", size: "sm" })
              )}
              target="_blank"
              rel="noopener noreferrer"
              href={`https://go.teamsnap.com/forms/${teamSnapId}`}
            >
              Register Now!
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

const FormCardSkeleton: React.FC = () => {
  return (
    <div className="h-full min-h-[5rem] w-full bg-background px-6 py-4 shadow-md">
      <Skeleton className="h-7" />
      <Skeleton className="mt-1 h-5 w-40" />
      <div className="mt-4">
        <Skeleton className="mt-1 h-6" />
        <Skeleton className="mt-1 h-6" />
        <Skeleton className="mt-1 h-6" />
      </div>

      <Separator className="my-4" orientation="horizontal" />

      {/* Registration Info */}
      <div>
        <Skeleton className="mt-1 h-6" />
        <Skeleton className="mt-1 h-6" />
      </div>
      <div className="mt-4 flex gap-4">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-6 w-40" />
      </div>
      {/* Buttons */}
      <div className="mt-6">
        <ul className="flex gap-2">
          <li>
            <Skeleton className="h-10 w-36" />
          </li>
          <li>
            <Skeleton className="h-10 w-36" />
          </li>
        </ul>
      </div>
    </div>
  )
}
