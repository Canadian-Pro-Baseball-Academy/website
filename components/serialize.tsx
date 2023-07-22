import React from "react"
import escapeHTML from "escape-html"
import { Balancer } from "react-wrap-balancer"

import { cn } from "@/lib/utils"

import { Highlight } from "./highlight"

export type Node = {
  type: string
  value?: {
    url: string
    alt: string
  }
  children?: Node[]
  url?: string
  [key: string]: unknown
  newTab?: boolean
}

export type CustomRenderers = {
  [key: string]: (args: {
    node: Node
    Serialize: SerializeFunction
    index: number
  }) => JSX.Element // eslint-disable-line
}

type SerializeFunction = React.FC<{
  content?: Node[]
  customRenderers?: CustomRenderers
}>

const isText = (value: any): boolean =>
  typeof value === "object" && value !== null && typeof value.text === "string"

export const Serialize: React.FC<{
  content?: Node[]
  customRenderers?: CustomRenderers
}> = ({ content, customRenderers }) => {
  return (
    <React.Fragment>
      {content?.map((node, i) => {
        if (isText(node)) {
          let text = (
            // @ts-ignore
            <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />
          )

          if (node.bold) {
            text = <strong key={i}>{text}</strong>
          }

          if (node.italic) {
            text = <em key={i}>{text}</em>
          }

          if (node.underline) {
            text = (
              <span
                className="text-orange-100 underline decoration-accent decoration-2 underline-offset-8"
                key={i}
              >
                {text}
              </span>
            )
          }

          if (node.highlight) {
            text = <Highlight key={i} {...node} />
          }

          if (node.strikethrough) {
            text = (
              <span style={{ textDecoration: "line-through" }} key={i}>
                {text}
              </span>
            )
          }

          return <React.Fragment key={i}>{text}</React.Fragment>
        }

        if (!node) return null

        if (
          customRenderers &&
          customRenderers[node.type] &&
          typeof customRenderers[node.type] === "function"
        ) {
          return customRenderers[node.type]({ node, Serialize, index: i })
        }

        switch (node.type) {
          case "br":
            return <br key={i} />
          case "h1":
            return (
              <h1
                key={i}
                className="scroll-m-20 font-heading text-4xl font-extrabold tracking-tight lg:text-5xl"
              >
                <Balancer>
                  <Serialize
                    content={node.children}
                    customRenderers={customRenderers}
                  />
                </Balancer>
              </h1>
            )
          case "h2":
            return (
              <h2 key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </h2>
            )
          case "h3":
            return (
              <h3 key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </h3>
            )
          case "h4":
            return (
              <h4 key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </h4>
            )
          case "h5":
            return (
              <h5 key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </h5>
            )
          case "h6":
            return (
              <h6 key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </h6>
            )
          case "quote":
            return (
              <blockquote key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </blockquote>
            )
          case "ul":
            return (
              <ul key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </ul>
            )
          case "ol":
            return (
              <ol key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </ol>
            )
          case "li":
            return (
              <li key={i}>
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </li>
            )

          case "kicker":
            return (
              <p
                key={i}
                className={cn("text-sm font-semibold text-muted-foreground")}
              >
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </p>
            )

          case "large-body": {
            return (
              <p
                key={i}
                className="font-sans text-lg font-medium [&:not(:first-child)]:mt-4"
              >
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </p>
            )
          }

          default:
            return (
              <p key={i} className="font-sans">
                <Serialize
                  content={node.children}
                  customRenderers={customRenderers}
                />
              </p>
            )
        }
      })}
    </React.Fragment>
  )
}
