import { LINK_FIELDS } from "./links"
import { MEDIA_FIELDS } from "./media"

export const COACHES = `
  query Cocahes {
    PageSetting {
      coachingStaff {
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
        coaches {
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
