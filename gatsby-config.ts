import type { GatsbyConfig } from 'gatsby'

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const DESCRIPTION = 'example description.'

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: process.env.SITE_URL,
    title: process.env.SITE_NAME
  },
  plugins: [
    {
      resolve: '@chakra-ui/gatsby-plugin',
      options: {
        isResettingCSS: false,
        isUsingColorMode: false,
      }
    },
    {
      resolve: 'gatsby-plugin-next-seo',
      options: {
        language: 'ja',
        htmlAttributes: {
          prefix: 'og: https://ogp.me/ns#'
        },
        title: process.env.SITE_NAME,
        description: DESCRIPTION,
        canonical: process.env.SITE_URL,
        metaTags: [
          {
            rel: 'icon',
            href: '/favicon.ico'
          }
        ],
        openGraph: {
          type: 'website',
          locale: 'ja_JP',
          url: process.env.SITE_URL,
          site_name: process.env.SITE_NAME,
          images: [
            {
              url: `${process.env.SITE_URL}ogp-image.jpg`,
              width: 2400,
              height: 1260
            }
          ]
        },
        twitter: {
          cardType: 'summary_large_image'
        }
      }
    },
    'gatsby-plugin-pnpm',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png'
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/'
      }
    },
    {
      resolve: 'gatsby-source-microcms',
      options: {
        apiKey: process.env.MICROCMS_API_KEY,
        serviceId: process.env.MICROCMS_SERVICE_ID,
        apis: [
          {
            endpoint: 'blogs'
          },
          {
            endpoint: 'categories'
          }
        ]
      }
    }
  ],
  graphqlTypegen: true
}

export default config
