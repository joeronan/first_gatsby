import React from 'react'
import { Zoom, applyMatrixToPoint } from '@visx/zoom';
import { RectClipPath } from '@visx/clip-path';
import UpmMap from './upm-map'
import UpmMiniMap from './upm-mini-map'
import { useWindowDimensions } from './utils.js'

const UpmMapWindow = ({ setActiveConstituency, activeConstituency }) => {

  const [property, setProperty] = React.useState('')
  const [tooltip, setTooltip] = React.useState({ constituency: '', x: 0, y: 0 })
  const [mouseDown, setMouseDown] = React.useState(false)

  const wheelDelta = (event) => {
    if (mouseDown) {
      return ({ scaleX: 1, scaleY: 1 })
    } else {
      if (-event.deltaY > 0) {
        return ({ scaleX: 1.125, scaleY: 1.125 })
      } else {
        return ({ scaleX: 0.875, scaleY: 0.875 })
      }
    }
  }

  const { fullWidth, fullHeight } = useWindowDimensions()
  const width = fullWidth * 0.4
  const height = fullHeight * 1.0


  function constrain(transformMatrix, prevTransformMatrix) {
    const min = applyMatrixToPoint(transformMatrix, { x: -width, y: -height });
    const max = applyMatrixToPoint(transformMatrix, { x: 2 * width, y: 2 * height });
    if (max.x < width || max.y < height) {
      return prevTransformMatrix;
    }
    if (min.x > 0 || min.y > 0) {
      return prevTransformMatrix;
    }
    return transformMatrix;
  }

  return (
    <div style={{ position: 'absolute', right: 0 }}>
      <Zoom
        height={height}
        width={width}
        constrain={constrain}
        wheelDelta={wheelDelta}
      >
        {zoom => (
          <>
            <svg
              height={height}
              width={width}
              style={{ borderLeft: '1px solid black', position: 'relative', display: 'block' }}
              onTouchStart={zoom.dragStart}
              onTouchMove={zoom.dragMove}
              onTouchEnd={zoom.dragEnd}
              onMouseDown={zoom.dragStart}
              onMouseMove={zoom.dragMove}
              onMouseUp={zoom.dragEnd}
              onMouseLeave={() => {
                if (zoom.isDragging) {
                  zoom.dragEnd()
                  setMouseDown(false)
                };
              }}
            >
              <g transform={`${zoom.toString()}`}>
                <UpmMap
                  width={width}
                  height={height}
                  property={property}
                  setActiveConstituency={x => setActiveConstituency(x)}
                  activeConstituency={activeConstituency}
                  mouseDown={mouseDown}
                  setMouseDown={setMouseDown}
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
                <rect className='not-selectable' transform='translate(-2,-14)' width='16' height='16' fill='hsla(0, 100%, 100%, 0.9)' />
                <text className='not-selectable'>{tooltip['constituency']}</text></g>
              }
            </svg>

            <div
              style={{ position: 'absolute', right: 15, top: 15 }}
            >
              <button
                className='square-button'
                onClick={() => zoom.scale({ scaleX: 1.5, scaleY: 1.5 })}
              >
                +
              </button>
              <br />
              <button
                className='square-button'
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
            <div
              style={{ position: 'absolute', bottom: 15, left: 15 }}
            >
              <button
                className='standard-button'
                onClick={() => setProperty('')}
              >No Colour</button>
              <button
                className='standard-button'
                onClick={() => setProperty('PCON13CDO')}
              >Random Colouring 1</button>
              <button
                className='standard-button'
                onClick={() => setProperty('PCON13NM')}
              >Random Colouring 2</button>
            </div>
          </>
        )}
      </Zoom>
    </div >
  )
}

export default UpmMapWindow
