import React from "react"
import Link from "next/link"
import { Header } from "@/payload-types"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { DesktopDropdown } from "./dropdown"
import { DesktopSingle } from "./single"

const menuItems = {
  single: DesktopSingle,
  dropdown: DesktopDropdown,
}

export const MainNavLeft: React.FC<Header["mainMenu"]> = ({ items }) => {
  if (!items) return null

  return (
    <NavigationMenu className="hidden lg:block">
      <NavigationMenuList>
        {items.map((item, index) => {
          if (!item.type) return null

          const ItemToRender = menuItems[item.type] as any

          if (ItemToRender) {
            return <ItemToRender key={index} {...item} />
          }
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export const MainNavRight = () => (
  <NavigationMenu className="hidden lg:block">
    <NavigationMenuList>
      <NavigationMenuItem>
        <Link href="/game-schedule" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Game Schedule
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link href="/docs" legacyBehavior passHref>
          <NavigationMenuLink
            className={cn(
              navigationMenuTriggerStyle(),
              buttonVariants(),
              "font-semibold"
            )}
          >
            Join the Herd
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
)
