import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"



const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h1>Welcome!</h1>

    <p>I'm a Data Scientist living in London who likes to build data visualisations<label htmlFor="sn-demo"
      className="margin-toggle sidenote-number">
    </label>
      <input type="checkbox"
        id="sn-demo"
        className="margin-toggle" /><span className="sidenote">
        This is a side note. Notice there isn’t a number preceding the note.
      </span>. I have one work in progress project up on this website:</p>

    <ul>
      <li><Link to="/uk-politics-map/">A dashboard for understanding UK constituencies</Link></li>
    </ul>

    <p>I'm always interested in hearing opportunities so feel free to contact me on <a href="https://www.linkedin.com/in/joe-ronan/">LinkedIn</a> or <a href="https://github.com/joeronan">Github</a>
      <label for="mn-demo" class="margin-toggle">*</label>
      <input type="checkbox"
        id="mn-demo"
        className="margin-toggle" /><span className="marginnote">
        This is a margin note. Notice there isn’t a number preceding the note.
      </span>.</p>

    <p>You can click on the elliptic stars to find the website's menu.</p>

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
      fluid(maxWidth: 333) {
        ...GatsbyImageSharpFluid_noBase64
      }
    }
  }
}
`