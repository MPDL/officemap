"use client"
import Toggle from '@/app/Toggle/Toggle'
import React, { Dispatch, SetStateAction } from 'react'

export interface ToggleSubState {
  name : string,
  state: boolean,
  setState : Dispatch<SetStateAction<boolean>>,
};

const ToggleSub = ({name, state, setState} : ToggleSubState) => {
  const handleCheckboxChange = () => {
    setState(!state)
  }

  return (
    <Toggle name={name} state={state} onChange={handleCheckboxChange}/>
  )
}

export default ToggleSub
