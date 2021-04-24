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
      <button
        className='standard-button'
        style={{ margin: '0px 0px 7px 0px' }}
        onClick={handleClick}>
        Toggle X
        {columns.join(' | ')}
      </button>
      <br />
      <ParentSize>{({ width }) => <BarChart width={width} height={60 + (30 * activeConstituency.length)} xMaxValue={200000} data={data.allGeneralElection2019Csv} indexColumn={index_column} indices={activeConstituency} columns={columns} />}</ParentSize>
    </div>
  )
}

export default UpmElectionChart