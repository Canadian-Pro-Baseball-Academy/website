import { Fragment, type ElementType, type Ref } from "react";
import type { StaticImageData } from "next/image";

import type { Media as MediaType } from "@/payload-types";
import { PayloadImage } from "./cms-image";

export interface IMediaProps {
  src?: StaticImageData | string; // for static media
  alt?: string;
  blurURL?: string;
  resource?: MediaType; // for Payload media
  sizes?: string; // for NextImage only
  priority?: boolean; // for NextImage only
  fill?: boolean; // for NextImage only
  style?: React.CSSProperties;
  className?: string;
  imgClassName?: string;
  videoClassName?: string;
  htmlElement?: ElementType | null;
  onClick?: () => void;
  onLoad?: () => void;
  ref?: Ref<null | HTMLImageElement | HTMLVideoElement>;
  width?: number;
  height?: number;
}

export const Media: React.FC<IMediaProps> = (props) => {
  const { className, resource, htmlElement = "div" } = props;

  const isVideo =
    typeof resource !== "string" && resource?.mimeType?.includes("video");
  const Tag = (htmlElement as ElementType) || Fragment;

  return (
    <Tag {...(htmlElement !== null ? { className } : {})}>
      {isVideo ? <div>Video</div> : <PayloadImage {...props} />}
    </Tag>
  );
};
