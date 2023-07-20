import { PayloadLink } from "@/components/cms-link";
import { Gutter } from "@/components/gutter";
import { Media } from "@/components/media";
import { RichText } from "@/components/rich-text";
import { cn } from "@/lib/utils";
import { Page } from "@/payload-types";
import React from "react";

export const ContentMediaHero: React.FC<Page["hero"]> = ({
  richText,
  media,
  links,
}) => {
  return (
    <section>
      <Gutter rightGutter={false}>
        {/* Grid */}
        <div
          className={cn(
            "grid grid-cols-12 items-center gap-8",
            "2xl:-ml-32 3xl:-ml-48"
          )}
        >
          {/* Hero Content */}
          <div className="col-span-5">
            <RichText content={richText} />
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

          {/* Media */}
          {typeof media === "object" && media !== null && (
            <div className="col-span-7">
              <Media resource={media} sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
          )}
        </div>
      </Gutter>
    </section>
  );
};
