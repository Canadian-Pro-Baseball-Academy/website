import { Header } from "@/payload-types";
import Link from "next/link";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Dropdown } from "./dropdown";
import { Single } from "./single";
import { buttonVariants } from "@/components/ui/button";

const menuItems = {
  single: Single,
  dropdown: Dropdown,
};

export const MainNavLeft: React.FC<Header["mainMenu"]> = ({ items }) => {
  if (!items) return null;

  return (
    <NavigationMenu className="hidden lg:block">
      <NavigationMenuList>
        {items.map((item, index) => {
          if (!item.type) return null;

          const ItemToRender = menuItems[item.type] as any;

          if (ItemToRender) {
            return <ItemToRender key={index} {...item} />;
          }
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export const MainNavRight = () => (
  <NavigationMenu className="hidden lg:block">
    <NavigationMenuList>
      <NavigationMenuItem>
        <Link href="/docs" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Game Schedule
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link href="/docs" legacyBehavior passHref>
          <NavigationMenuLink
            className={(navigationMenuTriggerStyle(), buttonVariants())}
          >
            Join the Herd
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);
