import React from "react"

import DashboardLayout from "../components/dashboard-layout"
import SEO from "../components/seo"

import UpmGraphWindow from "../components/upm-graph-window"
import UpmMapWindow from "../components/upm-map-window"


const PoliticsMap = () => {

  const [activeConstituency, setActiveConstituency] = React.useState([])

  return (
    <DashboardLayout>
      <SEO title="UK Politics Map" />
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <UpmGraphWindow setActiveConstituency={x => setActiveConstituency(x)} activeConstituency={activeConstituency} />
        <UpmMapWindow setActiveConstituency={x => setActiveConstituency(x)} activeConstituency={activeConstituency} />
      </div>
    </DashboardLayout>
  )
}

export default PoliticsMap
