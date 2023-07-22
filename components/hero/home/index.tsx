import React from "react"
import Link from "next/link"
import { Page } from "@/payload-types"
import { ArrowRightIcon } from "lucide-react"
import Marquee from "react-fast-marquee"
import { Balancer } from "react-wrap-balancer"

import { cn } from "@/lib/utils"
import { PayloadLink } from "@/components/cms-link"
import { Gutter } from "@/components/gutter"
import { Media } from "@/components/media"
import { RichText } from "@/components/rich-text"

export const HomeHero: React.FC<Page["hero"]> = ({
  richText,
  values,
  links,
  media,
}) => {
  return (
    <section>
      {/* Hero Image */}
      <div className="relative">
        {/* Media Component */}
        <div
          className={cn(
            "absolute inset-0 z-[1] h-3/4-screen overflow-hidden",
            "after:absolute after:inset-0 after:z-[1] after:bg-primary/75"
          )}
        >
          {typeof media === "object" && media !== null && (
            <Media
              priority
              fill
              resource={media}
              className={cn(
                "pointer-events-none relative h-3/4-screen saturate-0"
              )}
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
      </div>

      {/* Hero Content Wrap*/}
      <div className={cn("relative z-[2]")}>
        {/* Hero Content */}
        <Gutter>
          <div
            className={cn(
              "flex h-3/4-screen flex-col justify-center text-background",
              "w-3/5",
              "2xl:-mx-32 3xl:-mx-48"
            )}
          >
            <RichText
              className={cn("mt-4 [&>h1]:text-7xl [&>p]:max-w-[65ch]")}
              content={richText}
            />
            {/* Buttons */}
            {Array.isArray(links) && (
              <div className="mt-8">
                <ul className="flex gap-4">
                  {links.map(({ link }, i) => (
                    <li key={i}>
                      <PayloadLink {...link} size="lg" />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Gutter>
      </div>

      {/* Values Marquee */}
      {/* {Array.isArray(values) && (
        <Marquee gradient={false} speed={70} className="py-6 bg-muted">
          {values.map(({ value }, i) => (
            <span
              key={i}
              className={cn(
                "block text-8xl leading-snug overflow-hidden text-muted-foreground/25 font-semibold tracking-tight mx-3",
                "after:content-['_—']"
              )}
            >
              {value}
            </span>
          ))}
        </Marquee>
      )} */}
    </section>
  )
}
