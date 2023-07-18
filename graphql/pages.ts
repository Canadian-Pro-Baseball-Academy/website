import { LINK_FIELDS } from "./links";
import { MEDIA_FIELDS } from "./media";

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
`;

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
            media ${MEDIA_FIELDS}
            values {
              value
            }
            previewTest
        }
        breadcrumbs {
          url
          label
        }
      }
    }
  }
`;
