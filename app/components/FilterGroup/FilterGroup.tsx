"use client"
import React, { useState } from 'react'
import { FilterGroupState, ToggleState } from '../PageContent/State';
import ToggleSub from '../ToggleSub/ToggleSub';
import ToggleMain from '../ToggleMain/ToggleMain';

interface Props {
  state: FilterGroupState
}

const FilterGroup = ({state} : Props) => {

  return (
    <div className='flex flex-col mt-2'>
      <ToggleMain main={state.mainToggle} sub={state.subToggles}/>
      <div className='ml-6'>
        {state.subToggles.map(({name, state, setState, color} : ToggleState) => {
          return <ToggleSub name={name} state={state} setState={setState} color={color}/>
        })}
      </div>
    </div>
  )
}

export default FilterGroup

