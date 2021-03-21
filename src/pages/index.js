import React from "react"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h2>Welcome!</h2>

    <p>There are two core reasons for this website:</p>
    <ol>
      <li>To keep track of everything I'm spending my time on</li>
      <li>For me to learn<code>HTML</code>/<code>CSS</code>/<code>JavaScript</code></li>
    </ol>
    <p>Thanks for checking it out! You can find a menu in the elliptic stars (and dark mode in my name).</p>
  </Layout>
)

export default IndexPage
