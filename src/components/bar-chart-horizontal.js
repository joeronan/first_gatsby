import React from 'react'
import { BarStackHorizontal } from '@visx/shape'
import { Group } from '@visx/group'
import { AxisLeft, AxisBottom } from '@visx/axis'
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale'



// const BarChart = ({  data, indices }) => {
const BarChartHorizontal = ({ width, height, xMaxValue, indexColumn, columns, data, indices }) => {

  const purple1 = '#6c5efb';
  const purple2 = '#c998ff';
  const purple3 = '#000000';

  const finalData = data.edges.map(x => (x.node)).filter(x => (indices.includes(x[indexColumn])))

  const getIndex = (x) => (x[indexColumn])

  const xScale = scaleLinear({
    domain: [0, xMaxValue],
    nice: true,
  });

  const yScale = scaleBand({
    domain: finalData.map(getIndex),
    padding: 0.2,
  });

  const colorScale = scaleOrdinal({
    domain: columns,
    range: [purple1, purple2, purple3],
  });

  const tickFormat = (x) => (x)

  const margin = { top: 30, right: 30, bottom: 30, left: 100 }
  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom

  xScale.rangeRound([0, xMax]);
  yScale.rangeRound([yMax, 0]);

  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill='hsla(0, 100%, 0%, 0.1)' />
      <Group top={margin.top} left={margin.left}>
        <BarStackHorizontal
          data={finalData}
          keys={columns}
          height={yMax}
          y={getIndex}
          xScale={xScale}
          yScale={yScale}
          color={colorScale}
        >
          {barStacks =>
            barStacks.map(barStack =>
              barStack.bars.map(bar => (
                <rect
                  key={`barstack-horizontal-${barStack.index}-${bar.index}`}
                  x={bar.x}
                  y={bar.y}
                  width={bar.width}
                  height={bar.height}
                  fill={bar.color}
                />
              ))
            )
          }
        </BarStackHorizontal>
        <AxisLeft
          hideAxisLine
          hideTicks
          scale={yScale}
          // tickFormat={tickFormat}
          stroke={purple3}
          tickStroke={purple3}
          tickLabelProps={() => ({
            fill: purple3,
            fontSize: 11,
            textAnchor: 'end',
            dy: '0.33em',
          })}
        />
        <AxisBottom
          top={yMax}
          scale={xScale}
          // tickFormat={tickFormat}
          stroke={purple3}
          tickStroke={purple3}
          tickLabelProps={() => ({
            fill: purple3,
            fontSize: 11,
            textAnchor: 'middle',
          })}
        />
      </Group>
    </svg>
  )
}

export default BarChartHorizontal
