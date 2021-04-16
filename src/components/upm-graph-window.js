import React from 'react'
import { useStaticQuery, graphql } from "gatsby"

const UpmGraphWindow = ({ activeConstituency, setActiveConstituency }) => {
  const data = useStaticQuery(graphql`
    query {
      allGeneralElection2019Csv(filter: {country_name: {eq: "England"}}) {
        edges {
          node {
            ons_id
            constituency_name
            mp_gender
            mp_firstname
            mp_surname
          }
        }
      }
    }
  `)

  const [inputState, setInputState] = React.useState('')

  const fullConstituencyList = data.allGeneralElection2019Csv.edges.map(x => x.node.constituency_name)

  return (
    <div style={{
      width: 'calc(100vw - 80vh - 20px)',
      height: '100vh',
      position: 'absolute',
      left: 0,
      padding: '10px 10px 75px 10px',
      overflowY: 'auto'
    }}>

      <h2>UK Politics Map</h2>

      <p>Click on the map to select a constituency, shift click to select/deselect multiple.</p>

      <form
        onSubmit={(e) => {
          if (fullConstituencyList.includes(inputState) && !activeConstituency.includes(inputState)) {
            setActiveConstituency([...activeConstituency, inputState])
            setInputState('')
          }
          e.preventDefault()
        }}
        style={{ marginBottom: '7px' }}
      >
        <input
          style={{
            width: '100%',
            border: '1px black solid',
            background: 'hsla(0, 100%, 100%, 0.3)'
          }}
          onChange={(e) => {
            setInputState(e.target.value)
          }}
          type='text'
          list='constituency-list'
          placeholder='Search constituencies...'
          value={inputState}>
        </input>
      </form>

      {activeConstituency.map(constituency => (
        <button
          className='standard-button'
          style={{ margin: '0px 7px 7px 0px' }}
          onClick={() => setActiveConstituency(activeConstituency.filter(x => (x !== constituency)))}>
          {constituency} | ✕
        </button>
      ))}

      <datalist id='constituency-list'>
        {fullConstituencyList
          .filter(e => !activeConstituency.includes(e))
          .map(constituency => (
            <option value={constituency} />
          ))}
      </datalist>

      {activeConstituency.map(constituency => {
        const constituencyData = data.allGeneralElection2019Csv.edges.find(x => x.node.constituency_name === constituency).node
        return (
          <p>{constituencyData.constituency_name} has a {constituencyData.mp_gender.toLowerCase()} MP called {constituencyData.mp_firstname} {constituencyData.mp_surname}.</p>
        )
      })}
    </div>
  )
}

export default UpmGraphWindow
