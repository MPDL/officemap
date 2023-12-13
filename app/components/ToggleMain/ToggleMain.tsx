"use client"
import Toggle from "@/app/components/Toggle/Toggle"
import { FilterGroupState } from "../PageContent/State"


interface ToggleMainState {
  state: FilterGroupState
};


const ToggleMain = ({state} : ToggleMainState) => {
  const name = state.mainToggle.name

  const handleCheckboxChange = () => {
    let newState = !state.mainToggle.state
    let newStates = new Map(state.toggles)
    state.toggles.forEach((value, key) => {
      newStates.set(key, newState)
    }) 

    state.setStates(newStates)
    state.mainToggle.setState(newState)
  }

  return (
    <Toggle name={name} state={state.mainToggle.state} onChange={handleCheckboxChange} color={state.color} symbol={state.symbol} />
  )
}

export default ToggleMain
