import React from "react"
import { Header } from "@/payload-types"
import { useMobileMenuStore } from "@/stores"

import { cn } from "@/lib/utils"
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

import { PayloadLink } from "../cms-link"
import { Icons } from "../icons"

type Menu = Exclude<Header["mainMenu"]["items"][0]["menu"], undefined>
type Blocks = Exclude<Menu["blocks"], undefined>

type HighlightItem = Extract<Blocks[0], { blockType: "menuHighlight" }>
type LinkItem = Extract<Blocks[0], { blockType: "menuLink" }>
type ColumnItem = Extract<Blocks[0], { blockType: "menuColumn" }>

// @ts-expect-error
const HighlightItem: React.FC<HighlightItem> = ({ highlightLink }) => {
  const setIsOpen = useMobileMenuStore((state) => state.setIsOpen)

  return (
    <li className="col-span-4 row-span-3">
      <NavigationMenuLink asChild>
        <PayloadLink
          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 font-semibold no-underline outline-none focus:shadow-md"
          onClick={() => setIsOpen(false)}
          {...highlightLink}
        />
      </NavigationMenuLink>
    </li>
  )
}

const LinkItem: React.FC<LinkItem> = ({ link }) => {
  const setIsOpen = useMobileMenuStore((state) => state.setIsOpen)

  return (
    <li className="col-span-4 block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted">
      <NavigationMenuLink asChild>
        <PayloadLink onClick={() => setIsOpen(false)} {...link} />
      </NavigationMenuLink>
    </li>
  )
}

const ColumnItem: React.FC<ColumnItem> = ({ name, links }) => {
  const setIsOpen = useMobileMenuStore((state) => state.setIsOpen)

  return (
    <li className="col-span-2">
      <h2 className="px-3 pb-2 text-xs font-medium text-muted-foreground">
        {name}
      </h2>
      <ul>
        {links?.map(({ link }, index) => {
          return (
            <li
              key={index}
              className={cn(
                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted"
              )}
            >
              <NavigationMenuLink asChild>
                <PayloadLink onClick={() => setIsOpen(false)} {...link} />
              </NavigationMenuLink>
            </li>
          )
        })}
      </ul>
    </li>
  )
}

const dropdowns = {
  menuHighlight: HighlightItem,
  menuLink: LinkItem,
  menuColumn: ColumnItem,
}

export const DesktopDropdown: React.FC<
  Header["mainMenu"]["items"][0] & { lightNav: boolean }
> = ({ label, menu, lightNav }) => {
  if (!menu) return null

  const { blocks } = menu

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (!hasBlocks) return null

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={cn({
          "text-foreground": lightNav,
        })}
      >
        {label}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid grid-cols-8 gap-1 p-4 md:w-[600px] lg:w-[700px]">
          {blocks.map((block, index) => {
            const { blockType } = block

            const BlockToRender = dropdowns[blockType] as any

            if (!BlockToRender) return null

            return <BlockToRender key={index} {...block} />
          })}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

export const MobileDropdown: React.FC<Header["mainMenu"]["items"][0]> = ({
  label,
  menu,
}) => {
  if (!menu) return null

  const { blocks } = menu

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (!hasBlocks) return null

  return (
    <AccordionItem value={label}>
      <AccordionTrigger
        className={cn(
          "flex w-full items-center justify-between py-4 font-heading font-bold tracking-wider",
          "text-2xl sm:text-3xl"
        )}
      >
        {label}
      </AccordionTrigger>
      <AccordionContent>
        <ul className="grid grid-cols-4 gap-1 sm:grid-cols-8 md:grid-cols-12">
          {blocks.map((block, index) => {
            const { blockType } = block

            const BlockToRender = dropdowns[blockType] as any

            if (!BlockToRender) return null

            return <BlockToRender key={index} {...block} />
          })}
        </ul>
      </AccordionContent>
    </AccordionItem>
  )
}
