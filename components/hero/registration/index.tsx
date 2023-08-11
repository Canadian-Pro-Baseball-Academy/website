"use client"

import React from "react"
import { Page } from "@/payload-types"
import { QueryClient, QueryClientProvider } from "react-query"

import { cn } from "@/lib/utils"
import { Gutter } from "@/components/gutter"
import { Media } from "@/components/media"
import { RichText } from "@/components/rich-text"

import { FormCard } from "./form-card"

export const RegistrationHero: React.FC<Page["hero"]> = ({
  richText,
  forms,
  media,
}) => {
  const queryClient = new QueryClient()

  return (
    <section>
      {/* Hero Image */}
      <div className="relative">
        {/* Media Component */}
        <div
          className={cn(
            "absolute z-[1] inset-0 overflow-hidden h-3/4-screen",
            "after:absolute after:inset-0 after:z-[1] after:bg-primary/75"
          )}
        >
          {typeof media === "object" && media !== null && (
            <Media
              priority
              fill
              resource={media}
              className={cn(
                "relative pointer-events-none h-3/4-screen saturate-0"
              )}
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
      </div>

      {/* Hero Content Wrap*/}
      <div className={cn("relative z-[2]")}>
        <Gutter>
          {/* Hero Content */}
          <div
            className={cn(
              "flex flex-col h-2/3-screen md:h-3/4-screen justify-center text-background",
              "w-full lg:w-4/5 xl:w-3/5",
              "2xl:-mx-32 3xl:-mx-48"
            )}
          >
            <RichText
              className={cn(
                "[&>h1]:text-5xl md:[&>h1]:text-7xl [&>p]:max-w-[65ch] mt-4"
              )}
              content={richText}
            />
          </div>
        </Gutter>
      </div>

      {/* Registration Forms */}
      {forms && (
        <Gutter>
          <QueryClientProvider client={queryClient}>
            <div
              className={cn(
                "relative -mt-20 grid gap-6 z-[2]",
                "2xl:-mx-32 3xl:-mx-48",
                {
                  "md:grid-cols-2": forms.length % 2 === 0,
                  "lg:grid-cols-3": forms.length % 3 === 0,
                  "md:grid-cols-2 2xl:grid-cols-4": forms.length % 4 === 0,
                }
              )}
            >
              {forms.map((form, i) => {
                if (typeof form !== "object" || form === null) return null

                return <FormCard key={i} {...form} />
              })}
            </div>
          </QueryClientProvider>
        </Gutter>
      )}
    </section>
  )
}
