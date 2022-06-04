import { Link } from 'gatsby'
import { BreadcrumbJsonLd, ItemListElements } from 'gatsby-plugin-next-seo'
import React from 'react'
import { Breadcrumb } from '../@types/breadcrumb'

const SERVICE_URL = process.env.SITE_URL?.replace(/^(.*)\/$/, '$1')

type Props = {
  items: Breadcrumb[]
}

export const BreadcrumbList: React.FC<Props> = ({items}) => {
  const lastIndex = items.length - 1
  return (
    <>
      <ul>
        {items.map((item, i) => {
          if (lastIndex === i) {
            return (
              <li key={i}>{item.name}</li>
            )
          }
          return (
            <li key={i}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          )
        })}
      </ul>
      <BreadcrumbSeo items={items} />
    </>
  )
}


const BreadcrumbSeo: React.FC<Pick<Props, 'items'>> = ({
  items = [],
}) => {
  const elements: ItemListElements[] = items.map(
    ({ name, path }, i) => {
      const position = i + 1
      const item = `${SERVICE_URL}${path}`
      return { position, name, item }
    }
  )
  return <BreadcrumbJsonLd itemListElements={elements} />
}