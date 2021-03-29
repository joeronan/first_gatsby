import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Image = () => {
  const data = useStaticQuery(graphql`
    query {
      headerImage: file(relativePath: { eq: "header.png" }) {
        childImageSharp {
          fluid(maxWidth: 400) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  if (!data?.headerImage?.childImageSharp?.fluid) {
    return <div>Picture not found</div>
  }

  return <Img
    fluid={data.headerImage.childImageSharp.fluid}
    alt="Hand written text saying website title 'Joe James Ronan'"
    fadeIn />
}

export default Image
