import React from "react";

import { Page } from "@/payload-types";
import { HomeHero } from "./home";

const heroes = {
  default: HomeHero,
  contentMedia: HomeHero,
  form: HomeHero,
  registration: HomeHero,
  home: HomeHero,
};

export const Hero: React.FC<{
  page: Page;
}> = (props) => {
  const {
    page: {
      hero,
      breadcrumbs,
      hero: { type },
    },
  } = props;

  const HeroToRender = heroes[type] as any;

  if (HeroToRender) {
    return <HeroToRender {...hero} breadcrumbs={breadcrumbs} />;
  }

  return null;
};
