"use client"

import React from "react"
import Link from "next/link"
import { Footer, SiteSetting } from "@/payload-types"
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import { PayloadLink } from "./cms-link"
import { Gutter } from "./gutter"
import { Icons } from "./icons"
import { Media } from "./media"
import { RichText } from "./rich-text"
import { buttonVariants } from "./ui/button"
import { VerticalPadding } from "./vertical-padding"

export const SiteFooter: React.FC<{
  Footer: Footer
  SiteSetting: SiteSetting
}> = (props) => {
  const { Footer: footer, SiteSetting: siteSetting } = props
  console.log(footer)
  return (
    <footer className={cn("relative")}>
      {/* Site Map */}
      <div className={cn("relative bg-muted py-12")}>
        <Gutter>
          <div className="flex flex-col text-center flex-wrap items-center justify-between gap-5 text-center md:flex-row md:items-start md:gap-0 md:py-0 md:text-left">
            <div>
              {footer.logo && typeof footer.logo === "object" && (
                <Media src={footer.logo.url} width={50} height={50} className="[&>img]:mx-auto [&>img]:md:mx-0" />
              )}
              <div className="mt-4 max-w-[30ch]">
                <RichText
                  content={footer.summary}
                  className="[&>h1]:text-xl [&>h1]:font-bold"
                />
              </div>
            </div>
            {footer.columns &&
              footer.columns.map((column, index) => (
                <div>
                  <h3>{column.label}</h3>
                  <div className={cn("flex flex-col")}>
                    {column.navItems &&
                      column.navItems.map((program) => (
                        <PayloadLink
                          appearance="link"
                          className="justify-center md:justify-start px-0"
                          {...program.link}
                        />
                      ))}
                  </div>
                </div>
              ))}
            <div>
              <h3>Contact</h3>
              <div className={cn("flex flex-col")}>
                {siteSetting.province && siteSetting.city && (
                  <div
                    className={cn(
                      buttonVariants({
                        size: "sm",
                        variant: "link",
                      }),
                      "hover:no-underline",
                      "!pl-0 md:justify-start"
                    )}
                  >
                    <MapPinIcon className="h-h mr-2 w-4" /> {siteSetting.city},{" "}
                    {siteSetting.province}
                  </div>
                )}
                {siteSetting.email && (
                  <div
                    className={cn(
                      buttonVariants({
                        size: "sm",
                        variant: "link",
                      }),
                      "hover:no-underline",
                      "!pl-0 md:justify-start"
                    )}
                  >
                    <MailIcon className="h-h mr-2 w-4" />
                    {siteSetting.email}
                  </div>
                )}
                {siteSetting.phoneNumber && (
                  <div
                    className={cn(
                      buttonVariants({
                        size: "sm",
                        variant: "link",
                      }),
                      "hover:no-underline",
                      "!pl-0 md:justify-start"
                    )}
                  >
                    <PhoneIcon className="h-h mr-2 w-4" />
                    {siteSetting.phoneNumber}
                  </div>
                )}
                {siteSetting.socialLinks && (
                  <div className={cn("mt-1 flex justify-center md:justify-start space-x-3")}>
                    {siteSetting.socialLinks.facebook && (
                      <Link
                        href={siteSetting.socialLinks.facebook}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div
                          className={cn(
                            buttonVariants({
                              size: "icon",
                              variant: "ghost",
                            }),
                            "w-9"
                          )}
                        >
                          <Icons.facebook className="h-6 w-6" />
                          <span className="sr-only">Facebook</span>
                        </div>
                      </Link>
                    )}
                    {siteSetting.socialLinks.twitter && (
                      <Link
                        href={siteSetting.socialLinks.twitter}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div
                          className={cn(
                            buttonVariants({
                              size: "icon",
                              variant: "ghost",
                            }),
                            "w-9"
                          )}
                        >
                          <Icons.twitter className="h-6 w-6" />
                          <span className="sr-only">Twitter</span>
                        </div>
                      </Link>
                    )}
                    {siteSetting.socialLinks.instagram && (
                      <Link
                        href={siteSetting.socialLinks.instagram}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div
                          className={cn(
                            buttonVariants({
                              size: "icon",
                              variant: "ghost",
                            }),
                            "w-9"
                          )}
                        >
                          <Icons.instagram className="h-6 w-6" />
                          <span className="sr-only">Instagram</span>
                        </div>
                      </Link>
                    )}
                    {siteSetting.socialLinks.github && (
                      <Link
                        href={siteSetting.socialLinks.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div
                          className={cn(
                            buttonVariants({
                              size: "icon",
                              variant: "ghost",
                            }),
                            "w-9"
                          )}
                        >
                          <Icons.gitHub className="h-6 w-6" />
                          <span className="sr-only">GitHub</span>
                        </div>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Gutter>
      </div>

      <div className="bg-shaded text-shaded-foreground">
        <Gutter>
          <div className="flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
            <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
              <p className="!mt-0 text-center text-sm leading-loose md:text-left">
                &copy; 2023 All rights reserved{" "}
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline underline-offset-4"
                >
                  The Calgary Bisons
                </a>
                . Site hosted on{" "}
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline underline-offset-4"
                >
                  Vercel
                </a>
                .{" "}
                {siteSetting.socialLinks?.github && (
                  <>
                    The source code is available on{" "}
                    <a
                      href={siteSetting.socialLinks.github}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium underline underline-offset-4"
                    >
                      GitHub
                    </a>
                    .{" "}
                  </>
                )}
              </p>
            </div>
            {/* <ThemeToggle /> */}
          </div>
        </Gutter>
      </div>
    </footer>
  )
}
