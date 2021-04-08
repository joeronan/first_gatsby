import React from "react"

import DashboardLayout from "../components/dashboard-layout"
import SEO from "../components/seo"

import UpmGraphWindow from "../components/upm-graph-window"
import UpmMapWindow from "../components/upm-map-window"


const PoliticsMap = ({ data }) => (
  <DashboardLayout>
    <SEO title="UK Politics Map" />
    <h2>Test</h2>

    <p>Nice bit of sample text here.</p>

    <div style={{ position: 'relative' }}>
      <UpmGraphWindow />
      <UpmMapWindow />
    </div>
  </DashboardLayout>
)

export default PoliticsMap
