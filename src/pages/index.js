import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import Img from "gatsby-image"



const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h2>Welcome!</h2>

    <p>Fingers crossed this works!</p>

    <p>I'm a Data Scientist living in London who likes to build data visualisations. I'm currently making a dashboard for UK politics so stay tuned for more!</p>

    <p>In the meantime, there are two reasons for this website:</p>
    <ol>
      <li>To build a portfolio of the stuff I spend my time on</li>
      <li>For me to learn a bunch of tech including:
        <ul>
          <li><code>HTML</code>/<code>CSS</code>/<code>JavaScript</code></li>
          <li><code>React</code> in particular the framework <code>Gatsby</code></li>
          <li><code>D3.js</code></li>
        </ul>
      </li>
    </ol>
    <p>Click on the elliptic stars to find the website's menu. Once I've got some interesting work to show off I'll be sure to link it here too!</p>

    <p>Thanks for visiting!</p>

    <div style={{ paddingTop: '20px' }}>
      <Img
        fluid={data.roomImage.childImageSharp.fluid}
        alt="Sketch of a banjo leaning on a stack of books next to a table"
        fadeIn
        style={{ width: '50%', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
    </div>
  </Layout>
)

export default IndexPage

export const data = graphql`
query {
  roomImage: file(relativePath: { eq: "room.png" }) {
    childImageSharp {
      fluid(maxWidth: 333) {
        ...GatsbyImageSharpFluid
      }
    }
  }
}
`