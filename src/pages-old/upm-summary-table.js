import React from 'react'

const UpmSummaryTable = ({ data, activeConstituency, setActiveConstituency }) => {

  return (
    <table>
      <thead>
        <tr>
          <th>Constituency</th> <th>Region</th> <th>County</th> <th>MP Name</th> <th>MP Gender</th> <th>MP Party</th>
        </tr>
      </thead>

      <tbody>
        {activeConstituency.sort().map(constituency => {
          const constituencyData = data.allDataCsv.edges.find(x => x.node.constituency_name === constituency).node
          return (
            <tr key={`${constituency} Row`}>
              <td>{constituency}</td>
              <td>{constituencyData.region_name}</td>
              <td>{constituencyData.county_name}</td>
              <td><a href={constituencyData.they_work_for_you_url}>{constituencyData.mp_firstname} {constituencyData.mp_surname}</a></td>
              <td>{constituencyData.mp_gender}</td>
              <td>{constituencyData.first_party}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default UpmSummaryTable
