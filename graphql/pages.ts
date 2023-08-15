import {
  CONTENT,
  CONTENT_GRID,
  GALLERY_IMAGES,
  MAP,
  MEDIA_BLOCK,
  POSTS_HIGHLIGHT,
  SLIDER,
} from "./blocks"
import { LINK_FIELDS } from "./links"
import { MEDIA_FIELDS } from "./media"
import { META_FIELDS } from "./meta"

export const PAGES = `
  query Pages {
    Pages(limit: 300) {
      docs {
        slug
        breadcrumbs {
          url
          label
        }
      }
    }
  }
`

export const PAGE = `
  query Page($slug: String, $draft: Boolean) {
    Pages(where: { slug: { equals: $slug} }, draft: $draft) {
      docs {
        id
        title
        hero {
            type
            richText
            links {
              link ${LINK_FIELDS()}
            }
            forms {
              title
              description
              teamSnapId
            }
            media ${MEDIA_FIELDS}
            values {
              value
            }
            previewTest
        }
        layout {
          ${CONTENT_GRID()}
          ${MAP()}
          ${CONTENT()}
          ${GALLERY_IMAGES()}
          ${MEDIA_BLOCK()}
          ${SLIDER()}
          ${POSTS_HIGHLIGHT()}
        }
        meta {
          ${META_FIELDS}
        }
        breadcrumbs {
          url
          label
        }
      }
    }
  }
`
