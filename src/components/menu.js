import React from 'react'
import { Link, useStaticQuery, graphql } from "gatsby"

import Header from "./header"


const MenuElement = ({ to, children }) => {
  if (to.slice(0, 4) === 'http') {
    return (<a style={{
      textDecoration: 'none',
    }}
      href={to}
      className='menu-element-link'>
      <div style={{
        fontStyle: 'italic',
        padding: '0px 10px 0px 10px',
        margin: '0px 10px 10px 10px',
      }}
        children={children}>
      </div>
    </a>)
  } else {
    return (
      <Link style={{
        textDecoration: 'none',
      }}
        activeStyle={{
          color: '#777',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          cursor: 'default'
        }}
        to={to}
      >
        <div style={{
          fontStyle: 'italic',
          padding: '0px 0px 0px 0px',
          margin: '0px 20px 10px 20px',
        }}
          children={children}>
        </div>
      </Link>
    )
  }
}


const MenuSet = ({ children, title }) => {

  const [collapsed, setCollapsed] = React.useState(true)

  return (
    <div className='menu-set'>
      <div onClick={() => { setCollapsed(!collapsed) }} className='menu-set-title'>
        <button className='menu-set-button' onClick={() => { setCollapsed(!collapsed) }} >{collapsed ? '+' : '-'}</button><span> {title}</span>
      </div>
      {!collapsed && <div style={{
        marginTop: '5px',
      }} className='menu-set-list'>
        {children}
      </div>}
    </div>
  )
}


const Menu = () => {
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
    <div className='menu-wrapper'>
      <Header />
      <div className='menu-list-wrapper'>
        <MenuSet title='Info'>
          <MenuElement to="/">Home</MenuElement>
          <MenuElement to="/">CV</MenuElement>
          <MenuElement to="https://twitter.com/joejamesronan">Twitter</MenuElement>
          <MenuElement to="https://github.com/joeronan/">Github</MenuElement>
          <MenuElement to="https://www.linkedin.com/in/joe-ronan/">LinkedIn</MenuElement>
        </MenuSet>

        <MenuSet title='Articles'>
          {data.allMarkdownRemark.edges.map(post => {
            if (post.node.frontmatter.path !== '/lorem-ipsum-article') {
              return (<MenuElement key={post.node.id} to={post.node.frontmatter.path}>{post.node.frontmatter.date} {'///'} {post.node.frontmatter.title}</MenuElement>)
            }
          })}
        </MenuSet>

        <MenuSet title='Code Projects'>
          <MenuElement to="/music/">Music</MenuElement>
          <MenuElement to="/art/">Art</MenuElement>
        </MenuSet>

        <MenuSet title='Creative Projects'>
          <MenuElement to="/music/">Music</MenuElement>
          <MenuElement to="/art/">Art</MenuElement>
        </MenuSet>
      </div>
    </div>
  )
}


export default Menu