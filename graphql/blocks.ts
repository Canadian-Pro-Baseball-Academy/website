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

export const CONTENT = `
... on Content {
    id
    blockName
    blockType
    contentFields {
      columns {
        width
        alignment
        richText
        links {
            link ${LINK_FIELDS()}
        }
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
      columns {
        width
        content {
          ${MAP}
          ${CONTENT}
          ${GALLERY_IMAGES}
        }
      }
    }
  }
`
