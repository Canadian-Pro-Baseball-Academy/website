import { MEDIA_FIELDS } from "./media"

export const ROSTERS = `
  query Teams {
    Teams(limit: 15) {
      docs {
        name
        teamsnapId
        webCalendar
      }
    }
  }
`

export const ROSTER = `
  query Teams($slug: String, $draft: Boolean) {
    Teams(where: { teamsnapId: { equals: $slug} }, draft: $draft) {
      docs {
        id
      name
      coaches {
        id
      }
      teamPhoto ${MEDIA_FIELDS}
      teamsnapId
      roster {
        firstName
        lastName
        number
        positions
        homeTown
      }
      }
    }
  }
`
