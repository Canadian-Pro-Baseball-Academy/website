import { Media } from "@/components/media";
import { RichText } from "@/components/rich-text";
import { cn } from "@/lib/utils";
import { Page } from "@/payload-types";
import React from "react";
import { Balancer } from "react-wrap-balancer";
import Marquee from "react-fast-marquee";
import { PayloadLink } from "@/components/cms-link";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

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
            "absolute z-[1] inset-0 overflow-hidden h-full",
            "after:absolute after:inset-0 after:z-[1] after:bg-primary/75"
          )}
        >
          {typeof media === "object" && media !== null && (
            <Media
              priority
              fill
              resource={media}
              className={cn("relative pointer-events-none h-full saturate-0")}
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
        {/* Hero Content Wrap*/}
        <div className={cn("relative z-[2]")}>
          {/* Hero Content */}
          <div
            className={cn(
              "flex flex-col py-20 justify-center text-background",
              "mx-20 w-3/5"
            )}
          >
            <RichText
              className={cn("[&>h1]:text-6xl [&>p]:max-w-[65ch] mt-4")}
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
        </div>
      </div>
    </section>
  );
};
