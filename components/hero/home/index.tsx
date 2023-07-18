import { Media } from "@/components/media";
import { RichText } from "@/components/rich-text";
import { cn } from "@/lib/utils";
import { Page } from "@/payload-types";
import React from "react";
import { Balancer } from "react-wrap-balancer";

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
            "absolute z-[1] inset-0 overflow-hidden h-3/4-screen",
            "after:absolute after:inset-0 after:z-[1] after:bg-slate-900/75"
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
        {/* Hero Content */}
        <div
          className={cn(
            "flex flex-col h-3/4-screen justify-center text-background",
            "mx-20 w-3/5"
          )}
        >
          <RichText className={cn("[&>h1]:text-7xl")} content={richText} />
        </div>
      </div>
    </section>
  );
};
{
  /* */
}
