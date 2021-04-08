import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import { Zoom, applyMatrixToPoint } from '@visx/zoom';
import { localPoint } from '@visx/event';
import { RectClipPath } from '@visx/clip-path';
import { scaleLinear } from '@visx/scale';
import Map from '../data/topo-wpc.svg';
import MiniMap from '../data/topo-eer.svg'


const UpmMapWindow = () => {
  const data = useStaticQuery(graphql`
    query {
      allGeneralElection2019Csv {
        edges {
          node {
            ons_id
            constituency_name
          }
        }
      }
    }
  `)

  const height = 600
  const width = 400

  function constrain(transformMatrix, prevTransformMatrix) {
    const min = applyMatrixToPoint(transformMatrix, { x: -500, y: -500 });
    const max = applyMatrixToPoint(transformMatrix, { x: width + 500, y: height + 500 });
    if (max.x < width || max.y < height) {
      return prevTransformMatrix;
    }
    if (min.x > 0 || min.y > 0) {
      return prevTransformMatrix;
    }
    return transformMatrix;
  }

  const buttonStyle = { width: 30, height: 30, textAlign: 'center', background: 'rgb(232,207,167)', border: '1px black solid' }

  return (
    <div style={{ width: '50%', position: 'absolute', right: 0 }}>
      <Zoom
        height={height}
        width={width}
        scaleXMin={1 / 2}
        scaleXMax={4}
        scaleYMin={1 / 2}
        scaleYMax={4}
        constrain={constrain}
      >
        {zoom => (
          <div style={{ position: 'relative' }}>

            <svg height={height} width={width} style={{ border: '1px solid black' }}>
              <RectClipPath id="zoom-clip" width={width} height={height} />
              <g transform={`${zoom.toString()}`}>
                <Map transform={`scale(0.5, 0.8)`} fill='hsla(0, 100%, 100%, 0.15)' stroke='black' strokeWidth='0.5px' />
              </g>

              <rect
                width={width}
                height={height}
                rx={14}
                fill="transparent"
                onTouchStart={zoom.dragStart}
                onTouchMove={zoom.dragMove}
                onTouchEnd={zoom.dragEnd}
                onMouseDown={zoom.dragStart}
                onMouseMove={zoom.dragMove}
                onMouseUp={zoom.dragEnd}
                onMouseLeave={() => {
                  if (zoom.isDragging) zoom.dragEnd();
                }}
                onDoubleClick={event => {
                  const point = localPoint(event) || { x: 0, y: 0 };
                  zoom.scale({ scaleX: 2, scaleY: 2, point });
                }}
              />

              <g
                clipPath="url(#zoom-clip)"
                transform={`
                            scale(0.25)
                            translate(${width * 4 - width - 60}, ${height * 4 - height - 60})
                          `}
              >
                <rect width={width} height={height} fill="hsla(0, 100%, 0%, 0.666)" stroke='black' strokeWidth='5px' />
                <MiniMap transform={`scale(0.5, 0.8)`} fill='rgb(232,207,167)' stroke='black' strokeWidth='2px' />
                <rect
                  width={width}
                  height={height}
                  fill="white"
                  fillOpacity={0.2}
                  stroke="white"
                  strokeWidth={4}
                  transform={zoom.toStringInvert()}
                />
              </g>
            </svg>
            <div
              style={{ position: 'absolute', left: width - 40, top: 15 }}
            >
              <button
                style={buttonStyle}
                onClick={() => zoom.scale({ scaleX: 1.2, scaleY: 1.2 })}
              >
                +
              </button>
              <br />
              <button
                style={buttonStyle}
                onClick={() => zoom.scale({ scaleX: 0.8, scaleY: 0.8 })}
              >
                −
              </button>
            </div>
          </div>
        )}
      </Zoom>
    </div >
  )
}

export default UpmMapWindow
