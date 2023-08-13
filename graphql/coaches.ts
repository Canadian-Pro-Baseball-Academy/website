import { LINK_FIELDS } from "./links"
import { MEDIA_FIELDS } from "./media"
import { META_FIELDS } from "./meta"

export const COACHES = `
  query Coaches {
    PageSettings(where: { type: { equals: coachingStaff } }) {
      docs {
        hero {
          type
          richText
          links {
            link ${LINK_FIELDS()}
          }
          media ${MEDIA_FIELDS}
          values {
            value
          }
          previewTest
        }
        meta {
          ${META_FIELDS}
        }
        coachingStaff {
          mainCoaches {
            name
            headshot ${MEDIA_FIELDS}
            role {
              title
              roles {
                role
              }
              joinDate
            }
            career {
              achievement
            }
          }
          subsidaryCoaches {
            name
            headshot ${MEDIA_FIELDS}
            role {
              title
            }
          }
        }
      }
    }
  }
`
