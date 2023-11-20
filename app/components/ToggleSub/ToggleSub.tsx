"use client"
import Toggle from '@/app/Toggle/Toggle'
import React, { Dispatch, SetStateAction } from 'react'
import { ToggleState } from '../PageContent/State'

export interface ToggleSubState {
  name : string,
  state: boolean,
  setState : Dispatch<SetStateAction<boolean>>,
};

const ToggleSub = ({name, state, setState, color} : ToggleState) => {
  const handleCheckboxChange = () => {
    setState(!state)
  }

  return (
    <Toggle name={name} state={state} onChange={handleCheckboxChange} color={color}/>
  )
}

export default ToggleSub
