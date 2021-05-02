import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const PoliticsMapDevLog = () => (
  <Layout>
    <SEO title="UK Politics Map Dev Log" />
    <h2>UK Politics Map Dev Log</h2>

    <p>This is the dev log for the <Link to="/uk-politics-map/">map of British constituencies</Link> I'm building. There isn't yet a service which gives information on Westminster politics in a nice format. <a href="https://en.wikipedia.org/wiki/United_Kingdom_Parliament_constituencies">Wikipedia</a> gives a full breakdown of the election history but little else, while the government's dashboards are dry and split up <a href="https://commonslibrary.parliament.uk/constituency-data-election-results/">politics</a> and <a href="https://commonslibrary.parliament.uk/constituency-dashboard/">administration</a>. This map aims to be better than the current services and satisfy the following aims.</p>

    <h3>Aims:</h3>

    <ol>
      <li>Clearly convey the politics, economics, demographics, and culture of a constituency.</li>
      <li>Be useful for wonks, hacks, and general politics obsessives.</li>
      <li>Be aesthetically pleasing and <i>feel</i> right.</li>
      <li>Develop my skills for data viz generally (build graphs by hand using <code>visx</code>, understand every fine detail that goes into rendering a viz)</li>
      <li>Develop my skills for data viz on the web (build everything in an approach that fits together nicely in React, keep to good code practices)</li>
    </ol>

    <h3>Major planned changes:</h3>

    <ul>
      <li>Add more data and finish off visualising current data.</li>
      <li>Extend the map to the rest of the UK or refactor the dashboard to only mention England.</li>
      <li>Re-write the map as a canvas element rather than an SVG element for performance gains.</li>
      <li>If it turns out the map can stay as an SVG, re-write it as the <code>@visx/geo</code> package is not well optimised when also using <code>@visx/zoom</code>. Also, building the map from a TopoJSON file means we have data stored twice (once in CSV for the graphs on the left hand side, once in TopoJSON for the colours on the right hand side)</li>
    </ul>

  </Layout>
)

export default PoliticsMapDevLog

