import "../styles/globals.css"

import { Metadata } from "next"
import { draftMode } from "next/headers"
import { GLOBALS } from "@/graphql/globals"
import { HEADER } from "@/graphql/header"
import { Header, SiteSetting } from "@/payload-types"

import { request } from "@/lib/cms"
import { fontHeading, fontMono, fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { PreviewBar } from "@/components/preview-bar"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"

import ApiTest from "./api-test"

const fetchHeader = async () => {
  const { isEnabled } = draftMode()

  const data = await request<{ Header: Header }>({
    collection: "header",
    query: HEADER,
    draft: isEnabled,
  })

  return data
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const header = await fetchHeader()

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          suppressHydrationWarning={true}
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
            fontMono.variable,
            fontHeading.variable
          )}
        >
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader {...header.Header} />
            <main className="flex-1">{children}</main>
          </div>
          <TailwindIndicator />
          <PreviewBar />
        </body>
      </html>
    </>
  )
}
