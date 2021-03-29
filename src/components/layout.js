import React from "react"
import PropTypes from "prop-types"

import Header from "./header"
import Menu from "./menu"
import "./layout.css"

const Layout = ({ children }) => {
  return (
    <>
      <Menu />
      <Header />

      <div
        style={{
          margin: `0 auto`,
          width: '95%',
          maxWidth: 666,
          padding: `0 0 75px 20px`,
          position: 'relative'
        }}
      >
        <main>{children}</main>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
