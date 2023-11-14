import React from 'react'



const FilterGroup = async ({name = "group", groups = ["element1", "element2"]}) => {

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

