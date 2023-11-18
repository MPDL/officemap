import React from 'react'
import ToggleButton from '../togglebutton/ToggleButton'



const FilterGroup = async ({name = "group", groups = []}) => {

  return (
    <div>
      <div className='flex flex-row'>
        <ToggleButton />
        {name}
      </div>
      <div className='ml-2'>
        {groups.map(element => {
          return (
            <div className='flex flex-row'>
              <ToggleButton/>
              {element}
            </div>)
        })}
      </div>
    </div>
  )
}

export default FilterGroup

