import React from 'react'
import { Link } from "gatsby"
import { useSpring, animated } from 'react-spring'

// const props = useSpring({
//   opacity: 1,
//   from: { opacity: 0 }
// })

const Menu = () => {

  const [isExpanded, setExpanded] = React.useState(false);
  const [isExpandedRested, setExpandedRested] = React.useState(false);
  const ref = React.useRef(null);

  const vhToPixel = value => `${(window.innerHeight * value) / 100}px`
  const vwToPixel = value => `${(window.innerWidth * value) / 100}px`


  const props = useSpring({
    width: isExpanded ? vwToPixel(100) : "75px",
    height: isExpanded ? vhToPixel(100) : "75px",
    onRest: () => {
      if (isExpanded && ref.current) {
        ref.current.style.height = "100vh";
        ref.current.style.width = "100vw";
        setExpandedRested(true)
      }
    }
  })

  const dur = 4
  const numSparkles = 10
  var rows = [];
  for (var i = 0; i < numSparkles; i++) {
    rows.push(
      <path fill="none" stroke="black" stroke-width="0.5" vector-effect="non-scaling-stroke" d="M 0 0 Q 0 3 3 3 Q 0 3 0 6 Q 0 3 -3 3 Q 0 3 0 0">
        <animateMotion dur={`${dur}s`} repeatCount="indefinite" rotate="auto" keyPoints={`${i / numSparkles};1;0;${i / numSparkles}`} keyTimes={`0;${1 - i / numSparkles};${1 - i / numSparkles};1`} calcMode="linear">
          <mpath href="#ellipse" />
        </animateMotion>
      </path>);
  }

  return (
    <div>
      <div style={{
        background: '#fce483',
        position: 'fixed',
        left: '0',
        top: '0',
        height: '100%',
        width: '20px'
      }}>


      </div>
      <animated.div style={{
        background: '#fce483',
        position: 'fixed',
        bottom: '0',
        height: props.height,
        width: props.width,
        zIndex: "1"
      }}
        ref={ref}
        onClick={() => {
          setExpanded(!isExpanded)
          setExpandedRested(false)
        }}>

        <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 40 40" style={{
          position: 'absolute',
          top: "10%",
          height: "100%",
          width: "100%",
          margin: "auto",
          zIndex: "-1"
        }}>
          <path visibility="hidden" id="ellipse" d="M 15 10 C 30 0 40 10 25 20 C 10 30 0 20 15 10 " />
          {/* <circle fill="none" stroke="black" stroke-width="0.5" vector-effect="non-scaling-stroke" cx="20" cy="15" r="2" /> */}
          {rows}
        </svg>

        {isExpandedRested &&
          <ul style={{
            padding: "20% 20%",
          }}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/page-2/">Second Page</Link></li>
            <li><Link to="/test/">Test Page</Link></li>
            <li><Link to="/using-typescript/">Using Typescript</Link></li>
            <li><Link to="/404/">404</Link></li>
          </ul>
        }
      </animated.div>
    </div>
  )
}

export default Menu