"use client";

import React from "react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

interface IPreviewBarProps {
  preview: boolean;
}

const PreviewBarClient = ({ preview = false }: IPreviewBarProps) => {
  return (
    <div
      className={cn("fixed bottom-0 left-0 ml-6 mb-6", {
        hidden: !preview,
      })}
    >
      <button
        className={cn(
          buttonVariants({ variant: "default", size: "lg" }),
          "shadow-md"
        )}
        onClick={async () => {
          await fetch("/api/disable-draft-mode");
          window.location.reload();
        }}
      >
        Exit Preview
      </button>
    </div>
  );
};

export default PreviewBarClient;
