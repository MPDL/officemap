package endpoint

type leafletPolygon struct {
	Coordinates []leafletLatLng `json:"coordinates"`
}

type leafletLatLng struct {
	Lat float64 `json:"lat"`
	Lng float64 `json:"lng"`
}
