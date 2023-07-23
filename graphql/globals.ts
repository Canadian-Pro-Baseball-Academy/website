import { MEDIA_FIELDS } from "./media"

export const GLOBALS = `
  query Globals {
    SiteSetting {
      meta {
        title
        description
        image ${MEDIA_FIELDS}
        keywords
      }
    }
  }
`
