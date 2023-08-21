import React from "react"
import { Header } from "@/payload-types"

import { RichText } from "./rich-text"

export const TopBar: React.FC<Header["topBar"]> = ({ announcement }) => {
  return (
    <div>
      {announcement && (
        <div className="flex justify-center bg-shaded py-2">
          <RichText
            content={announcement.desktop}
            className="hidden text-sm text-shaded-foreground sm:block [&>p>a]:!underline-offset-2 [&>p]:decoration-dotted"
          />
          <RichText
            content={announcement.mobile}
            className="text-sm text-shaded-foreground sm:hidden [&>p>a]:!underline-offset-2 [&>p]:decoration-dotted"
          />
        </div>
      )}
    </div>
  )
}
