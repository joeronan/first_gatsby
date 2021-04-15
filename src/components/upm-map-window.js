import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import { Zoom, applyMatrixToPoint } from '@visx/zoom';
import { RectClipPath } from '@visx/clip-path';
import UpmMap from './upm-map'
import UpmMiniMap from './upm-mini-map'

const buttonStyle = { width: 30, height: 30, textAlign: 'center', background: 'rgb(232,207,167)', border: '1px black solid' }

const UpmMapWindow = ({ setActiveConstituency, activeConstituency }) => {
  const data = useStaticQuery(graphql`
    query {
      allGeneralElection2019Csv {
        edges {
          node {
            ons_id
            constituency_name
            mp_gender
          }
        }
      }
    }
  `)

  const [getProperty, setProperty] = React.useState('')

  const [tooltip, setTooltip] = React.useState({ constituency: '', x: 0, y: 0 })

  const height = 800
  const width = 500

  function constrain(transformMatrix, prevTransformMatrix) {
    const min = applyMatrixToPoint(transformMatrix, { x: -100, y: -100 });
    const max = applyMatrixToPoint(transformMatrix, { x: width + 100, y: height + 100 });
    if (max.x < width || max.y < height) {
      return prevTransformMatrix;
    }
    if (min.x > 0 || min.y > 0) {
      return prevTransformMatrix;
    }
    return transformMatrix;
  }

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
          <>
            <svg
              height={height}
              width={width}
              style={{ border: '1px solid black', position: 'relative' }}
              onTouchStart={zoom.dragStart}
              onTouchMove={zoom.dragMove}
              onTouchEnd={zoom.dragEnd}
              onMouseDown={zoom.dragStart}
              onMouseMove={zoom.dragMove}
              onMouseUp={zoom.dragEnd}
              onMouseLeave={() => {
                if (zoom.isDragging) zoom.dragEnd();
              }}
            >
              <rect
                height={height}
                width={width}
                onClick={() => setActiveConstituency([])}
                opacity='0'
              />
              <g transform={`${zoom.toString()}`}>
                <UpmMap
                  width={width}
                  height={height}
                  property={getProperty}
                  setActiveConstituency={x => setActiveConstituency(x)}
                  activeConstituency={activeConstituency}
                  tooltip={tooltip}
                  setTooltip={setTooltip} />
              </g>

              <RectClipPath id="zoom-clip" width={width} height={height} />
              <g
                clipPath="url(#zoom-clip)"
                transform={`
                            scale(0.25)
                            translate(${width * 4 - width - 60}, ${height * 4 - height - 60})
                          `}
              >
                <rect width={width} height={height} fill="hsla(0, 100%, 0%, 0.666)" stroke='black' strokeWidth='5px' />
                <UpmMiniMap width={width} height={height} />
                <rect
                  width={width}
                  height={height}
                  fill="white"
                  fillOpacity={0.2}
                  stroke="white"
                  strokeWidth='0.666px'
                  transform={zoom.toStringInvert()}
                  vectorEffect='non-scaling-stroke'
                />
              </g>

              {tooltip['constituency'] && <g transform={`translate(${tooltip['x'] + 14}, ${tooltip['y'] - 14})`}>
                <rect transform='translate(-2,-14)' width='16' height='16' fill='hsla(0, 100%, 100%, 0.9)' />
                <text className='not-selectable'>{tooltip['constituency']}</text></g>
              }
            </svg>

            <div
              style={{ position: 'absolute', left: width - 40, top: 15 }}
            >
              <button
                style={buttonStyle}
                onClick={() => zoom.scale({ scaleX: 1.5, scaleY: 1.5 })}
              >
                +
              </button>
              <br />
              <button
                style={buttonStyle}
                onClick={() => zoom.scale({ scaleX: 0.5, scaleY: 0.5 })}
              >
                −
              </button>
              {/* <br />
              <button
                style={buttonStyle}
                onClick={zoom.reset}
              >
                ↻
              </button> */}
            </div>
            <div>
              <button
                style={buttonStyle}
                onClick={() => setProperty('')}
              >R</button>
              <button
                style={buttonStyle}
                onClick={() => setProperty('PCON13CDO')}
              >T</button>
              <button
                style={buttonStyle}
                onClick={() => setProperty('PCON13NM')}
              >N</button>
            </div>
          </>
        )}
      </Zoom>
    </div >
  )
}

export default UpmMapWindow
