import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Article = ({ data }) => {
  const post = data.markdownRemark

  return (
    <Layout>
      <SEO title={post.frontmatter.title} />
      {post.frontmatter.disclaimer && <p><b><u>Disclaimer:</u></b> {post.frontmatter.disclaimer}</p>}
      <h2 style={{ marginBottom: '0px' }}>{post.frontmatter.title}</h2>
      <p style={{ color: 'hsl(0, 0%, 44%)' }}>{post.frontmatter.subheading}</p>
      {/* <p style={{ color: 'hsl(0, 0%, 44%)', fontSize: '0.7rem' }}>{post.frontmatter.date}</p> */}
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Layout >
  )
}

export const postQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        date
        subheading
        disclaimer
      }
    }
  }
`

export default Article
