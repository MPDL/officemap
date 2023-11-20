import LoadingPage from './components/PageContent/LoadingPage'

// Followed instructions at https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#with-no-ssr
// In import('path/to/component'), the path must be explicitly written. It can't be a template string nor a variable.
// This is needed otherwise LeafletMap will be rendered server side which does not work because leaflet relies on the
// 'window' object.
export default function Home() {
  return (
    <main>
      <LoadingPage/>
    </main>
  )
}
