/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    coaches: Coach;
    media: Media;
    pages: Page;
    'page-settings': PageSetting;
    teams: Team;
    users: User;
    redirects: Redirect;
  };
  globals: {
    'site-settings': SiteSetting;
    footer: Footer;
    header: Header;
  };
}
export interface Coach {
  id: string;
  name: string;
  headshot: string | Media;
  role?: {
    title?: string;
    roles?: {
      role: string;
      id?: string;
    }[];
    joinDate?: number;
  };
  socials?: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
  biography?: {
    [k: string]: unknown;
  }[];
  career?: {
    achievement: string;
    id?: string;
  }[];
  updatedAt: string;
  createdAt: string;
  _status?: 'draft' | 'published';
}
export interface Media {
  id: string;
  alt: string;
  aspectRatio?: '1.7778' | '1.3333' | '1.5' | '1' | '1.25' | '3' | '0.6667' | '0.5625' | '2.3333';
  blurURL?: string;
  darkModeFallback?: string | Media;
  updatedAt: string;
  createdAt: string;
  url?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
}
export interface Page {
  id: string;
  hero: {
    type: 'default' | 'contentMedia' | 'form' | 'home' | 'registration';
    richText?: {
      [k: string]: unknown;
    }[];
    links?: {
      link: {
        type?: 'reference' | 'custom';
        newTab?: boolean;
        reference:
          | {
              value: string | Page;
              relationTo: 'pages';
            }
          | {
              value: string | Team;
              relationTo: 'teams';
            };
        url: string;
        label: string;
        appearance?: 'primary' | 'secondary';
      };
      id?: string;
    }[];
    media: string | Media;
    values?: {
      value: string;
      id?: string;
    }[];
    previewTest?: string;
  };
  meta?: {
    title?: string;
    description?: string;
    image?: string | Media;
    keywords?: string;
  };
  title: string;
  slug?: string;
  parent?: string | Page;
  breadcrumbs?: {
    doc?: string | Page;
    url?: string;
    label?: string;
    id?: string;
  }[];
  updatedAt: string;
  createdAt: string;
  _status?: 'draft' | 'published';
}
export interface Team {
  id: string;
  name: string;
  coaches?: string[] | Coach[];
  teamPhoto?: string | Media;
  teamsnapId: string;
  webCalendar?: string;
  roster?: {
    firstName: string;
    lastName: string;
    number?: string;
    positions?: (
      | 'pitcher'
      | 'catcher'
      | 'firstBase'
      | 'secondBase'
      | 'thirdBase'
      | 'shortstop'
      | 'middleInfield'
      | 'cornerInfield'
      | 'infield'
      | 'outfield'
      | 'utility'
    )[];
    homeTown?: string;
    id?: string;
  }[];
  updatedAt: string;
  createdAt: string;
  _status?: 'draft' | 'published';
}
export interface PageSetting {
  id: string;
  hero: {
    type: 'default' | 'contentMedia' | 'form' | 'home' | 'registration';
    richText?: {
      [k: string]: unknown;
    }[];
    links?: {
      link: {
        type?: 'reference' | 'custom';
        newTab?: boolean;
        reference:
          | {
              value: string | Page;
              relationTo: 'pages';
            }
          | {
              value: string | Team;
              relationTo: 'teams';
            };
        url: string;
        label: string;
        appearance?: 'primary' | 'secondary';
      };
      id?: string;
    }[];
    media: string | Media;
    values?: {
      value: string;
      id?: string;
    }[];
    previewTest?: string;
  };
  gallery?: {
    gallery?: (
      | {
          sliderFields: {
            useLeadingHeader?: boolean;
            leadingHeader?: {
              [k: string]: unknown;
            }[];
            slides: {
              image: string | Media;
              id?: string;
            }[];
          };
          id?: string;
          blockName?: string;
          blockType: 'gallery-slider';
        }
      | {
          imagesFields: {
            useLeadingHeader?: boolean;
            leadingHeader?: {
              [k: string]: unknown;
            }[];
            columns?: '1' | '2' | '3' | '4' | '5';
            images: string[] | Media[];
          };
          id?: string;
          blockName?: string;
          blockType: 'gallery-images';
        }
    )[];
  };
  coachingStaff?: {
    mainCoaches?: string[] | Coach[];
    subsidaryCoaches?: string[] | Coach[];
  };
  news?: {
    test?: string;
  };
  type: 'gallery' | 'coaching-staff' | 'news';
  title: string;
  slug?: string;
  updatedAt: string;
  createdAt: string;
  _status?: 'draft' | 'published';
}
export interface User {
  id: string;
  name?: string;
  roles?: ('admin' | 'editor')[];
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  salt?: string;
  hash?: string;
  loginAttempts?: number;
  lockUntil?: string;
  password?: string;
}
export interface Redirect {
  id: string;
  from: string;
  to: {
    type?: 'reference' | 'custom';
    reference: {
      value: string | Page;
      relationTo: 'pages';
    };
    url: string;
  };
  updatedAt: string;
  createdAt: string;
}
export interface SiteSetting {
  id: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    github?: string;
  };
  streetAddress?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  country?: string;
  email?: string;
  phoneNumber?: string;
  meta?: {
    title?: string;
    description?: string;
    image?: string | Media;
    keywords?: string;
  };
  updatedAt?: string;
  createdAt?: string;
}
export interface Footer {
  id: string;
  columns?: {
    label?: string;
    navItems?: {
      link: {
        type?: 'reference' | 'custom';
        newTab?: boolean;
        reference:
          | {
              value: string | Page;
              relationTo: 'pages';
            }
          | {
              value: string | Team;
              relationTo: 'teams';
            };
        url: string;
        label: string;
      };
      id?: string;
    }[];
    id?: string;
  }[];
  updatedAt?: string;
  createdAt?: string;
}
export interface Header {
  id: string;
  topBar: {
    richText?: {
      [k: string]: unknown;
    }[];
  };
  mainMenu: {
    items: {
      type?: 'single' | 'dropdown';
      label: string;
      link?: {
        type?: 'reference' | 'custom';
        newTab?: boolean;
        reference:
          | {
              value: string | Page;
              relationTo: 'pages';
            }
          | {
              value: string | Team;
              relationTo: 'teams';
            };
        url: string;
      };
      menu?: {
        blocks?: (
          | {
              menuHighlightMedia?: string | Media;
              link: {
                type?: 'reference' | 'custom';
                newTab?: boolean;
                reference:
                  | {
                      value: string | Page;
                      relationTo: 'pages';
                    }
                  | {
                      value: string | Team;
                      relationTo: 'teams';
                    };
                url: string;
                label: string;
                description?: string;
              };
              id?: string;
              blockName?: string;
              blockType: 'menu-highlight';
            }
          | {
              link: {
                type?: 'reference' | 'custom';
                newTab?: boolean;
                reference:
                  | {
                      value: string | Page;
                      relationTo: 'pages';
                    }
                  | {
                      value: string | Team;
                      relationTo: 'teams';
                    };
                url: string;
                label: string;
                description?: string;
              };
              id?: string;
              blockName?: string;
              blockType: 'menu-link';
            }
          | {
              name?: string;
              links?: {
                link: {
                  type?: 'reference' | 'custom';
                  newTab?: boolean;
                  reference:
                    | {
                        value: string | Page;
                        relationTo: 'pages';
                      }
                    | {
                        value: string | Team;
                        relationTo: 'teams';
                      };
                  url: string;
                  label: string;
                };
                id?: string;
              }[];
              id?: string;
              blockName?: string;
              blockType: 'menu-column';
            }
        )[];
      };
      id?: string;
    }[];
  };
  updatedAt?: string;
  createdAt?: string;
}
