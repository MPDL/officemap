import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode;
}

const Filter = ({children} : Props) => {
  return (
    <div className='absolute top-5 right-5 flex flex-col shadow-xl rounded-3xl p-4 z-50'>
      <div className='flex flex-row justify-between'>
        <div> Filter </div>
        <div> X </div>
      </div>
      <div> 
        {children}
      </div>
    </div>
  )
}

export default Filter
