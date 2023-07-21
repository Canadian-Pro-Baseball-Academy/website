import "../styles/globals.css";
import { PreviewBar } from "@/components/preview-bar";
import { cn } from "@/lib/utils";
import { fontHeading, fontMono, fontSans } from "@/lib/fonts";
import { SiteHeader } from "@/components/site-header";
import { draftMode } from "next/headers";
import { request } from "@/lib/cms";
import { HEADER } from "@/graphql/header";
import { Header } from "@/payload-types";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const fetchHeader = async () => {
  const { isEnabled } = draftMode();

  const data = await request<{ Header: Header }>({
    collection: "header",
    query: HEADER,
    draft: isEnabled,
  });

  return data;
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const header = await fetchHeader();

  return (
    <>
      <html lang="en">
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
            fontMono.variable,
            fontHeading.variable
          )}
        >
          <div className="relative flex min-h-screen flex-col mb-96 pb-96">
            <SiteHeader {...header.Header} />
            <main className="flex-1">{children}</main>
          </div>
          <PreviewBar />
        </body>
      </html>
    </>
  );
}
