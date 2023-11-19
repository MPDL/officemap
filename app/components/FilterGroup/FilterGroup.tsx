"use client"
import React, { useState } from 'react'
import ToggleSub, { ToggleSubState } from '../ToggleSub/ToggleSub';
import ToggleMain from '../ToggleMain/ToggleMain';



const FilterGroup = ({name = "group", groups = [""]}) => {
  const groupStates = groups.map(name => {
    const [isChecked, setIsChecked] = useState(false);
    return {name: name, state: isChecked, setState: setIsChecked} as ToggleSubState ;
  }) as [ToggleSubState];

  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className='flex flex-col mt-2'>
      <ToggleMain name={name} state={isChecked} setState={setIsChecked} substates={groupStates}/>
      <div className='ml-6'>
        {groupStates.map(({name, state, setState} : ToggleSubState) => {
          return <ToggleSub name={name} state={state} setState={setState} />
        })}
      </div>
    </div>
  )
}

export default FilterGroup

