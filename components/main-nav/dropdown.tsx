import { Header } from "@/payload-types";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import React from "react";
import { Icons } from "../icons";
import { PayloadLink } from "../cms-link";
import { cn } from "@/lib/utils";

type Menu = Exclude<Header["mainMenu"]["items"][0]["menu"], undefined>;
type Blocks = Exclude<Menu["blocks"], undefined>;

type HighlightItem = Extract<Blocks[0], { blockType: "menu-highlight" }>;
type LinkItem = Extract<Blocks[0], { blockType: "menu-link" }>;
type ColumnItem = Extract<Blocks[0], { blockType: "menu-column" }>;

// @ts-expect-error
const HighlightItem: React.FC<HighlightItem> = ({ highlightLink }) => {
  return (
    <li className="row-span-3 col-span-6">
      <NavigationMenuLink asChild>
        <PayloadLink
          className="font-semibold flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
          {...highlightLink}
        />
      </NavigationMenuLink>
    </li>
  );
};

const LinkItem: React.FC<LinkItem> = ({ link }) => {
  return (
    <li className="block col-span-6 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted">
      <NavigationMenuLink asChild>
        <PayloadLink {...link} />
      </NavigationMenuLink>
    </li>
  );
};

const ColumnItem: React.FC<ColumnItem> = ({ name, links }) => {
  return (
    <li className="col-span-3">
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
                <PayloadLink {...link} />
              </NavigationMenuLink>
            </li>
          );
        })}
      </ul>
    </li>
  );
};

const dropdowns = {
  "menu-highlight": HighlightItem,
  "menu-link": LinkItem,
  "menu-column": ColumnItem,
};

export const Dropdown: React.FC<Header["mainMenu"]["items"][0]> = ({
  label,
  menu,
}) => {
  if (!menu) return null;

  const { blocks } = menu;

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (!hasBlocks) return null;

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{label}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid grid-cols-12 gap-1 p-4 md:w-[600px] lg:w-[700px]">
          {blocks.map((block, index) => {
            const { blockType } = block;

            const BlockToRender = dropdowns[blockType] as any;

            if (!BlockToRender) return null;

            return <BlockToRender key={index} {...block} />;
          })}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};
