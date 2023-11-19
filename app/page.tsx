import Filter from './components/filter/Filter'
import dynamic from "next/dynamic";

// Followed instructions at https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#with-no-ssr
// In import('path/to/component'), the path must be explicitly written. It can't be a template string nor a variable.
// This is needed otherwise LeafletMap will be rendered server side which does not work because leaflet relies on the
// 'window' object.
const DynamicLeafletMap = dynamic(() => import('./components/leafletmap/LeafletMap'), {
    ssr: false,
    loading: () => <div>Loading map...</div>,
})

export default function Home() {
  return (
    <main>
        {/*<Filter/>*/}
        <DynamicLeafletMap></DynamicLeafletMap>
    </main>
  )
}
