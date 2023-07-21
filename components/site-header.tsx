"use client";

import React from "react";
import { Icons } from "./icons";
import Link from "next/link";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { cn } from "@/lib/utils";
import { Header } from "@/payload-types";
import { MainNavLeft, MainNavRight } from "./navigation/desktop";
import { MobileNav } from "./navigation/mobile";

export const SiteHeader: React.FC<Header> = ({ mainMenu, topBar }) => {
  const scrollPosition = useScrollPosition();

  return (
    <header
      className={cn(
        "fixed top-0 z-40 flex w-full justify-between bg-transparent transition-colors duration-300",
        scrollPosition > 50 ? "bg-shaded/90 backdrop-blur-md" : "bg-transparent"
      )}
    >
      <div className="flex items-center gap-4 px-8 pr-2 xl:gap-10">
        <Link href="/" className="flex items-center gap-2">
          <Icons.logo className="h-16 w-16" />
          <div className="text-background lg:hidden xl:block">
            <h1 className="text-xs font-bold">THE CALGARY</h1>
            <h2 className="font-heading text-3xl font-black">BISONS</h2>
          </div>
        </Link>
        <MainNavLeft {...mainMenu} />
      </div>
      <div className="flex items-center gap-10 px-8 pl-2">
        <MainNavRight />
        {/* <SecondaryNav /> */}
        <div className="lg:hidden">
          <MobileNav {...mainMenu} />
        </div>
      </div>
    </header>
  );
};
