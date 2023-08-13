import { LINK_FIELDS } from "./links"
import { MEDIA_FIELDS } from "./media"

interface Props {
  hasBackgroundColor?: boolean
}

export const SLIDER = ({ hasBackgroundColor = true }: Props = {}): string => `
... on Slider {
  blockName
  blockType
  ${hasBackgroundColor ? "sliderBackgroundColor" : ""}
  sliderFields {
    useLeadingHeader
    leadingHeader
    sliderType
    imageSlides {
      image ${MEDIA_FIELDS}
    }
    contentSlides {
      richText
      isQuote
      quoteDate
    }
  }
}
`

export const MEDIA_BLOCK = ({
  hasBackgroundColor = true,
}: Props = {}): string => `
  ... on MediaBlock {
    blockType
    ${hasBackgroundColor ? "mediaBackgroundColor" : ""}
    mediaFields {
      embed
      embedVideo {
        platform
        videoID
        aspectRatio
        manualThumbnail ${MEDIA_FIELDS}
      }
      internalMedia {
        media ${MEDIA_FIELDS}
      }
      size
      caption
    }
  }
`

export const MAP = ({ hasBackgroundColor = true }: Props = {}): string => `
  ... on Map {
    id
    blockName
    blockType
    ${hasBackgroundColor ? "mapBackgroundColor" : ""}
    mapFields {
      map
      options {
        zoom
        animation
      }
    }
  }
`
export const GALLERY_IMAGES = ({
  hasBackgroundColor = true,
}: Props = {}): string => `
  ... on GalleryImages {
    id
    blockName
    blockType
    ${hasBackgroundColor ? "galleryImagesBackgroundColor" : ""}
    imagesFields {
      useLeadingHeader
      leadingHeader
      columns
      images ${MEDIA_FIELDS}
    }
  }
`

interface ContentProps extends Props {
  displayWidth?: boolean
  displayAlignment?: boolean
  singleColumn?: boolean
}

export const CONTENT = ({
  displayWidth = true,
  displayAlignment = true,
  hasBackgroundColor = true,
  singleColumn = false,
}: ContentProps = {}): string => `
... on Content {
    id
    blockName
    blockType
    ${hasBackgroundColor ? "contentBackgroundColor" : ""}
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

export const CONTENT_GRID = ({
  hasBackgroundColor = true,
}: Props = {}): string => `
  ... on ContentGrid {
    id
    blockName
    blockType
    ${hasBackgroundColor ? "contentGridBackgroundColor" : ""}
    contentGridFields {
      useLeadingHeader
      leadingHeader
      alignment
      columns {
        width
        content {
          ${MAP({ hasBackgroundColor: false })}
          ${CONTENT({
            displayWidth: false,
            displayAlignment: false,
            singleColumn: true,
          })}
          ${GALLERY_IMAGES({ hasBackgroundColor: false })}
          ${MEDIA_BLOCK({ hasBackgroundColor: false })}
        }
      }
    }
  }
`
