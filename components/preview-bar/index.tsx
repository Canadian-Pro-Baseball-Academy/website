import React from "react";
import { draftMode } from "next/headers";
import PreviewBarClient from "./index.client";

export function PreviewBar() {
  const { isEnabled: isPreviewMode } = draftMode();

  return <PreviewBarClient preview={isPreviewMode} />;
}
