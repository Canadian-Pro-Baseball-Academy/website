import React from "react"
import { MediaBlock } from "@/payload-types"

import { aspectRatios, cn } from "@/lib/utils"

import { Gutter as GutterOriginal } from "../gutter"
import { Media as PayloadMedia } from "../media"
import { RichText } from "../rich-text"
import { AspectRatio } from "../ui/aspect-ratio"

type MediaProps = Exclude<MediaBlock["mediaFields"], undefined>

const EmbedMedia: React.FC<MediaProps> = ({ embedVideo }) => {
  if (!embedVideo) return null

  const { platform, videoID, aspectRatio, manualThumbnail } = embedVideo

  return (
    <div className="relative overflow-hidden rounded-md shadow-lg">
      {platform === "youtube" ? (
        <AspectRatio
          // @ts-ignore
          ratio={aspectRatio ? aspectRatios[aspectRatio] : 16 / 9}
        >
          <div className="h-full w-full overflow-hidden rounded-lg">
            {typeof manualThumbnail === "object" && (
              <iframe
                className="h-full w-full"
                // Using srcDoc instead of src to avoid long loading times
                srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style><a href=https://www.youtube.com/embed/${videoID}?autoplay=1>${
                  manualThumbnail
                    ? `<img src=${manualThumbnail.url} alt="Video Thumbnail" />`
                    : `<img class="video-thump" src="https://img.youtube.com/vi/${videoID}/0.jpg" alt="" /></div>`
                }<span>▶</span></a>`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                loading="lazy"
                allowFullScreen
                title="Embedded youtube video"
              />
            )}
          </div>
        </AspectRatio>
      ) : (
        <div>Unsupported platform</div>
      )}
    </div>
  )
}

const InternalMedia: React.FC<MediaProps> = ({ internalMedia }) => {
  if (!internalMedia) return null

  const { media } = internalMedia

  return (
    <div className="relative overflow-hidden rounded-md shadow-lg">
      {typeof media === "object" && media !== null && media.aspectRatio && (
        <AspectRatio
          // @ts-ignore
          ratio={aspectRatios[internalMedia?.media?.aspectRatio]}
        >
          <PayloadMedia
            className="h-full w-full"
            fill
            resource={media}
            style={{ objectFit: "cover" }}
          />
        </AspectRatio>
      )}
    </div>
  )
}

export const Media: React.FC<MediaBlock & { disableGutter?: boolean }> = ({
  mediaFields,
  disableGutter = false,
}) => {
  if (!mediaFields) return null

  const { embed } = mediaFields

  const Gutter = disableGutter ? "div" : GutterOriginal

  const { internalMedia, embedVideo, size, caption } = mediaFields

  return (
    <Gutter
      className={cn({
        "px-10 md:px-32 lg:px-48 2xl:px-72 3xl:px-96":
          size === "normal" && !disableGutter,
        "px-0 md:px-0 lg:px-0 2xl:px-0 3xl:px-0":
          size === "fullscreen" && !disableGutter,
      })}
    >
      {!embed && internalMedia ? (
        <InternalMedia internalMedia={internalMedia} />
      ) : (
        <EmbedMedia embedVideo={embedVideo} />
      )}
      {caption && (
        <div className="mt-4 w-full text-center text-muted-foreground">
          <RichText content={caption} />
        </div>
      )}
    </Gutter>
  )
}
