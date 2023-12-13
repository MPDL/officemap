import { Dispatch, SetStateAction, useState } from "react";
import { Employee, Printer, Room } from "@/app/api/api";

export interface PageState {
  filterGroups: FilterGroupState[];
  searchString: string;
}

type ToggleStates = Map<string, boolean>

export interface FilterGroupState {
  mainToggle: MainToggle,
  toggles: Map<string, boolean>,
  colors: Map<string, string>,
	color: string,
  setStates: Dispatch<SetStateAction<ToggleStates>>,
	symbol: string,

}

export interface MainToggle {
  name: string, 
  state: boolean, 
  setState: Dispatch<SetStateAction<boolean>>
}

export function useRoomFilterState (rooms: Room[]): FilterGroupState {
  // const color = "officemap-blue" 
  const color = "blue" 
	const symbol:string = "room"
  const name: string = "Rooms"
  const roomTypes: Array<string> = Array.from(new Set<string>(rooms?.map(room => room.type)));

  const colors: Map<string,string>= new Map();
  const toggleStates: ToggleStates = new Map();
  roomTypes.forEach(type => {
    toggleStates.set(type, true)
    colors.set(type, color)
  })
  colors.set(name, color)

  const [toggles, setStates] = useState(toggleStates)
  const [state, setState] = useState(true)
  const mainToggle = {name, state, setState}

  return {toggles, setStates, mainToggle, symbol, colors, color} as FilterGroupState;
};

export function useEmployeeFilterState ( employees: Employee[],): FilterGroupState {
  // const color = "officemap-green" 
	const color = "green"
  const name: string = "Employees"
  const symbol: string = "person"
  const employeeDepartment: Array<string> = Array.from(new Set<string>(employees?.map(employee => employee.department)));

  const colors: Map<string,string>= new Map();
  const toggleStates: ToggleStates = new Map();
  employeeDepartment.forEach(type => {
    toggleStates.set(type, true)
    colors.set(type, color)
  })
  colors.set(name, color)

  const [toggles, setStates] = useState(toggleStates)
  const [state, setState] = useState(true)
  const mainToggle = {name, state, setState}

  return {toggles, setStates, mainToggle, colors, symbol, color} as FilterGroupState;
};

export function usePrinterFilterState (printers: Printer[]) {
  // const color = "officemap-brown" 
	const color = "brown"
  const name: string = "Printers"
  const symbol: string = "printer"

  const colors: Map<string,string>= new Map();
  const toggleStates: ToggleStates = new Map();
  colors.set(name, color)
  const [toggles, setStates] = useState(toggleStates)
  const [state, setState] = useState(true)
  const mainToggle = {name, state, setState}

  return {toggles, setStates, mainToggle, colors, symbol, color} as FilterGroupState;
};
