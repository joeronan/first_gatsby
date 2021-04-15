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
    <div style={{ width: '50%', position: 'absolute', left: 0 }}>
      {activeConstituency.map(constituency => (
        <button
          onClick={() => setActiveConstituency(activeConstituency.filter(x => (x !== constituency)))}>
          {constituency}
        </button>
      ))}

      <form
        onSubmit={(e) => {
          if (fullConstituencyList.includes(inputState) && !activeConstituency.includes(inputState)) {
            setActiveConstituency([...activeConstituency, inputState])
            setInputState('')
          }
          e.preventDefault()
        }}
      >
        <input
          style={{
            width: '100%'
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
