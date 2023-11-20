import React, { Dispatch, SetStateAction } from 'react'
import Filter from '../Filter/Filter'
import dynamic from 'next/dynamic'
import { useRooms } from '@/app/api/api'
import FilterGroup from '../FilterGroup/FilterGroup'

const DynamicLeafletMap = dynamic(() => import('../LeafletMap/LeafletMap'), {
    ssr: false,
    loading: () => <div>Loading map...</div>,
})

const PageContent = () => {

  const { rooms, isLoading: isRoomsLoading, isError: isRoomsError } = useRooms();
  const types:string[] = Array.from(new Set<string>(rooms?.map(room => room.type)));

  if (isRoomsLoading)
    return <div></div>;

  return (
    <div>
      <Filter>
        <FilterGroup name='Room' groups={types}/>
      </Filter>
      <DynamicLeafletMap/>
    </div>
  )
}

export default PageContent

export interface State {
  filterGroups: FilterGroup[],
  searchString: string,
}

export interface FilterGroup {
  mainToggle: ToggleState,
  subToggles: ToggleState[], 
}

export interface ToggleState {
  name: string,
  state: boolean,
  setState: Dispatch<SetStateAction<boolean>>,

  color: string,
}
