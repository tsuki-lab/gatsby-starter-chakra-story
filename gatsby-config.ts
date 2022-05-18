import type { GatsbyConfig } from 'gatsby'

require('dotenv').config()

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Example GatsbyJS 2022`,
    siteUrl: `https://www.yourdomain.tld`,
    itemsLimit: 10
  },
  plugins: [
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
  flags: {
    GRAPHQL_TYPEGEN: true
  }
}

export default config
