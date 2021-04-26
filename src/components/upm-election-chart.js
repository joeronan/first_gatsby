import React from 'react'
import BarChart from './bar-chart-horizontal'
import ParentSize from '@visx/responsive/lib/components/ParentSize';

const UpmElectionChart = ({ data, activeConstituency, setActiveConstituency }) => {

  const index_column = 'constituency_name'

  const [columns, setColumns] = React.useState(['electorate', 'valid_votes', 'invalid_votes'])

  const handleClick = () => {
    if (columns.includes('non_voters')) {
      setColumns(columns.filter(x => (x !== 'non_voters')))
    } else {
      setColumns([...columns, 'non_voters'])
    }
  }

  return (
    <div>
      <p style={{ marginTop: '100px' }}><b><u>Note:</u></b> The plot below is currently meaningless as I'm still building custom plots.</p>
      <button
        className='standard-button'
        style={{ margin: '0px 0px 7px 0px', width: '172px', textAlign: 'left' }}
        onClick={handleClick}>
        Toggle Non-Voters {columns.includes('non_voters') ? '✓' : '✗'}
      </button>
      <br />
      <ParentSize>{({ width }) => <BarChart width={width} height={60 + (30 * activeConstituency.length)} xMaxValue={200000} data={data.allGeneralElection2019Csv} indexColumn={index_column} indices={activeConstituency} columns={columns} />}</ParentSize>
    </div>
  )
}

export default UpmElectionChart