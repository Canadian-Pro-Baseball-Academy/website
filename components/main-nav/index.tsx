import { Header } from "@/payload-types";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Dropdown } from "./dropdown";
import { Single } from "./single";

const menuItems = {
  single: Single,
  dropdown: Dropdown,
};

export const MainNav: React.FC<Header["mainMenu"]> = ({ items }) => {
  if (!items) return null;

  return (
    <NavigationMenu className="text-background8">
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
