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
  career,
  index,
}) => {
  return (
    <div className="grid group grid-cols-2 overflow-hidden cursor-pointer">
      <div className="relative w-full overflow-hidden">
        <AspectRatio ratio={1}>
          {typeof headshot === "object" && headshot !== null && (
            <Media
              priority
              fill
              resource={headshot}
              className="h-full w-full bg-muted saturate-0 group-hover:saturate-100 duration-100 transition-all"
              style={{ objectFit: "contain", height: "100%", width: "100%" }}
            />
          )}
        </AspectRatio>
      </div>
      <div
        className={cn(
          "px-4 py-4 space-y-4 flex justify-center items-center text-center group-hover:bg-primary transition-colors duration-200",
          {
            "order-first": index % 4 === 2 || index % 4 === 3,
          }
        )}
      >
        <div>
          <h1 className="border-b pb-1 text-2xl font-semibold tracking-tight transition-colors group-hover:text-primary-foreground">
            {name}
          </h1>
          <h2 className="text-accent scroll-m-20 text-lg font-semibold tracking-tight mt-4">
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

export const CoachCardProto: React.FC<Coach> = ({
  name,
  headshot,
  role,
  career,
}) => {
  return (
    <div className="w-full bg-shaded rounded-lg flex flex-col sm:flex-row">
      <div className="relative w-full sm:w-[350px] overflow-hidden">
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
      <div className="py-8 px-6 space-y-4 flex-1">
        <div className="text-background">
          <h1 className="scroll-m-20 border-b-2 border-background/50 pb-2 text-4xl font-bold tracking-tight transition-colors first:mt-0">
            {name}
          </h1>
          <h2 className="text-accent scroll-m-20 text-2xl font-semibold tracking-tight mt-4">
            {role?.title}
          </h2>
          <div className="text-lg">
            <p>{role?.roles?.map((role) => role.role).join(" | ")}</p>
            <p>Bisons Coach Since {role?.joinDate}</p>
          </div>
        </div>
        <div className="text-background">
          <h2 className="text-accent scroll-m-20 text-2xl font-semibold tracking-tight">
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
