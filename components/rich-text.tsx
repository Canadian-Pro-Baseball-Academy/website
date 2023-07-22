"use client"

import React from "react"

import { cn } from "@/lib/utils"

import { CustomRenderers, Node, Serialize } from "./serialize"

export const RichText: React.FC<{
  className?: string
  content: any
  customRenders?: CustomRenderers
}> = ({ className, content, customRenders }) => {
  if (!content) return null

  return (
    <div className={cn("first:mt-0 last:mb-0", className)}>
      <Serialize content={content} customRenderers={customRenders} />
    </div>
  )
}
