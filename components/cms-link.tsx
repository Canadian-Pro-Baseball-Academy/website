"use client"

import React from "react"
import Link from "next/link"
import router from "next/router"
import { Page, PageSetting, Team } from "@/payload-types"

import { cn } from "@/lib/utils"

import { Button, ButtonProps, buttonVariants } from "./ui/button"

type PageReference = {
  value: string | Page
  relationTo: "pages"
}

type TeamsReference = {
  value: string | Team
  relationTo: "teams"
}

type PageSettingReference = {
  value: string | PageSetting
  relationTo: "pageSettings"
}

export type LinkType = "reference" | "custom"
export type Reference = PageReference | TeamsReference | PageSettingReference

export type PayloadLinkType = {
  type?: LinkType
  newTab?: boolean
  reference?: Reference
  url?: string
  label?: string
  description?: string
  appearance?:
    | "primary"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "link"
  size?: "sm" | "lg" | "icon" | "default"
  children?: React.ReactNode
  fullWidth?: boolean
  mobileFullWidth?: boolean
  className?: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  buttonProps?: any // TODO: type this
}

type GenerateSlugType = {
  type?: LinkType
  url?: string
  reference?: Reference
}

const generateHref = (args: GenerateSlugType) => {
  const { reference, url, type } = args

  if ((type === "custom" || type === undefined) && url) {
    return url
  }

  if (
    type === "reference" &&
    reference?.value &&
    typeof reference.value !== "string"
  ) {
    if (reference.relationTo === "pages") {
      const value = reference.value as Page
      const breadcrumbs = value?.breadcrumbs
      const hasBreadcrumbs =
        breadcrumbs && Array.isArray(breadcrumbs) && breadcrumbs.length > 0
      if (hasBreadcrumbs) {
        return breadcrumbs?.[breadcrumbs.length - 1]?.url as string
      }
    }

    if (reference.relationTo === "pageSettings") {
      const value = reference.value as PageSetting
      return `/${value.slug}`
    }

    if (reference.relationTo === "teams") {
      return `/rosters/${reference.value.teamsnapId}`
    }

    return `/${reference.relationTo}/${reference.value.slug}`
  }

  return ""
}

export const PayloadLink = React.forwardRef<PayloadLinkType, PayloadLinkType>(
  (
    {
      type,
      url,
      newTab,
      reference,
      label,
      description,
      appearance,
      size = "default",
      children,
      className,
      onMouseEnter,
      onMouseLeave,
      fullWidth = false,
      mobileFullWidth = false,
    },
    ref
  ) => {
    let href = generateHref({ type, url, reference })

    if (!href) {
      return (
        <span
          className={cn(
            buttonVariants({ variant: appearance, size: size }),
            className
          )}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {label}
          {children}
        </span>
      )
    }

    if (!appearance) {
      const hrefIsLocal = ["tel:", "mailto:", "/"].some((prefix) =>
        href.startsWith(prefix)
      )

      // XXX: This might not work due to env variables
      if (!hrefIsLocal) {
        try {
          const objectURL = new URL(href)
          if (objectURL.origin === process.env.NEXT_PUBLIC_SITE_URL) {
            href = objectURL.href.replace(process.env.NEXT_PUBLIC_SITE_URL, "")
          }
        } catch (e) {
          console.error(`Failed to format url: ${href}`, e) // eslint-disable-line no-console
        }
      }

      const newTabProps = newTab
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {}

      if (href.indexOf("/") === 0) {
        return (
          <Link
            href={href}
            {...newTabProps}
            // TODO: Should be removed, find better way to reset page
            onClick={() => {
              // router.reload()
            }}
            className={className}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            prefetch={false}
          >
            {label && label}
            {children && children}

            {description && (
              <p className="pt-2 text-sm leading-tight text-muted-foreground">
                {description}
              </p>
            )}
          </Link>
        )
      }

      return (
        <a
          href={url}
          {...newTabProps}
          className={className}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {label && label}
          {children && children}
          {description && (
            <p className="pt-2 text-sm leading-tight text-muted-foreground">
              {description}
            </p>
          )}
        </a>
      )
    }

    const buttonProps: ButtonProps = {
      newTab,
      href,
      appearance,
      label,
      description,
      size,
      onMouseEnter,
      onMouseLeave,
      fullWidth,
      mobileFullWidth,
    }

    return <Button {...buttonProps} className={className} el="link" />
  }
)
PayloadLink.displayName = "PayloadLink"
