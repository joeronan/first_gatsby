import React from "react"
import { Mercator } from '@visx/geo';
import * as topojson from 'topojson-client';
import topology from '../data/topo-eer.json';

const world = topojson.feature(topology, topology.objects.eer)

const UpmMiniMap = ({ width, height }) => {

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
            {mercator.features.map(({ path }, i) => (
              <path
                key={`mini-map-feature-${i}`}
                d={path || ''}
                fill='rgb(232,207,167)'
                stroke='black'
                strokeWidth='2px'
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

export default UpmMiniMap