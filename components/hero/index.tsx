import React from "react"
import { Page } from "@/payload-types"

import { ContentMediaHero } from "./content-media"
import { DefaultHero } from "./default"
import { HomeHero } from "./home"
import { RegistrationHero } from "./registration"

const heroes = {
  default: DefaultHero,
  contentMedia: ContentMediaHero,
  form: DefaultHero,
  registration: RegistrationHero,
  home: HomeHero,
}

export const Hero: React.FC<{
  page: Page
}> = (props) => {
  const {
    page: {
      hero,
      breadcrumbs,
      hero: { type },
    },
  } = props

  const HeroToRender = heroes[type] as any

  if (HeroToRender) {
    return <HeroToRender {...hero} breadcrumbs={breadcrumbs} />
  }

  return null
}
