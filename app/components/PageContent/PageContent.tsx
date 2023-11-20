import React, { Dispatch, SetStateAction } from 'react'
import Filter from '../Filter/Filter'
import dynamic from 'next/dynamic'

// Followed instructions at https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#with-no-ssr
// In import('path/to/component'), the path must be explicitly written. It can't be a template string nor a variable.
// This is needed otherwise LeafletMap will be rendered server side which does not work because leaflet relies on the
// 'window' object.
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
