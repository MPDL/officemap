"use client"
import React, { useState } from 'react'
import { FilterGroupState } from '../PageContent/State';
import ToggleSub from '../ToggleSub/ToggleSub';
import ToggleMain from '../ToggleMain/ToggleMain';

interface Props {
  state: FilterGroupState
}

const FilterGroup = ({state} : Props) => {

  return (
    <div className='flex flex-col mt-2'>
        <ToggleMain state={state}/>
      <div className='ml-6'>
        {
          Array.from(state.toggles.keys()).map(key => {
            return <ToggleSub key={key} name={key} state={state}/>
          })
        }
      </div>
    </div>
  )
}

export default FilterGroup

