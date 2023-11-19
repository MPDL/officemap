import React from 'react'
import FilterEmployee from '../FilterEmployee/FilterEmployee'
import FilterRoom from '../FilterRoom/FilterRoom'
import FilterPrinter from '../FilterPrinter/FilterPrinter'

const Filter = () => {
  return (
    <div className='absolute top-5 right-5 flex flex-col shadow-xl rounded-3xl p-4'>
      <div className='flex flex-row justify-between'>
        <div> Filter </div>
        <div> X </div>
      </div>
      <div> 
        <FilterEmployee />
        <FilterRoom />
        <FilterPrinter />
      </div>
    </div>
  )
}

export default Filter
