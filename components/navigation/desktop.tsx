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

export const MainNavLeft: React.FC<
  Header["mainMenu"] & { lightNav: boolean }
> = ({ items, lightNav }) => {
  if (!items) return null

  return (
    <NavigationMenu className="hidden lg:block">
      <NavigationMenuList>
        {items.map((item, index) => {
          if (!item.type) return null

          const ItemToRender = menuItems[item.type] as any

          if (ItemToRender) {
            return <ItemToRender key={index} {...item} lightNav={lightNav} />
          }
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export const MainNavRight: React.FC<{ lightNav: boolean }> = ({ lightNav }) => (
  <NavigationMenu className="hidden lg:block">
    <NavigationMenuList>
      <NavigationMenuItem>
        <Link href="/game-schedule" legacyBehavior passHref>
          <NavigationMenuLink
            className={cn(navigationMenuTriggerStyle(), {
              "text-foreground": lightNav,
            })}
          >
            Game Schedule
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link href="/register" legacyBehavior passHref>
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
