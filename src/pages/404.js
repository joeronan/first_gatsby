import { Link } from "gatsby"
import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>404: Not Found</h1>
    <p>Apologies, this page doesn't exist. Click <Link to="/">here</Link> to return to the homepage.</p>
  </Layout>
)

export default NotFoundPage
