"use client"
import { Dispatch, SetStateAction } from "react"
import { ToggleSubState } from "../ToggleSub/ToggleSub"
import Toggle from "@/app/Toggle/Toggle"

export interface ToggleMainState {
  name : string,
  state: boolean,
  setState: Dispatch<SetStateAction<boolean>>,
  substates: [ToggleSubState],
}


const ToggleMain = ({name, state, setState, substates} : ToggleMainState) => {
  const handleCheckboxChange = () => {
    setState(!state)
    substates.forEach(substate =>{
      substate.setState(!state);
    })
  }

  return (
    <Toggle name={name} state={state} onChange={handleCheckboxChange}/>
  )
}

export default ToggleMain
