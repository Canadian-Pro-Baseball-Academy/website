import { Page } from "@/payload-types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
