import React from 'react'
import { Link } from "gatsby"


const Menu = () => (
  <div style={{
    background: '#d3d3d3',
    paddingTop: '10px'
  }}>
    <ul style={{
      listStyle: 'none',
      display: 'flex',
      justifyContent: 'space-evenly'
    }}>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/page-2/">Second Page</Link></li>
      <li><Link to="/test/">Test Page</Link></li>
      <li><Link to="/using-typescript/">Using Typescript</Link></li>
      <li><Link to="/404/">404</Link></li>
    </ul>

  </div>
)

export default Menu