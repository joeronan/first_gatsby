import React from 'react'
import { Link, useStaticQuery, graphql } from "gatsby"
import { useSpring, animated, interpolate } from 'react-spring'


const MenuSet = ({ children, title }) => {

  const startSpring = useSpring({
    opacity: 1,
    from: {
      opacity: 0,
    },
    config: {
      duration: 75
    }
  })

  return (
    <animated.div style={{
      padding: '15px 10px 0px 10px',
      margin: '20px 10px 10px 10px',
      opacity: startSpring.opacity
    }}>
      <span>{title}</span>
      <div style={{
        borderLeftStyle: 'double',
        borderWidth: '4px',
        paddingTop: '15px'
      }}>
        {children}
      </div>
    </animated.div>
  )
}

const MenuElement = ({ children }) => {
  return (
    <div style={{
      fontStyle: 'italic',
      // fontWeight: 'bolder',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      padding: '5px 10px 5px 10px',
      margin: '0px 10px 5px 10px',
    }} children={children}>
    </div>
  )
}

const MenuLink = props => <Link {...props} style={{
  color: 'white',
  // WebkitTextFillColor: 'transparent',
  // WebkitTextStrokeColor: 'white',
  // WebkitTextStrokeWidth: '0.1px',
  textDecoration: 'none',
}}
  activeStyle={{
    color: '#ccc',
    fontWeight: 'lighter',
    cursor: 'default'
  }} />




const Menu = () => {
  const [isExpanded, setExpanded] = React.useState(false);
  const [isExpandedRested, setExpandedRested] = React.useState(false);
  const ref = React.useRef(null);

  const [getHue, setHue] = React.useState(48);

  // React.useEffect(() => {
  //   const data = localStorage.getItem('getHue')
  //   if (data) {
  //     setHue(data)
  //   }
  // }, [])

  // React.useEffect(() => {
  //   // setHue(getHue + 30 % 360)
  //   localStorage.setItem('getHue', JSON.stringify(getHue))
  // })

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
      <path fill="none" stroke="black" strokeWidth="0.5" vectorEffect="non-scaling-stroke" d="M 0 0 Q 0 3 3 3 Q 0 3 0 6 Q 0 3 -3 3 Q 0 3 0 0">
        <animateMotion dur={`${dur}s`} repeatCount="indefinite" rotate="auto" keyPoints={`${i / numSparkles};1;0;${i / numSparkles}`} keyTimes={`0;${1 - i / numSparkles};${1 - i / numSparkles};1`} calcMode="linear">
          <mpath href="#ellipse" />
        </animateMotion>
      </path>);
  }

  const data = useStaticQuery(graphql`
  query BlogIndexQuery {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            path
            title
            date
            description
          }
          excerpt
        }
      }
    }
  }
`)
  const [cursorType, setCursor] = React.useState('pointer');
  const [outlineType, setOutline] = React.useState('');
  const switchCursor = () => { cursorType == 'pointer' ? setCursor('') : setCursor('pointer') }
  const switchOutline = () => { outlineType == 'none' ? setOutline('') : setOutline('none') }

  const handleKeyPress = (event) => {
    if (event.key === "Escape" && isExpanded) {
      setExpanded(!isExpanded)
      setExpandedRested(false)
      switchCursor()
      switchOutline()
      console.log('ayoo')
    }
  }

  return (
    <div>
      <animated.div style={{
        background: '#fce483',
        // background: `hsl(${hue},95%,75%)`,
        position: 'fixed',
        left: '0',
        top: '0',
        height: '100%',
        width: '4%',
        maxWidth: '20px'
      }}>
      </animated.div>

      <animated.button style={{
        background: '#fce483',
        // background: `hsl(${hue},95%,75%)`,
        position: 'fixed',
        bottom: '0',
        height: props.height,
        width: props.width,
        zIndex: "1",
        cursor: cursorType,
        outline: outlineType,
        border: 'none',
        padding: 'none',
        margin: 'none',
        textAlign: 'left'
      }}
        ref={ref}
        onClick={() => {
          setExpanded(!isExpanded)
          setExpandedRested(false)
          switchCursor()
          switchOutline()
        }}
        onKeyDown={handleKeyPress}>

        <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 40 40" style={{
          position: 'absolute',
          left: 0,
          top: '10%',
          height: "100%",
          width: "100%",
          zIndex: "-1"
        }}>
          <path visibility="hidden" id="ellipse" d="M 15 10 C 30 0 40 10 25 20 C 10 30 0 20 15 10 " />
          {/* <circle fill="none" stroke="black" stroke-width="0.5" vector-effect="non-scaling-stroke" cx="20" cy="15" r="2" /> */}
          {rows}
        </svg>

        {isExpandedRested &&
          <div style={{
            padding: "20px 5% 0 5%",
            width: '95%',
            height: '80%',
            overflow: 'auto'
          }}>
            <div style={{
              fontSize: '1.2em',
              maxWidth: '666px'
            }}>
              <MenuSet title='Serious stuff'>
                <MenuLink to="/"><MenuElement>Home</MenuElement></MenuLink>
              </MenuSet>

              <MenuSet title='Nerdy stuff'>
                <MenuLink to="/lorem-ipsum/"><MenuElement>Lorem Ipsum</MenuElement></MenuLink>
                {data.allMarkdownRemark.edges.map(post => (
                  <MenuLink key={post.node.id} to={post.node.frontmatter.path}><MenuElement>{post.node.frontmatter.date} /// {post.node.frontmatter.title}</MenuElement></MenuLink>
                ))}
              </MenuSet>

              <MenuSet title='Artsy Stuff'>
                <MenuLink to="/music/"><MenuElement>Music</MenuElement></MenuLink>
                <MenuLink to="/art/"><MenuElement>Art</MenuElement></MenuLink>
              </MenuSet>
            </div>
          </div>
        }
      </animated.button>
    </div>
  )
}

export default Menu