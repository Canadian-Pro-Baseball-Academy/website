import { LINK_FIELDS } from "./links"
import { MEDIA_FIELDS } from "./media"

export const MAP = `
  ... on Map {
    id
    blockName
    blockType
    mapFields {
      map
      options {
        zoom
        animation
      }
    }
  }
`

export const GALLERY_IMAGES = `
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
`

interface ContentProps {
  displayWidth?: boolean
  displayAlignment?: boolean
  singleColumn?: boolean
}

export const CONTENT = ({
  displayWidth = true,
  displayAlignment = true,
  singleColumn = false,
}: ContentProps = {}): string => `
... on Content {
    id
    blockName
    blockType
    contentFields {
      ${
        singleColumn
          ? `singleColumn{
              ${displayWidth ? "width" : ""}
              ${displayAlignment ? "alignment" : ""}
              alignment
              richText
              links {
                link ${LINK_FIELDS()}
              }
            }`
          : `columns {
              ${displayWidth ? "width" : ""}
              ${displayAlignment ? "alignment" : ""}
              richText
              links {
                  link ${LINK_FIELDS()}
              }
            }`
      }
      
    }
  }
`

export const CONTENT_GRID = `
  ... on ContentGrid {
    id
    blockName
    blockType
    contentGridFields {
      useLeadingHeader
      leadingHeader
      alignment
      columns {
        width
        content {
          ${MAP}
          ${CONTENT({
            displayWidth: false,
            displayAlignment: false,
            singleColumn: true,
          })}
          ${GALLERY_IMAGES}
        }
      }
    }
  }
`
