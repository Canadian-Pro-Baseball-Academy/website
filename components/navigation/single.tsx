import React from "react"
import { Header } from "@/payload-types"

import { cn } from "@/lib/utils"
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { PayloadLink } from "@/components/cms-link"

export const DesktopSingle: React.FC<
  Header["mainMenu"]["items"][0] & { lightNav: boolean }
> = ({ label, link, lightNav }) => {
  if (!link) return null

  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <PayloadLink
          className={cn(navigationMenuTriggerStyle(), {
            "text-foreground": lightNav,
          })}
          {...link}
        >
          {label}
        </PayloadLink>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

export const MobileSingle: React.FC<Header["mainMenu"]["items"][0]> = ({
  label,
  link,
}) => {
  if (!link) return null

  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <PayloadLink
          className={cn(
            "flex w-full items-center justify-between border-b py-4 font-heading font-bold tracking-wider",
            "text-2xl sm:text-3xl"
          )}
          {...link}
        >
          {label}
        </PayloadLink>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}
