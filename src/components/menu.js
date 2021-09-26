import React from 'react'
import { Link, useStaticQuery, graphql } from "gatsby"
import { useSpring, animated } from 'react-spring'


const MenuElement = ({ to, children }) => {
  return (
    <Link style={{
      textDecoration: 'none',
    }}
      activeStyle={{
        color: '#ccc',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        cursor: 'default'
      }}
      to={to}
      activeClassName=''
      className='menu-element-link'>
      <div style={{
        fontStyle: 'italic',
        padding: '5px 10px 5px 10px',
        margin: '0px 10px 5px 10px',
      }}
        children={children}
        className='menu-element-div'>
      </div>
    </Link>
  )
}


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
      <span style={{}}>{title}</span>
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


const MenuBody = () => {
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
          }
          excerpt
        }
      }
    }
  }
`)

  return (
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
          <MenuElement to="/">Home</MenuElement>
        </MenuSet>

        <MenuSet title='Nerdy stuff'>
          <MenuElement to="/uk-politics-map/">UK Politics Map</MenuElement>
          <MenuElement to="/uk-politics-map-dev-log/">UK Politics Map Dev Log</MenuElement>
          {data.allMarkdownRemark.edges.map(post => {
            if (post.node.frontmatter.path !== '/lorem-ipsum-article') {
              return (<MenuElement key={post.node.id} to={post.node.frontmatter.path}>{post.node.frontmatter.date} {'///'} {post.node.frontmatter.title}</MenuElement>)
            }
          })}
        </MenuSet>

        <MenuSet title='Artsy Stuff'>
          <MenuElement to="/music/">Music</MenuElement>
          <MenuElement to="/art/">Art</MenuElement>
        </MenuSet>
      </div>
    </div>
  )
}


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
      <path key={i} fill="none" stroke="black" strokeWidth="0.5" vectorEffect="non-scaling-stroke" d="M 0 0 Q 0 3 3 3 Q 0 3 0 6 Q 0 3 -3 3 Q 0 3 0 0">
        <animateMotion dur={`${dur}s`} repeatCount="indefinite" rotate="auto" keyPoints={`${i / numSparkles};1;0;${i / numSparkles}`} keyTimes={`0;${1 - i / numSparkles};${1 - i / numSparkles};1`} calcMode="linear">
          <mpath href="#ellipse" />
        </animateMotion>
      </path>);
  }

  const [cursorType, setCursor] = React.useState('pointer');
  const [outlineType, setOutline] = React.useState('');
  const switchCursor = () => { cursorType === 'pointer' ? setCursor('') : setCursor('pointer') }
  const switchOutline = () => { outlineType === 'none' ? setOutline('') : setOutline('none') }

  const handleKeyPress = (event) => {
    if (event.key === "Escape" && isExpanded) {
      setExpanded(!isExpanded)
      setExpandedRested(false)
      switchCursor()
      switchOutline()
    }
  }

  // const [hue, setHue] = React.useState(48)

  return (
    <div>
      <div style={{
        background: '#fce483',
        // background: `hsl(${hue},95%,75%)`,
        position: 'fixed',
        left: '0',
        top: '0',
        height: '100%',
        width: '4%',
        maxWidth: '20px'
      }}
      >
      </div>

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
          // setHue(hue - 30 % 360)
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
          {rows}
        </svg>

        {isExpandedRested && <MenuBody />}
      </animated.button>
    </div>
  )
}

export default Menu