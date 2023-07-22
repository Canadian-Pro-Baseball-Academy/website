import React from "react"
import { Page } from "@/payload-types"

import { cn } from "@/lib/utils"
import { PayloadLink } from "@/components/cms-link"
import { Gutter } from "@/components/gutter"
import { Media } from "@/components/media"
import { RichText } from "@/components/rich-text"

export const DefaultHero: React.FC<Page["hero"]> = ({
  richText,
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
            "absolute inset-0 z-[1] h-full overflow-hidden",
            "after:absolute after:inset-0 after:z-[1] after:bg-primary/75"
          )}
        >
          {typeof media === "object" && media !== null && (
            <Media
              priority
              fill
              resource={media}
              className={cn("pointer-events-none relative h-full saturate-0")}
              style={{ objectFit: "cover" }}
            />
          )}
        </div>

        {/* Hero Content Wrap*/}
        <div className={cn("relative z-[2]")}>
          {/* Hero Content */}
          <Gutter>
            <div
              className={cn(
                "flex flex-col justify-center pb-20 pt-40 text-background",
                "w-3/5",
                "2xl:-mx-32 3xl:-mx-48"
              )}
            >
              <RichText
                className={cn("mt-4 [&>h1]:text-6xl [&>p]:max-w-[65ch]")}
                content={richText}
              />
              {/* Buttons */}
              {Array.isArray(links) && (
                <div className="mt-8">
                  <ul className="flex gap-4">
                    {links.map(({ link }, i) => (
                      <li key={i}>
                        <PayloadLink {...link} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Gutter>
        </div>
      </div>
    </section>
  )
}
