import { MEDIA_BLOCK } from "./blocks"
import { MEDIA_FIELDS } from "./media"
import { META_FIELDS } from "./meta"

export const POSTS = `
  query Posts($publishedOn: DateTime) {
    Posts(where: { publishedOn: { less_than_equal: $publishedOn} }, limit: 300 sort: "-publishedOn") {
      docs {
        id
        title
        image ${MEDIA_FIELDS}
        meta {
            ${META_FIELDS}
        }
        createdAt
        publishedOn
        slug
      }
    }
  }
`

export const POST_SLUGS = `
  query Posts {
    Posts(limit: 300) {
      docs {
        slug
      }
    }
  }
`

export const POST = `
  query Post($slug: String, $draft: Boolean) {
    Posts(where: { slug: { equals: $slug} }, draft: $draft) {
      docs {
        title
        image ${MEDIA_FIELDS}
        excerpt
        createdAt
        publishedOn
        content {
          ... on BlogContent {
            blockName
            blockType
            blogContentFields {
              richText
            }
          }
          ${MEDIA_BLOCK()}
        }
        meta {
          ${META_FIELDS}
        }
        relatedPosts {
          title
          meta {
            ${META_FIELDS}
          }
          slug
        }
      }
    }
  }
`
