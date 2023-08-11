"use client"

import React, { createContext, useContext } from "react"

import { cn } from "@/lib/utils"
import {
  VerticalPadding,
  VerticalPaddingOptions,
} from "@/components/vertical-padding"

export type BackgroundColor = "primary" | "secondary" | "muted" | "white"

export const BackgroundColorContext = createContext<BackgroundColor>("white")

export const useBackgroundColor = (): BackgroundColor =>
  useContext(BackgroundColorContext)

type Props = {
  color?: BackgroundColor
  paddingTop?: VerticalPaddingOptions
  paddingBottom?: VerticalPaddingOptions
  className?: string
  children?: React.ReactNode
  id?: string
}

export const BackgroundColor: React.FC<Props> = (props) => {
  const {
    id,
    className,
    children,
    paddingTop,
    paddingBottom,
    color = "white",
  } = props

  return (
    <div
      id={id}
      className={cn(className, {
        "bg-background": color === "white",
        "bg-primary": color === "primary",
        "bg-secondary": color === "secondary",
        "bg-muted": color === "muted",
      })}
    >
      <BackgroundColorContext.Provider value={color}>
        <VerticalPadding top={paddingTop} bottom={paddingBottom}>
          {children}
        </VerticalPadding>
      </BackgroundColorContext.Provider>
    </div>
  )
}
