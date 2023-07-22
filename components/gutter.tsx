import React from "react"

import { cn } from "@/lib/utils"

type IGutter = {
  children: React.ReactNode
  className?: string
  disableMobile?: boolean
  leftGutter?: boolean
  rightGutter?: boolean
}

export const Gutter: React.FC<IGutter> = ({
  children,
  className,
  disableMobile,
  leftGutter = true,
  rightGutter = true,
}) => {
  return (
    <div
      className={cn(className, {
        "pl-5 md:pl-10 lg:pl-20 2xl:pl-60 3xl:pl-96": leftGutter,
        "pr-5 md:pr-10 lg:pr-20 2xl:pr-60 3xl:pr-96": rightGutter,
        "xs:max-sm:px-0": disableMobile,
      })}
    >
      {children}
    </div>
  )
}
