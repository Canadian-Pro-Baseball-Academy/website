import { LINK_FIELDS } from "./links"
import { MEDIA_FIELDS } from "./media"

export const GALLERY = `
  query Gallery {
    PageSettings(where: { type: { equals: gallery } }) {
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
        }
        gallery {
          gallery {
            ... on GallerySlider {
              id
              blockName
              blockType
              sliderFields {
                leadingHeader
                slides {
                  id
                  image ${MEDIA_FIELDS}
                }
              }
            }
            ... on GalleryImages {
              id
              blockName
              blockType
              imagesFields {
                leadingHeader
                columns
                images ${MEDIA_FIELDS}
              }
            }
          }
        }
      }
    }
  }
`
