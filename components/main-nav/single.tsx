import { Header } from "@/payload-types";
import React from "react";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { PayloadLink } from "@/components/cms-link";
import { cn } from "@/lib/utils";

export const Single: React.FC<Header["mainMenu"]["items"][0]> = ({
  label,
  link,
}) => {
  if (!link) return null;

  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <PayloadLink className={cn(navigationMenuTriggerStyle())} {...link}>
          {label}
        </PayloadLink>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};
