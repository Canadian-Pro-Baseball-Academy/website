import Image from "next/image"
import { Page } from "@/payload-types"

import { cn } from "@/lib/utils"

import { PayloadLink } from "../cms-link"
import { Gutter } from "../gutter"
import { RichText } from "../rich-text"

export type CallToActionProps = Extract<
  NonNullable<Page["layout"]>[0],
  { blockType: "cta" }
>

export const CallToAction: React.FC<CallToActionProps> = ({
  ctaBackgroundColor,
  ctaFields,
}) => {
  if (!ctaFields) return null

  const { logo, alignment, richText, links } = ctaFields
  const hasLinks = links && links.length > 0

  const logoUrl =
    logo === "alternate"
      ? "https://admin.calgarybisons.ca/media/Calgary%20Bisons%20option%202.png"
      : "https://calgarybisons.payloadcms.app/media/bisons-logo.svg"

  return (
    <Gutter>
      <div
        className={cn(
          "relative border bg-primary py-12 text-center text-primary-foreground",
          "mx-auto w-full px-6 overflow-hidden"
        )}
      >
        <RichText
          content={richText}
          className="relative z-[1] text-primary-foreground [&>p]:mx-auto [&>p]:max-w-[55ch]"
        />
        {hasLinks && (
          <div className="relative z-[1] mt-6">
            <ul className="flex justify-center gap-4">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <PayloadLink {...link} size="lg" className="px-12" />
                </li>
              ))}
            </ul>
          </div>
        )}
        <div
          className={cn(
            "pointer-events-none absolute flex z-0 w-full overflow-hidden top-0 left-0",
            {
              "justify-end": alignment === "right",
              "justify-center": alignment === "center",
            }
          )}
        >
          <Image
            src={logoUrl}
            alt=""
            width={logo === "alternate" ? 300 : 500}
            height={logo === "alternate" ? 300 : 500}
            className={cn("opacity-20 overflow-hidden", {
              "sm:mr-10 mt-4": alignment === "right",
            })}
          />
        </div>
      </div>
    </Gutter>
  )
}
