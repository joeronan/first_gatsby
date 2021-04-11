import React from "react"
import Map from '../data/topo-wpc.svg';
import { Mercator } from '@visx/geo';
import * as topojson from 'topojson-client';
import topology from '../data/topo-wpc.json';

const world = topojson.feature(topology, topology.objects.wpc)

console.log(world)

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

const UpmMap = ({ width, height, property }) => {

  const centerX = width / 2;
  const centerY = height / 2;
  const scale = (width / 630) * 4800;

  return (
    <>
      <Mercator
        data={world.features}
        scale={scale}
        translate={[centerX, centerY]}
        center={[-2, 52.560556]}
      >
        {mercator => (
          <g>
            {mercator.features.map(({ feature, path }, i) => (
              <path
                key={`map-feature-${i}`}
                d={path || ''}
                fill={color(property, feature.properties[property])}
                stroke='black'
                strokeWidth='0.5px'
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </g>
        )}
      </Mercator>
    </>
  )
}

export default UpmMap