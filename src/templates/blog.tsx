import { graphql, Link, PageProps } from 'gatsby'
import React from 'react'
// import { BreadcrumbList } from '../components/BreadcrumbList'
import { Seo } from '../components/Seo'

type PageContext = {
  next: {
    blogsId: string
    title: string
  } | null
  previous: {
    blogsId: string
    title: string
  } | null
}

export default function BlogPage({
  data,
  pageContext: { next, previous },
  location
}: PageProps<Queries.BlogPageQuery, PageContext>) {
  const { microcmsBlogs } = data
  const html = microcmsBlogs?.content ?? ''
  return (
    <main>
      <Seo
        title={microcmsBlogs?.title!}
        description="descriptionです。"
      />
      <h1>{microcmsBlogs?.title}</h1>
      <div>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      <ul>
        {next && (
          <li>
            次へ：
            <Link to={`/blogs/${next.blogsId}/`}>{next.title}</Link>
          </li>
        )}
        {previous && (
          <li>
            前へ：
            <Link to={`/blogs/${previous.blogsId}/`}>{previous.title}</Link>
          </li>
        )}
      </ul>

      {/* <BreadcrumbList
        items={[
          {name: 'TOPへ', path: '/'},
          {name: 'ブログ一覧', path: '/blogs/'},
          {name: microcmsBlogs?.title!, path: location.pathname}
        ]}
      /> */}
    </main>
  )
}

export const query = graphql`
  query BlogPage($id: String!) {
    microcmsBlogs(blogsId: { eq: $id }) {
      blogsId
      title
      eyecatch {
        url
      }
      content
      publishedAt
      revisedAt
    }
  }
`
