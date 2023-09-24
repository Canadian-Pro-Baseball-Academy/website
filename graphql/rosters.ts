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
  query Teams($slug: String) {
    Teams(where: { teamsnapId: { equals: $slug} }, draft: true) {
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
