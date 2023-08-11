import React from "react"

import { cn } from "@/lib/utils"

import classes from "./index.module.scss"

export type VerticalPaddingOptions = "large" | "medium" | "none"

type Props = {
  top?: VerticalPaddingOptions
  bottom?: VerticalPaddingOptions
  children: React.ReactNode
  className?: string
}

export const VerticalPadding: React.FC<Props> = ({
  top = "medium",
  bottom = "medium",
  className,
  children,
}) => {
  return (
    <div
      className={cn(className, {
        "pt-16 lg:pt-24": top === "large",
        "pt-8 lg:pt-12": top === "medium",
        "pb-16 lg:pb-24": bottom === "large",
        "pb-8 lg:pb-12": bottom === "medium",
      })}
    >
      {children}
    </div>
  )
}
