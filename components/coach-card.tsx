import React from "react"
import Image from "next/image"
import { Coach } from "@/payload-types"
import Balancer from "react-wrap-balancer"

import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"

import { Media } from "./media"

export const CoachCard: React.FC<Coach & { index: number }> = ({
  name,
  headshot,
  role,
  index,
}) => {
  return (
    <div className="group grid cursor-pointer grid-cols-2 overflow-hidden">
      <div className="relative w-full overflow-hidden">
        <AspectRatio ratio={1}>
          {typeof headshot === "object" && headshot !== null && (
            <Media
              priority
              fill
              resource={headshot}
              className="h-full w-full bg-muted saturate-0 transition-all duration-100 group-hover:saturate-100"
              style={{ objectFit: "contain", height: "100%", width: "100%" }}
            />
          )}
        </AspectRatio>
      </div>
      <div
        className={cn(
          "flex items-center justify-center space-y-4 p-4 text-center transition-colors duration-200 group-hover:bg-primary",
          {
            "order-first": index % 4 > 1,
          }
        )}
      >
        <div>
          <h1 className="border-b pb-1 text-2xl font-semibold tracking-tight transition-colors group-hover:text-primary-foreground">
            {name}
          </h1>
          <h2 className="mt-4 scroll-m-20 text-lg font-semibold tracking-tight text-accent">
            {role?.title}
          </h2>
          <div className="mt-1 space-y-2 group-hover:text-primary-foreground">
            <Balancer>
              {role?.roles?.map((role) => (
                <p className="font-medium">{role.role}</p>
              ))}
            </Balancer>
            <p>Bisons Coach Since {role?.joinDate}</p>
          </div>
        </div>
        {/* <div>
          <h2 className="text-accent scroll-m-20 text-lg font-semibold tracking-tight mt-4">
            Career Highlights
          </h2>
          <div>
            {career?.map((achievement) => <p>- {achievement.achievement}</p>)}
          </div>
        </div> */}
      </div>
    </div>
  )
}

export const CoachCardMini: React.FC<Coach & { index: number }> = ({
  name,
  headshot,
  role,
}) => {
  return (
    <div className="max-w-1/6 group w-1/6 cursor-pointer overflow-hidden p-4">
      <div className="relative w-full overflow-hidden">
        <AspectRatio ratio={1}>
          {typeof headshot === "object" && headshot !== null && (
            <Media
              priority
              fill
              resource={headshot}
              className="h-full w-full bg-muted saturate-0 transition-all duration-100 group-hover:saturate-100"
              style={{ objectFit: "contain", height: "100%", width: "100%" }}
            />
          )}
        </AspectRatio>
      </div>
      <div className="py-2 text-center">
        <h1 className="text-xl font-semibold tracking-tight transition-colors">
          {name}
        </h1>
        <h2 className="scroll-m-20 text-sm font-semibold tracking-tight text-accent">
          {role?.title}
        </h2>
      </div>
    </div>
  )
}

export const CoachCardProto: React.FC<Coach> = ({
  name,
  headshot,
  role,
  career,
}) => {
  return (
    <div className="flex w-full flex-col rounded-lg bg-shaded sm:flex-row">
      <div className="relative w-full overflow-hidden sm:w-[350px]">
        <AspectRatio ratio={4 / 5}>
          {typeof headshot === "object" && headshot !== null && (
            <Media
              priority
              fill
              resource={headshot}
              className="h-full w-full"
              style={{ objectFit: "cover", height: "100%", width: "100%" }}
            />
          )}
        </AspectRatio>
      </div>
      <div className="flex-1 space-y-4 px-6 py-8">
        <div className="text-background">
          <h1 className="scroll-m-20 border-b-2 border-background/50 pb-2 text-4xl font-bold tracking-tight transition-colors first:mt-0">
            {name}
          </h1>
          <h2 className="mt-4 scroll-m-20 text-2xl font-semibold tracking-tight text-accent">
            {role?.title}
          </h2>
          <div className="text-lg">
            <p>{role?.roles?.map((role) => role.role).join(" | ")}</p>
            <p>Bisons Coach Since {role?.joinDate}</p>
          </div>
        </div>
        <div className="text-background">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight text-accent">
            Career Achievements
          </h2>
          <div className="text-lg">
            {career?.map((achievement) => <p>{achievement.achievement}</p>)}
          </div>
        </div>
      </div>
    </div>
  )
}
