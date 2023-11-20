import React, { Dispatch, SetStateAction } from 'react'
import Filter from '../Filter/Filter'
import dynamic from 'next/dynamic'

const DynamicLeafletMap = dynamic(() => import('../LeafletMap/LeafletMap'), {
    ssr: false,
    loading: () => <div>Loading map...</div>,
})

const PageContent = () => {
  return (
    <div>
      <Filter/>
      <DynamicLeafletMap/>
    </div>
  )
}

export default PageContent

export interface State {
  toggleGroups: ToggleGroup[],
  searchString: string,
}

export interface ToggleGroup {
  mainToggle: ToggleState,
  subToggles: ToggleState[], 
}

export interface ToggleState {
  name: string,
  state: boolean,
  setState: Dispatch<SetStateAction<boolean>>,

  color: string,
}
