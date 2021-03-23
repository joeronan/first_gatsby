import PropTypes from "prop-types"
import React from "react"
import Image from "../components/image"


const Header = ({ siteTitle }) => (
  <header
    style={{
      margin: 'auto',
      paddingTop: '25px',
      paddingBottom: '25px',
      width: '60%',
      maxWidth: 400,
    }}
  >
    <Image />
  </header >
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
