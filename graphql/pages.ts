export const PAGES = `
  query Pages {
    Pages(limit: 300) {
      docs {
        slug
        breadcrumbs {
          url
          label
        }
      }
    }
  }
`;

export const PAGE = `
  query Page($slug: String, $draft: Boolean) {
    Pages(where: { slug: { equals: $slug} }, draft: $draft) {
      docs {
        id
        title
        hero {
            previewTest
        }
        breadcrumbs {
          url
          label
        }
      }
    }
  }
`;
