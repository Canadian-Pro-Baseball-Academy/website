import React from "react";
import { cookies, draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { PAGE, PAGES } from "@/graphql/pages";
import { request } from "@/lib/cms";

import { Page as PageType } from "@/payload-types";
import ApiTest from "@/app/api-test";
import { Hero } from "@/components/hero";

const fetchPage = async (
  incomingSlugSegments?: string[]
): Promise<PageType | null> => {
  const { isEnabled } = draftMode();
  // const token = cookies().get("payload-token");

  const slugSegments = incomingSlugSegments || ["home"];
  const slug = slugSegments.at(-1);

  const collection = `page=${slug}`;
  const data = await request<{ Pages: { docs: PageType[] } }>({
    collection,
    query: PAGE,
    variables: { slug },
    // token: token,
    draft: isEnabled,
  });

  const pagePath = `/${slugSegments.join("/")}`;

  const page = data.Pages?.docs.find(({ breadcrumbs }) => {
    if (!breadcrumbs) return false;
    let { url } = breadcrumbs[breadcrumbs.length - 1];
    return url === pagePath;
  });

  if (!page) return null;

  return page;
};

const Page = async ({ params: { slug } }: { params: { slug: string[] } }) => {
  const page = await fetchPage(slug);

  if (!page) return notFound();

  return (
    <React.Fragment>
      <ApiTest data={page} />
      <Hero page={page} />
      <p>{page.title}</p>
      <h1>{page.hero?.previewTest}</h1>
    </React.Fragment>
  );
};

export default Page;

export async function generateStaticParams() {
  const pages = await request<{ Pages: { docs: PageType[] } }>({
    collection: "pages",
    query: PAGES,
  });

  return pages.Pages.docs.map(({ breadcrumbs }) => ({
    slug: breadcrumbs?.[breadcrumbs.length - 1]?.url
      ?.replace(/^\/|\/$/g, "")
      ?.split("/"),
  }));
}
