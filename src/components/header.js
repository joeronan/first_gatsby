import { Link } from "gatsby"
import React from "react"
import Image from "../components/image"


const Header = () => (
  <>
    <div className="header">
      <Link to="/"><Image /></Link>
    </div >
  </>
)

export default Header
