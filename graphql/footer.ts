import { LINK_FIELDS } from "./links"
import { MEDIA_FIELDS } from "./media"

export const FOOTER = `
  query Footer {
    Footer {
      logo ${MEDIA_FIELDS}
      summary
      columns {
        label
        navItems {
          link ${LINK_FIELDS({ disableAppearance: true })}
        }
      }
    }
    SiteSetting {
      phoneNumber
      city
      province
      email
      socialLinks {
        facebook
        instagram
        twitter
        github
      }
    }
  }
`
