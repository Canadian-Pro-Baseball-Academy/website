"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { LinkType, Reference } from "../cms-link";
import { Icons } from "../icons";
import { Page } from "@/payload-types";
import Link from "next/link";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-foreground hover:bg-accent/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-6 py-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  appearance?:
    | "primary"
    | "secondary"
    | "destructive"
    | "outline"
    | "ghost"
    | "link";
  el?: "button" | "link" | "a" | "div";
  href?: string;
  newTab?: boolean;
  label?: string;
  icon?: false | "arrow" | "x";
  fullWidth?: boolean;
  mobileFullWidth?: boolean;
  type?: LinkType;
  reference?: Reference;
  htmlButtonType?: "button" | "submit";
  size?: "sm" | "lg" | "icon" | "default";
  disabled?: boolean;
  disableLineBlip?: boolean;
  url?: string;
};

const icons = {
  arrow: Icons.arrow,
  x: Icons.close,
};

type GenerateSlugType = {
  type?: LinkType;
  url?: string;
  reference?: Reference;
};

const generateHref = (args: GenerateSlugType): string => {
  const { reference, url, type } = args;

  if ((type === "custom" || type === undefined) && url) {
    return url;
  }

  if (
    type === "reference" &&
    reference?.value &&
    typeof reference.value !== "string"
  ) {
    if (reference.relationTo === "pages") {
      const value = reference.value as Page;
      const breadcrumbs = value?.breadcrumbs;
      const hasBreadcrumbs =
        breadcrumbs && Array.isArray(breadcrumbs) && breadcrumbs.length > 0;
      if (hasBreadcrumbs) {
        return breadcrumbs?.[breadcrumbs.length]?.url as string;
      }
    }

    if (reference.relationTo === "teams") {
      return `/teams/${reference.value.teamsnapId}`;
    }

    return `/${reference.relationTo}/${reference.value.slug}`;
  }

  return "";
};

const ButtonContent: React.FC<ButtonProps> = (props) => {
  const { icon, label } = props;

  const Icon = icon ? icons[icon] : null;

  return (
    <React.Fragment>
      {label && <span>{label}</span>}
      {Icon && label && <div className="mr-4" />}
      {Icon && <Icon className="w-5 h-5" />}
    </React.Fragment>
  );
};

const elements: {
  [key: string]: React.ElementType;
} = {
  a: "a",
  button: "button",
  div: "div",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      el = "button",
      type,
      reference,
      newTab,
      appearance = "primary",
      className,
      onClick,
      htmlButtonType = "button",
      size = "default",
      disabled,
      href: hrefFromProps,
      url,
    } = props;

    const href = hrefFromProps || generateHref({ type, reference, url });

    const newTabProps = newTab
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    if (el === "link") {
      return (
        <Link href={href} prefetch={false} legacyBehavior passHref>
          <a
            className={cn(
              buttonVariants({ variant: appearance, size: size }),
              className
            )}
            {...newTabProps}
          >
            <ButtonContent {...props} />
          </a>
        </Link>
      );
    }

    const Element = elements[el];

    if (Element) {
      return (
        <Element
          ref={ref}
          type={htmlButtonType}
          className={cn(
            buttonVariants({ variant: appearance, size: size }),
            className
          )}
          {...newTabProps}
          href={href}
          onClick={onClick}
          disabled={disabled}
        >
          <ButtonContent {...props} />
        </Element>
      );
    }

    return null;
  }
);
Button.displayName = "Button";
