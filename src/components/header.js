import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Image from "../components/image"

// import { Container, Col, Row } from 'react-bootstrap';


const Header = ({ siteTitle }) => (
  <header
    style={{
      // background: `#fce483`,
      marginBottom: `1em`,
      marginTop: `1em`
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 400,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      {/* <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `black`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1> */}
      <Image />

      {/* <Container>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <Image />
        </Col>
      </Row>
    </Container> */}
    </div>
  </header >
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
