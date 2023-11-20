import { Dispatch, SetStateAction, useState } from "react";
import { Employee, Printer, Room } from "@/app/api/api";

export interface PageState {
  filterGroups: FilterGroupState[];
  searchString: string;
}

export interface FilterGroupState {
  mainToggle: ToggleState;
  subToggles: ToggleState[];
}

export interface ToggleState {
  name: string;
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;

  color: string;
}

export function useRoomFilterState (rooms: Room[]): FilterGroupState {
  const subToggles = Array.from(
    new Set<string>(rooms?.map((room) => room.type)),
  ).map((type) => {
    const [state, setState] = useState(true);
    return { state: state, setState: setState, name: type, color: "green" };
  });

  const [state, setState] = useState(true);
  const mainToggle = {
    state: state,
    setState: setState,
    name: "Rooms",
    color: "green",
  };

  return { mainToggle, subToggles };
};

export function useEmployeeFilterState ( employees: Employee[],): FilterGroupState {
  const subToggles = Array.from(
    new Set<string>(
      employees?.map((employee) => employee.department),
    ),
  ).map((department) => {
    const [state, setState] = useState(true);
    return {
      state: state,
      setState: setState,
      name: department,
      color: "blue",
    };
  });

  const [state, setState] = useState(true);
  const mainToggle = {
    state: state,
    setState: setState,
    name: "Employees",
    color: "blue",
  };

  return { mainToggle, subToggles };
};

export function usePrinterFilterState (printers: Printer[]) {
  const [state, setState] = useState(true);
  const mainToggle = {
    state: state,
    setState: setState,
    name: "Printers",
    color: "red",
  };

  return { mainToggle, subToggles: [] };
};
