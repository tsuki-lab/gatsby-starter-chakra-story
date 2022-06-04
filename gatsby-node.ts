import { GatsbyNode } from 'gatsby'
import path from 'path'
import { getPagesContext } from './src/utils/pages'

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions: { createPage } }) => {
  const result = await graphql<Queries.CreatePagesQuery>(`
    query CreatePages {
      allMicrocmsBlogs(sort: { order: ASC, fields: publishedAt }) {
        edges {
          node {
            publishedAt
            blogsId
          }
          next {
            blogsId
            title
          }
          previous {
            blogsId
            title
          }
        }
        totalCount
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  const { allMicrocmsBlogs: { totalCount, edges } } = result.data!

  edges.forEach((edge) => {
    createPage({
      path: `/blogs/${edge.node.blogsId}/`,
      component: path.resolve('src/templates/blog.tsx'),
      context: {
        id: edge.node.blogsId,
        next: edge.next,
        previous: edge.previous
      }
    })
  })

  const pagesContext = getPagesContext({
    totalCount,
    limit: 3
  })

  pagesContext.forEach((context) => {
    const component = path.resolve('src/templates/blogs.tsx')

    if (context.currentPageNum === 1) {
      createPage({
        path: `/blogs/`,
        component,
        context
      })
      return
    }

    createPage({
      path: `/blogs/page/${context.currentPageNum}/`,
      component,
      context
    })
  })
}
