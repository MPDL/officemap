"use client"
import Toggle from "@/app/components/Toggle/Toggle"
import { ToggleState } from "../PageContent/State"


interface Props {
  main: ToggleState,
  sub: ToggleState[],
}

const ToggleMain = ({main, sub}: Props) => {
  const handleCheckboxChange = () => {
    main.setState(!main.state)
    sub.forEach(substate =>{
      substate.setState(!main.state);
    })
  }

  return (
    <Toggle name={main.name} state={main.state} onChange={handleCheckboxChange} color={main.color}/>
  )
}

export default ToggleMain
