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
			<div className='font-semibold text-medium'>
        <ToggleMain state={state}/>
			</div>
      <div className='ml-6 text-sm'>
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

