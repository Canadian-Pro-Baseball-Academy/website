import React from "react";

import { Page } from "@/payload-types";
import { HomeHero } from "./home";
import { RegistrationHero } from "./registration";
import { DefaultHero } from "./default";

const heroes = {
  default: DefaultHero,
  contentMedia: DefaultHero,
  form: DefaultHero,
  registration: RegistrationHero,
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
