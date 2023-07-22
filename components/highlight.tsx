import React from "react"

import { cn } from "@/lib/utils"

export const Highlight: React.FC<{
  text?: string
  className?: string
  inlineIcon?: React.ReactElement
  reverseIcon?: boolean
}> = (props) => {
  const { className, text, inlineIcon: InlineIcon, reverseIcon } = props

  if (text) {
    const words = text.trim().split(" ")

    if (Array.isArray(words) && words.length > 0) {
      return (
        <span className={cn("no-underline", className)}>
          {words.map((word, index) => {
            const isFirstWord = index === 0
            const isLastWord = index === words.length - 1

            return (
              <span
                key={index}
                className={cn(
                  "relative inline-flex will-change-[color]",
                  "before:pointer-events-none before:absolute before:bottom-0 before:left-1/2 before:h-1/2 before:w-full before:-translate-x-1/2 before:bg-accent before:opacity-70 before:will-change-[width]"
                )}
              >
                <span className="relative z-[1] text-orange-100">
                  {InlineIcon && reverseIcon && isFirstWord && (
                    <span>
                      {InlineIcon}
                      &nbsp;
                    </span>
                  )}
                  {!isLastWord && (
                    <React.Fragment>
                      {word}
                      &nbsp;
                    </React.Fragment>
                  )}
                  {isLastWord && (!InlineIcon || reverseIcon) && word}
                  {isLastWord &&
                    InlineIcon &&
                    !reverseIcon && ( // the icon and the last word need to render together, to prevent the icon from widowing
                      <span>
                        {word}
                        &nbsp;
                        {InlineIcon}
                      </span>
                    )}
                </span>
              </span>
            )
          })}
        </span>
      )
    }
  }

  return null
}
