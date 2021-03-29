import { Link } from "gatsby"
import React from "react"
import Image from "../components/image"


const Header = () => (
  <>
    <header
      style={{
        margin: 'auto',
        paddingTop: '30px',
        paddingBottom: '30px',
        width: '70%',
        maxWidth: 400,
      }}
    >
      <Link to="/"><Image /></Link>
    </header >
  </>
)

export default Header
