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
  setStates: Dispatch<SetStateAction<ToggleStates>>,
}

export interface MainToggle {
  name: string, 
  state: boolean, 
  setState: Dispatch<SetStateAction<boolean>>
}

export function useRoomFilterState (rooms: Room[]): FilterGroupState {
  const color = "officemap-blue" 
  const name: string = "Rooms"
  const roomTypes: Array<string> = Array.from(new Set<string>(rooms?.map(room => room.type)));

  const toggleStates: ToggleStates = new Map();
  roomTypes.forEach(type => {
    toggleStates.set(type, true)
  })

  const [toggles, setStates] = useState(toggleStates)
  const [state, setState] = useState(true)
  const mainToggle = {name, state, setState}

  return {toggles, setStates, mainToggle} as FilterGroupState;
};

export function useEmployeeFilterState ( employees: Employee[],): FilterGroupState {
  const color = "officemap-green" 
  const name: string = "Employees"
  const employeeDepartment: Array<string> = Array.from(new Set<string>(employees?.map(employee => employee.department)));

  const toggleStates: ToggleStates = new Map();
  employeeDepartment.forEach(type => {
    toggleStates.set(type, true)
  })

  const [toggles, setStates] = useState(toggleStates)
  const [state, setState] = useState(true)
  const mainToggle = {name, state, setState}

  return {toggles, setStates, mainToggle} as FilterGroupState;
};

export function usePrinterFilterState (printers: Printer[]) {
  const color = "officemap-brown" 
  const name: string = "Printers"

  const toggleStates: ToggleStates = new Map();
  const [toggles, setStates] = useState(toggleStates)
  const [state, setState] = useState(true)
  const mainToggle = {name, state, setState}

  return {toggles, setStates, mainToggle} as FilterGroupState;
};
