import React from 'react'
import { scaleLinear, extent, line, curveNatural } from 'd3'


const LineChart = ({ data }) => {

  const width = 330
  const height = 230
  const margin = { top: 10, right: 10, bottom: 25, left: 50 }

  const innerWidth = width - margin.right - margin.left
  const innerHeight = height - margin.top - margin.bottom

  const xScale = scaleLinear()
    .domain(extent(data.allTestDataCsv.edges, d => +d.node.index))
    .range([0, innerWidth])
    .nice()
  const yScale = scaleLinear()
    .domain(extent(data.allTestDataCsv.edges, d => -d.node.value))
    .range([0, innerHeight])
    .nice()

  const lineGenerator = line()
    .x(d => xScale(+d.node.index))
    .y(d => yScale(-d.node.value))
  // .curve(curveNatural)
  const myDataLine = lineGenerator(data.allTestDataCsv.edges)

  return (
    <svg width={width} height={height} style={{ background: 'hsla(0,100%,0%,0.1)', margin: '0px 10px 10px 10px' }}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <path d={myDataLine} fill='none' stroke='red' strokeWidth='1' strokeLinejoin='round' strokeLinecap='round' />
        {xScale.ticks().map(tickValue => (
          <g key={tickValue} transform={`translate(${xScale(tickValue)},${innerHeight})`}>
            <line
              y1={2}
              y2={7}
              stroke='black' />
            <text
              y={margin.bottom}
              style={{ textAnchor: 'middle' }}
              fontSize={margin.bottom / 1.5}
            >{tickValue}</text>
          </g>
        ))}

        {yScale.ticks().map(tickValue => (
          <g key={tickValue} transform={`translate(${-margin.left}, ${yScale(tickValue)})`}>
            <line
              x1={margin.left - 7}
              x2={margin.left - 2}
              stroke='black' />
            <text
              fontSize={margin.left / 3}
              y={margin.left / 8}
            >{-tickValue}</text>
          </g>
        ))}
      </g>
    </svg>
  )
}

export default LineChart
