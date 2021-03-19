import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

// import { Container, Col, Row } from 'react-bootstrap';

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

    {/* <Container>
      <Row>
        <Col lg={4}>
          Test 1
        </Col>
        <Col lg={4}>
          Test 2
        </Col>
      </Row>
    </Container> */}
  </Layout>
)

export default IndexPage
