import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"



const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h1>Welcome!</h1>

    <p>I'm a Data Scientist / Software Engineer living in London who likes to build data visualisations. This website is the home for everything I'm working on.</p>

    <p>I'm always interested in hearing opportunities so feel free to contact me on <a href="https://twitter.com/joejamesronan">Twitter</a>, <a href="https://www.linkedin.com/in/joe-ronan/">LinkedIn</a> or <a href="https://github.com/joeronan">Github</a>.</p>

    <p>Thanks for visiting!</p>

    <div style={{ paddingTop: '20px' }}>
      <Img
        fluid={data.roomImage.childImageSharp.fluid}
        alt="Sketch of a banjo leaning on a stack of books next to a table"
        fadeIn
        style={{ width: '50%', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
    </div>
  </Layout >
)

export default IndexPage

export const data = graphql`
query {
  roomImage: file(relativePath: { eq: "room.png" }) {
    childImageSharp {
      fluid {
        ...GatsbyImageSharpFluid_noBase64
      }
    }
  }
}
`