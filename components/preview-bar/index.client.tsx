"use client"

import React from "react"

import { cn } from "@/lib/utils"

import { buttonVariants } from "../ui/button"

interface IPreviewBarProps {
  preview: boolean
}

const PreviewBarClient = ({ preview = false }: IPreviewBarProps) => {
  return (
    <div
      className={cn("fixed bottom-0 left-0 z-10 mb-6 ml-6", {
        hidden: !preview,
      })}
    >
      <button
        className={cn(
          buttonVariants({ variant: "primary", size: "lg" }),
          "shadow-md"
        )}
        onClick={async () => {
          await fetch("/api/disable-draft-mode")
          window.location.reload()
        }}
      >
        Exit Preview
      </button>
    </div>
  )
}

export default PreviewBarClient
