import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const PoliticsMapDevLog = () => (
  <Layout>
    <SEO title="UK Politics Map Dev Log" />
    <h2>UK Politics Map Dev Log</h2>

    <p>This is the dev log for the <Link to="/uk-politics-map/">map of British constituencies</Link> I'm building.</p>

    <h3>Aims:</h3>

    <ol>
      <li>Create a dashboard that clearly conveys the politics, economics, demographics, and culture of a constituency.</li>
      <li>Create a dashboard that is useful for wonks, hacks, and general politics obsessives.</li>
      <li>Create a dashboard that is aesthetically pleasing and <i>feels</i> on brand.</li>
      <li>Develop my skills for data viz generally (build graphs by hand using <code>visx</code>, understand every fine detail that goes into rendering a viz)</li>
      <li>Develop my skills for data viz on the web (build everything in an approach that fits well in React, keep to good code practices)</li>
    </ol>

    <h3>Major planned changes:</h3>

    <ul>
      <li>More data needs to be added.</li>
      <li>Extend the map to the rest of the UK or refactor the dashboard to only mention England.</li>
      <li>Re-write the map as a canvas element rather than an SVG element for performance gains.</li>
      <li>If it turns out the map can stay as an SVG, re-write it as the <code>@visx/geo</code> package is not well optimised when also using <code>@visx/zoom</code>. Also, building the map from a TopoJSON file means we have data stored twice (once in CSV for the graphs on the left hand side, once in TopoJSON for the colours on the right hand side)</li>
    </ul>

  </Layout>
)

export default PoliticsMapDevLog

