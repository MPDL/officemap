"use client"
import Toggle from '@/app/components/Toggle/Toggle'
import React, { Dispatch, SetStateAction } from 'react'
import { FilterGroupState } from '../PageContent/State'

export interface ToggleSubState {
  name : string,
  state: FilterGroupState
};


const ToggleSub = ({name, state} : ToggleSubState) => {
  const handleCheckboxChange = () => {
    let newState = !state.toggles.get(name)
    let newStates = new Map(state.toggles)
    newStates.set(name, newState)

    state.setStates(newStates)
  }

  return (
    <Toggle name={name} state={state.toggles.get(name) || false} onChange={handleCheckboxChange} color={state.color} symbol={state.symbol} />
  )
}

export default ToggleSub
