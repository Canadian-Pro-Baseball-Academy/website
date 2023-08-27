"use client"

import path from "path"
import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Header } from "@/payload-types"

import { cn } from "@/lib/utils"
import { useScrollPosition } from "@/hooks/useScrollPosition"

import { Gutter } from "./gutter"
import { Icons } from "./icons"
import { MainNavLeft, MainNavRight } from "./navigation/desktop"
import { MobileNav } from "./navigation/mobile"
import { TopBar } from "./top-bar"

export const SiteHeader: React.FC<Header> = ({ mainMenu, topBar }) => {
  const scrollPosition = useScrollPosition()
  const pathname = usePathname().split("/")

  const lightNav = pathname.includes("news") && pathname.length > 2

  return (
    <header className="fixed top-0 z-40 w-full">
      <TopBar {...topBar} />
      <div
        className={cn(
          "relative flex w-full justify-between bg-transparent py-2 transition-colors duration-300",
          "px-5 md:px-10 lg:px-20 2xl:px-32 3xl:px-48",
          scrollPosition > 80 &&
            lightNav &&
            "bg-background/90 backdrop-blur-md",
          scrollPosition > 80 && !lightNav && "bg-primary/90 backdrop-blur-md",
          scrollPosition < 80 && "bg-transparent"
        )}
      >
        <div className="flex items-center gap-4 xl:gap-10">
          <Link href="/" className="flex items-center gap-2">
            <Icons.logo className="h-16 w-16" />
            <div
              className={cn(
                "lg:hidden xl:block",
                lightNav ? "text-foreground" : "text-background"
              )}
            >
              <h1 className="text-sm font-bold">CALGARY</h1>
              <h2 className="font-heading leading-none text-3xl font-black">
                BISONS
              </h2>
            </div>
          </Link>
          <MainNavLeft {...mainMenu} lightNav={lightNav} />
        </div>
        <div className="flex items-center gap-10">
          <MainNavRight lightNav={lightNav} />
          {/* <SecondaryNav /> */}
          <div className="lg:hidden">
            <MobileNav {...mainMenu} />
          </div>
        </div>
      </div>
    </header>
  )
}
