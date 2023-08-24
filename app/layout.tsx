import "../styles/globals.css"

import { Suspense } from "react"
import { draftMode } from "next/headers"
import { FOOTER } from "@/graphql/footer"
import { HEADER } from "@/graphql/header"
import { Footer, Header, SiteSetting } from "@/payload-types"

import { request } from "@/lib/cms"
import { fontHeading, fontMono, fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { PreviewBar } from "@/components/preview-bar"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"

import ApiTest from "./api-test"
import Loading from "./loading"
import { Analytics } from "@/components/analytics"

const fetchHeader = async () => {
  const { isEnabled } = draftMode()

  const header = await request<{ Header: Header }>({
    collection: "header",
    query: HEADER,
    draft: isEnabled,
  })

  const footer = await request<{ Footer: Footer; SiteSetting: SiteSetting }>({
    collection: "footer",
    query: FOOTER,
  })

  return {
    header,
    footer,
  }
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const data = await fetchHeader()

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="dns-prefetch" href={process.env.PAYLOAD_PUBLIC_SERVER_URL} />
        </head>
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
            <SiteHeader {...data.header.Header} />
            <Suspense fallback={<Loading />}>
              <main className="flex-1">{children}</main>
            </Suspense>
            <SiteFooter {...data.footer} />
          </div>
          <Analytics />
          <TailwindIndicator />
          <PreviewBar />
        </body>
      </html>
    </>
  )
}
