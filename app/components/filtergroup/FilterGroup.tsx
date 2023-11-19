import React, { useState } from 'react'
import ToggleButton from '../togglebutton/ToggleButton'



const FilterGroup = async ({name = "group", groups = [""]}) => {
  // const groupStates = groups.map (name => {
  //   const [isChecked, setIsChecked] = useState(false);
  //   {name: name, state: isChecked, setState: setIsChecked}
  // });


  return (
    <div>
      <div className='flex flex-row'>
        <ToggleButton />
        {name}
      </div>
      {/*<div className='ml-2'>*/}
      {/*  {groupsStates.map(element => {*/}
      {/*    return (*/}
      {/*      <div className='flex flex-row'>*/}
      {/*        <ToggleButton/>*/}
      {/*        {element}*/}
      {/*      </div>)*/}
      {/*  })}*/}
      {/*</div>*/}
    </div>
  )
}

export default FilterGroup

