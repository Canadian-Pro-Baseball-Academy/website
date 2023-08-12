import { Page } from "@/payload-types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const darkBackgrounds = ["primary", "dark"]

export const aspectRatios = {
  _1_7778: 1.7778,
  _1_3333: 1.3333,
  _1_5: 1.5,
  _1: 1,
  _1_25: 1.25,
  _3: 3,
  _0_6667: 0.8,
  _0_5625: 0.5625,
  _2_3333: 2.3333,
}

export function GenerateHeroData(header: string, url?: string): Page["hero"] {
  return {
    type: "default",
    richText: [
      {
        children: [
          {
            text: header,
          },
        ],
        type: "h1",
      },
    ],
    media: {
      id: "",
      createdAt: "",
      updatedAt: "",
      mimeType: "image/jpeg",
      alt: "The 18U Calgary Bisons play under the lights at Gulls Stadium in Silvan Lake, AB.",
      blurURL: "",
      filename: "gulls-stadium.jpeg",
      filesize: 106118,
      url:
        url || "https://calgarybisons.payloadcms.app/media/gulls-stadium.jpeg",
      width: 720,
      height: 527,
      darkModeFallback: "",
    },
    links: [],
  }
}
