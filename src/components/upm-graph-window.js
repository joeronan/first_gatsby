import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import UpmSummaryTable from './upm-summary-table'
import UpmElectionChart from './upm-election-chart'

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
            region_name
            county_name
            first_party
            electorate
            valid_votes
            invalid_votes
          }
        }
      }
    }
  `)

  console.log(data)

  const [inputState, setInputState] = React.useState('')

  const fullConstituencyList = data.allGeneralElection2019Csv.edges.map(x => x.node.constituency_name)

  return (
    <div style={{
      width: 'calc(100vw - 80vh - 20px)',
      height: '100vh',
      position: 'absolute',
      left: 0,
      padding: '20px 20px 75px 20px',
      overflowY: 'auto'
    }}>

      <h2>UK Politics Map</h2>

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

      {activeConstituency.sort().map(constituency => (
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

      {(activeConstituency.length === 0) &&
        <div style={{ margin: '50px 30px 0px 30px', padding: '10px 10px 10px 10px', border: '1px solid black', background: 'hsla(0,100%,0%,0.05)' }}>
          <h2>Welcome!</h2>

          <p>Give overview</p>

          <p>Click on the map to select a constituency, <b>shift click</b> to select/deselect multiple, or search for a constituency using the search bar bove.</p>

          <p>I've you're interested in the making of this page, see here (MAKE THIS A LINK) for the dev log.</p>
        </div>
      }

      {!(activeConstituency.length === 0) &&
        <>
          <UpmSummaryTable data={data} activeConstituency={activeConstituency} setActiveConstituency={setActiveConstituency} />
          <UpmElectionChart data={data} activeConstituency={activeConstituency} setActiveConstituency={setActiveConstituency} />
        </>
      }
    </div>
  )
}

export default UpmGraphWindow
