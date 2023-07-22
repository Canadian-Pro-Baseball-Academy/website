interface Args {
  disableLabel?: true
  disableAppearance?: true
  enableDescription?: true
}

export const LINK_FIELDS = ({
  disableAppearance,
  disableLabel,
  enableDescription,
}: Args = {}): string => `{
    ${!disableLabel ? "label" : ""}
    ${!disableAppearance ? "appearance" : ""}
    ${enableDescription ? "description" : ""}
    type
    newTab
    url
    reference {
      relationTo
      value {
        ...on Page {
          breadcrumbs {
            url
          }
        }
        ... on Team {
            teamsnapId
        }
      }
    }
  }`
