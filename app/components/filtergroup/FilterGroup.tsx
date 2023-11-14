import React from 'react'



const FilterGroup = async ({name = "group", groups = []}) => {

  return (
    <div>
      {name}
      <div className='ml-2'>
        {groups.map(element => {
          return (<div>{element}</div>)
        })}
      </div>
    </div>
  )
}

export default FilterGroup

