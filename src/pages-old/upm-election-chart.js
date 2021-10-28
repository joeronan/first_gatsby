import React from 'react'
import BarChart from './bar-chart-horizontal'
import ParentSize from '@visx/responsive/lib/components/ParentSize';

const UpmElectionChart = ({ data, activeConstituency, setActiveConstituency }) => {

  const index_column = 'constituency_name'

  const [columns, setColumns] = React.useState(['valid_votes', 'invalid_votes', 'non_votes'])
  // const [columns, setColumns] = React.useState(['total_votes', 'non_votes'])

  const handleClick = () => {
    if (columns.includes('non_votes')) {
      setColumns(columns.filter(x => (x !== 'non_votes')))
    } else {
      setColumns([...columns, 'non_votes'])
    }
  }

  const party_columns = ['con', 'lab', 'ld', 'brexit', 'green', 'snp', 'pc', 'dup', 'sf', 'sdlp', 'uup', 'alliance', 'other']

  return (
    <div>
      <p style={{ marginTop: '100px' }}><b><u>Note:</u></b> The plot below is currently meaningless as I'm still building custom plots.</p>
      <button
        className='standard-button'
        style={{ margin: '0px 0px 7px 0px', width: '164px', textAlign: 'left' }}
        onClick={handleClick}>
        Toggle Non-Voters {columns.includes('non_votes') ? '✓' : '✗'}
      </button>
      <br />
      <ParentSize>{({ width }) => <BarChart width={width} height={60 + (30 * activeConstituency.length)} xMaxValue={120000} data={data.allDataCsv} indexColumn={index_column} indices={activeConstituency} columns={columns} />}</ParentSize>
      <ParentSize>{({ width }) => <BarChart width={width} height={60 + (30 * activeConstituency.length)} xMaxValue={120000} data={data.allDataCsv} indexColumn={index_column} indices={activeConstituency} columns={party_columns} />}</ParentSize>
    </div>
  )
}

export default UpmElectionChart