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
    <div className="bg-shaded p-8 lg:p-11 text-shaded-foreground flex flex-col h-full">
      {isQuote && (
        <QuoteIcon
          fill="currentColor"
          strokeWidth={0}
          className="w-6 h-6 lg:w-8 lg:h-8 mb-2 scale-[-1] text-shaded-foreground"
        />
      )}
      <RichText
        content={richText}
        className="font-sans text-xl lg:text-4xl font-medium flex-1"
      />
      {isQuote && quoteDate && (
        <time
          className="mt-8 tracking-wider text-xs lg:text-base"
          dateTime={quoteDate}
        >
          {format(new Date(quoteDate), "MMM d, yyyy")}
        </time>
      )}
    </div>
  )
}
