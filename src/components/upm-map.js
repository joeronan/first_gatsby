import React from "react"
import { Mercator } from '@visx/geo';
import { localPoint } from '@visx/event';
import * as topojson from 'topojson-client';
import topology from '../data/topo-wpc-2.json';

const world = topojson.feature(topology, topology.objects.wpc)

const colorDict = {
  'PCON13CDO': {
    'A': 'hsla(0, 100%, 50%, 0.8)',
    'B': 'hsla(20, 100%, 50%, 0.8)',
    'C': 'hsla(40, 100%, 50%, 0.8)',
    'D': 'hsla(60, 100%, 50%, 0.8)',
    'E': 'hsla(80, 100%, 50%, 0.8)',
    'F': 'hsla(100, 100%, 50%, 0.8)',
  },
}

const color = (property, value) => {
  if (property === '') {
    return 'hsla(0, 100%, 100%, 0.15)'
  }
  else if (property === 'PCON13CDO') {
    return colorDict[property][value.charAt(0)]
  }
  else if (property === 'PCON13NM') {
    return `hsla(${value.charCodeAt(0) * 5}, 100%, 50%, 0.8)`
  }
}

const UpmMap = ({ tooltip, setTooltip, width, height, property, setActiveConstituency, activeConstituency }) => {

  const centerX = width / 2;
  const centerY = height / 2;
  const scale = width * 6;

  const [mouseDown, setMouseDown] = React.useState(false)
  const [mouseDownStationary, setMouseDownStationary] = React.useState(false)

  const handleMouseUp = (e, constituency) => {
    if (activeConstituency.includes(constituency)) {
      if (e.shiftKey) {
        setActiveConstituency(activeConstituency.filter(x => (x !== constituency)))
      } else {
        if (activeConstituency.length === 1) {
          setActiveConstituency([])
        } else {
          setActiveConstituency([constituency])
        }
      }
    } else {
      if (e.shiftKey) {
        setActiveConstituency([...activeConstituency, constituency])
      } else {
        setActiveConstituency([constituency])
      }
    }
  }

  return (
    <>
      <Mercator
        data={world.features}
        scale={scale}
        translate={[centerX, centerY]}
        center={[-2, 52.560556]}
        style={{ position: 'relative' }}
      >
        {mercator => (
          <>
            {mercator.features.map(({ feature, path }, i) => (
              <path
                key={`map-feature-${i}`}
                className={activeConstituency.includes(feature.properties['PCON13NM']) ? 'active-constituency' : 'constituency'}
                d={path || ''}
                fill={color(property, feature.properties[property])}
                stroke='black'
                strokeWidth={activeConstituency.includes(feature.properties['PCON13NM']) ? '2px' : '0.5px'}
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect='non-scaling-stroke'
                onMouseDown={() => {
                  setMouseDown(true)
                  setMouseDownStationary(true)
                }}
                onMouseMove={(e) => {
                  if (mouseDown) {
                    setMouseDownStationary(false)
                    const point = localPoint(e) || { x: 0, y: 0 }
                    setTooltip({ constituency: tooltip['constituency'], x: point.x, y: point.y })
                  } else {
                    const point = localPoint(e) || { x: 0, y: 0 }
                    setTooltip({ constituency: feature.properties['PCON13NM'], x: point.x, y: point.y })
                  }
                }}
                onMouseUp={(e) => {
                  if (mouseDownStationary) {
                    handleMouseUp(e, feature.properties['PCON13NM'])
                  }
                  setMouseDown(false)
                }}
                onMouseOut={() => !mouseDown ? setTooltip({ constituency: '', x: 0, y: 0 }) : null}
              />
            ))}
          </>
        )}
      </Mercator>
    </>
  )
}

export default UpmMap