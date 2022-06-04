import { graphql, useStaticQuery } from 'gatsby'
import { GatsbySeo, GatsbySeoProps } from 'gatsby-plugin-next-seo'
import React from 'react'


type Props = GatsbySeoProps

export const Seo: React.FC<Props> = ({ ...props }) => {
  const { site } = useStaticQuery<Queries.SeoQuery>(graphql`
    query Seo {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  const titleTemplate = `%s - ${site?.siteMetadata?.title}`
  return (
    <>
      <GatsbySeo titleTemplate={props.title ? titleTemplate : '%s'} openGraph={{title: props.title || site?.siteMetadata?.title || ''}} {...props} />
    </>
  )
}