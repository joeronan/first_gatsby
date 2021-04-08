import React from 'react'
import { useStaticQuery, graphql } from "gatsby"

import LineChart from "../components/line-chart"

const UpmGraphWindow = () => {
  const data = useStaticQuery(graphql`
    query {
    allTestDataCsv {
      edges {
        node {
          index
          value
        }
      }
    }
  }
  `)

  return (
    <div style={{ width: '50%', position: 'absolute', left: 0 }}>
      <LineChart data={data} />
    </div>
  )
}

export default UpmGraphWindow
