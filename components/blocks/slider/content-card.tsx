import React from "react"
import { Page } from "@/payload-types"
import { format } from "date-fns"
import { QuoteIcon, TextQuoteIcon } from "lucide-react"

import { RichText } from "@/components/rich-text"

type Layout = Exclude<Page["layout"], undefined>

type Props = Extract<
  Layout[0],
  { blockType: "slider" }
>["sliderFields"]["contentSlides"][0]

export const ContentCard: React.FC<Props> = ({
  richText,
  isQuote,
  quoteDate,
}) => {
  return (
    <div className="flex h-full flex-col bg-shaded p-8 text-shaded-foreground lg:p-11">
      {isQuote && (
        <QuoteIcon
          fill="currentColor"
          strokeWidth={0}
          className="mb-2 h-6 w-6 scale-[-1] text-shaded-foreground lg:h-8 lg:w-8"
        />
      )}
      <RichText
        content={richText}
        className="flex-1 font-sans text-xl font-medium lg:text-4xl"
      />
      {isQuote && quoteDate && (
        <time
          className="mt-8 text-xs tracking-wider lg:text-base"
          dateTime={quoteDate}
        >
          {format(new Date(quoteDate), "MMM d, yyyy")}
        </time>
      )}
    </div>
  )
}
