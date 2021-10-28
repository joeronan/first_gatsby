import React from 'react'
import { Link, useStaticQuery, graphql } from "gatsby"
import UpmSummaryTable from './upm-summary-table'
import UpmElectionChart from './upm-election-chart'

const UpmGraphWindow = ({ activeConstituency, setActiveConstituency }) => {
  const data = useStaticQuery(graphql`
    query {
      allDataCsv(filter: {country_name: {eq: "England"}}) {
        edges {
          node {
            ons_id
            constituency_name
            mp_gender
            mp_fullname
            mp_firstname
            mp_surname
            region_name
            county_name
            first_party
            electorate
            valid_votes
            invalid_votes
            total_votes
            non_votes
            con
            lab
            ld
            brexit
            green
            snp
            pc
            dup
            sf
            sdlp
            uup
            alliance
            other
            they_work_for_you_url
          }
        }
      }
    }
  `)

  console.log(data)

  const [inputState, setInputState] = React.useState('')
  const [inputMPState, setInputMPState] = React.useState('')

  const fullConstituencyList = data.allDataCsv.edges.map(x => x.node.constituency_name)
  const fullMPList = data.allDataCsv.edges.map(x => x.node.mp_fullname)

  return (
    <div style={{
      width: 'calc(60vw - 20px)',
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

      <form
        onSubmit={(e) => {
          const constituency_name = data.allDataCsv.edges.filter(x => x.node.mp_fullname === inputMPState)[0].node.constituency_name
          console.log(constituency_name)
          if (fullMPList.includes(inputMPState) && !activeConstituency.includes(constituency_name)) {
            setActiveConstituency([...activeConstituency, constituency_name])
            setInputMPState('')
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
            setInputMPState(e.target.value)
          }}
          type='text'
          list='mp-list'
          placeholder='Search MPs...'
          value={inputMPState}>
        </input>
      </form>

      <datalist id='constituency-list'>
        {fullConstituencyList
          .filter(e => !activeConstituency.includes(e))
          .map(constituency => (
            <option value={constituency} />
          ))}
      </datalist>

      <datalist id='mp-list'>
        {data.allDataCsv.edges
          .filter(e => !activeConstituency.includes(e.node.constituency_name))
          .map(e => (
            <option value={e.node.mp_fullname} />
          ))}
      </datalist>

      {activeConstituency.sort().map(constituency => (
        <button
          className='standard-button'
          style={{ margin: '0px 7px 7px 0px' }}
          onClick={() => setActiveConstituency(activeConstituency.filter(x => (x !== constituency)))}>
          {constituency} | ✕
        </button>
      ))}

      {(activeConstituency.length === 0) &&
        <div style={{ margin: '50px 30px 0px 30px', padding: '10px 10px 10px 10px', border: '1px solid black', background: 'hsla(0,100%,0%,0.05)' }}>
          <p><b><u>Disclaimer:</u></b> This is a work in progress project. I'm currently focusing on England but the rest of the UK is coming soon!</p>

          <h2>Welcome!</h2>

          <p>This map is intended for anyone who's ever read an article about a constituency and thought "I know nothing about this place". If you're interested in how this dashboard was built check out my <Link to="/uk-politics-map-dev-log/">dev log</Link> and the <a href="https://github.com/joeronan/personal_website">github repo</a>.</p>

          <h3>Controls:</h3>

          <p>Click on the map to select a single constituency, or shift click to select/deselect multiple. The search bar above can also be used to select/deselect constituencies. Click in the sea to deselect all.</p>

          <p>Click and drag to move the map. Use the scroll wheel or buttons in the top right to zoom.</p>

          <h3>Example Use:</h3>

          <p>On 3rd March 2021 the UK government announced it would be moving 750 jobs to Darlington as part of its Spring budget. This map can be used to understand what motivated the decision and understand to what extent this was a political or economic choice. We can find Darlington by using the search tool, then compare it to nearby areas by selecting multiple constituencies or by looking at different map colourings.</p>

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
