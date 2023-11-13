package leaflet_map

type LeafletPolygon struct {
	Coordinates []LeafletLatLng
}

type LeafletLatLng struct {
	Lat float64
	Lng float64
}
