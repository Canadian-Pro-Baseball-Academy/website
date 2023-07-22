"use client"

import React from "react"
import Link from "next/link"
import { Header } from "@/payload-types"

import { cn } from "@/lib/utils"
import { Accordion } from "@/components/ui/accordion"
import { buttonVariants } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Icons } from "../icons"
import { NavigationMenu } from "../ui/navigation-menu"
import { MobileDropdown } from "./dropdown"
import { MobileSingle } from "./single"

export const MobileNav: React.FC<Header["mainMenu"]> = ({ items }) => {
  const [open, setOpen] = React.useState(false)

  const accordianItems = items.filter((item) => item.type === "dropdown")
  const singleItems = items.filter((item) => item.type === "single")

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
      >
        <Icons.menu className="h-6 w-6 text-background" />
        <span className="sr-only">Menu</span>
      </SheetTrigger>
      <SheetContent side="top" className="flex h-4/5 flex-col pt-0">
        {/* Mobile Header */}
        <SheetHeader className="flex flex-row items-center justify-between gap-4 py-2 xl:gap-10">
          <Link href="/" className="flex items-center gap-2">
            <Icons.logo className="h-16 w-16" />
            <div className="lg:hidden xl:block">
              <h1 className="text-xs font-bold">THE CALGARY</h1>
              <h2 className="font-heading text-3xl font-black">BISONS</h2>
            </div>
          </Link>
          <SheetClose
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
            )}
          >
            <Icons.close className="h-6 w-6" />
            <span className="sr-only">close</span>
          </SheetClose>
        </SheetHeader>

        <ScrollArea className="flex-1">
          <NavigationMenu className="block w-full max-w-full">
            <Accordion type="multiple">
              {accordianItems.map((item, index) => {
                return <MobileDropdown key={index} {...item} />
              })}
            </Accordion>
            <ul>
              {singleItems.map((item, index) => {
                return <MobileSingle key={index} {...item} />
              })}
            </ul>
          </NavigationMenu>
        </ScrollArea>

        <SheetFooter className="flex items-center justify-end gap-2 py-2">
          <Link
            href="/schedule"
            className={buttonVariants({ variant: "ghost", size: "lg" })}
            onClick={() => {
              setOpen?.(false)
            }}
          >
            Game Schedule
          </Link>
          <Link
            href="/schedule"
            className={buttonVariants({ variant: "primary", size: "lg" })}
            onClick={() => {
              setOpen?.(false)
            }}
          >
            Join the Herd
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
