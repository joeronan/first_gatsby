import PropTypes from "prop-types"
import React from "react"
import Image from "../components/image"


const Header = ({ siteTitle }) => (
  <header
    style={{
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
      <Image />
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
