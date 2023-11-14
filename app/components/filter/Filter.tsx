import React from 'react'
import EmployeeFilter from '../employeefilter/EmployeeFilter'
import RoomFilter from '../roomfilter/RoomFilter'
import PrinterFilter from '../printerfilter/PrinterFilter'

const Filter = () => {
  return (
    <div className='absolute top-5 right-5 flex flex-col'>
      <div className='flex flex-row'>
        <div> Filter </div>
        <div> X </div>
      </div>
      <div> 
        <EmployeeFilter />
        <RoomFilter />
        <PrinterFilter />
      </div>
    </div>
  )
}

export default Filter
