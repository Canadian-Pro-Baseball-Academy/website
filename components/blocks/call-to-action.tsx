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

  const { richText, links } = ctaFields
  const hasLinks = links && links.length > 0

  return (
    <Gutter>
      <div
        className={cn(
          "relative border bg-primary py-12 text-center text-primary-foreground",
          "mx-auto w-full px-6"
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
        <div className="pointer-events-none absolute left-0 top-0 z-0 h-full w-full overflow-hidden">
          <Image
            src="https://calgarybisons.payloadcms.app/media/bisons-logo.svg"
            alt=""
            width={500}
            height={500}
            className="opacity-20"
          />
        </div>
      </div>
    </Gutter>
  )
}
