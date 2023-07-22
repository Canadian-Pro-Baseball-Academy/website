import { LINK_FIELDS } from "./links";
import { MEDIA_FIELDS } from "./media";

export const HEADER = `
  query Header {
    Header {
      mainMenu {
        items {
          id
          type
          label
          link ${LINK_FIELDS({ disableAppearance: true, disableLabel: true })}
          menu {
            blocks {
              ... on MenuHighlight {
                id
                blockName
                blockType
                menuHighlightMedia ${MEDIA_FIELDS}
                highlightLink: link ${LINK_FIELDS({
                  disableAppearance: true,
                  enableDescription: true,
                })}
              }
              ... on MenuLink {
                id
                blockName
                blockType
                link ${LINK_FIELDS({
                  disableAppearance: true,
                  enableDescription: true,
                })}
              }
              ... on MenuColumn {
                id
                blockName
                blockType
                name
                links {
                  link ${LINK_FIELDS({
                    disableAppearance: true,
                  })}
                }
              }
            }
          }
        }
      }
    }
  }
`;
