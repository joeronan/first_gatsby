import React from "react"
import PropTypes from "prop-types"

import Menu from "./menu"
import "./tufte.css"

const Layout = ({ children }) => {
  return (
    <>
      <Menu />
      <div className='body-wrapper'>
        {children}
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
