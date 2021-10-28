import React from 'react'
import PropTypes from "prop-types"

import Menu from "./menu"

const DashboardLayout = ({ children }) => {
  return (
    <>
      <Menu />

      <div
        style={{
          margin: `0 auto`,
          width: '100%',
          padding: `0 0 75px 20px`,
          position: 'relative'
        }}
      >
        <main>{children}</main>
      </div>
    </>
  )
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DashboardLayout
