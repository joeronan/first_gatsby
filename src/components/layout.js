import React from "react"
import PropTypes from "prop-types"

import Menu from "./menu"
import "./tufte.css"

const Layout = ({ children }) => {
  return (
    <>
      <Menu />

      <div
        style={{
          width: '100%',
          maxWidth: 666,
        }}
      >
        {children}
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
