import { graphql, Link, PageProps } from 'gatsby'
import React from 'react'
import { Seo } from '../components/Seo'
import { formatDate } from '../utils/date'

export default function IndexPage({ data }: PageProps<Queries.IndexPageQuery>) {
  const { allMicrocmsBlogs } = data
  return (
    <main>
      <Seo/>
      <h1>TOPページ</h1>
      <p>このページはGatsbyで作成されています。</p>
      <h2>最新記事</h2>
      <ul>
        {allMicrocmsBlogs.nodes.map(node => (
          <li key={node.blogsId}>
            <Link to={`/blogs/${node.blogsId}/`}>
            {node.title}【公開日：{formatDate(node.publishedAt!)}】
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/blogs/">もっとみる</Link>
    </main>
  )
}

export const query = graphql`
  query IndexPage {
    allMicrocmsBlogs(limit: 3, sort: { order: DESC, fields: publishedAt }) {
      nodes {
        blogsId
        title
        publishedAt
        revisedAt
      }
    }
  }
`
