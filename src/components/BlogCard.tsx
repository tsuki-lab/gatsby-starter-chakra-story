import { Link } from 'gatsby'
import React from 'react'
import { formatDate } from '../utils/date'

type Props = {
  as?: React.ElementType,
  blogsId: string
  publishedAt: string
  title: string
}

export const BlogCard: React.FC<Props> = ({as: Tag = 'div', ...props}) => {
  return (
    <Tag>
      <Link to={`/blogs/${props.blogsId}/`}>
      {props.title}【{formatDate(props.publishedAt!)}】
      </Link>
    </Tag>
  )
}
