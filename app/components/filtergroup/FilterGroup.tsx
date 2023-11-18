import React from 'react'
import ToggleButton from '../togglebutton/ToggleButton'



const FilterGroup = async ({name = "group", groups = []}) => {

  return (
    <div>
<<<<<<< HEAD
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
=======
      {/*{name}*/}
      {/*<div className='ml-2'>*/}
      {/*  {groups.map(element => {*/}
      {/*    return (<div>{element}</div>)*/}
      {/*  })}*/}
      {/*</div>*/}
>>>>>>> cc1b883f22a13c47e3a4918521d5b60ab0fe3e1e
    </div>
  )
}

export default FilterGroup

