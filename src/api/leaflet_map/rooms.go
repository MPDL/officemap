package leaflet_map

var LeafletRooms map[string]Room = map[string]Room{
	"A.06.01-06": {
		Id:        0,
		LiteralId: "A.06.01-06",
		Name:      "Office",
		Details:   "Büro 3 AP",
		Type:      Workspace,
		Shape: LeafletPolygon{
			Coordinates: []LeafletLatLng{
				{
					Lat: 930,
					Lng: 54,
				},
				{
					Lat: 1132,
					Lng: 54,
				},
				{
					Lat: 1132,
					Lng: 291,
				},
				{
					Lat: 930,
					Lng: 291,
				},
			},
		},
		Marker: LeafletLatLng{
			Lat: 1039,
			Lng: 178,
		},
	},
	"A.06.08-09": {
		Id:        1,
		LiteralId: "A.06.08-09",
		Name:      "Office",
		Details:   "Büro 4 AP",
		Type:      Workspace,
		Shape: LeafletPolygon{
			Coordinates: []LeafletLatLng{
				{
					Lat: 106,
					Lng: 591,
				},
				{
					Lat: 292,
					Lng: 593,
				},
				{
					Lat: 329,
					Lng: 902,
				},
				{
					Lat: 143,
					Lng: 920,
				},
			},
		},
		Marker: LeafletLatLng{
			Lat: 230,
			Lng: 769,
		},
	},
	"A.06.07-07": {
		Id:        2,
		LiteralId: "A.06.07-07",
		Name:      "Meeting room",
		Details:   "Besprechung",
		Type:      Meeting,
		Shape: LeafletPolygon{
			Coordinates: []LeafletLatLng{
				{
					Lat: 449,
					Lng: 1265,
				},
				{
					Lat: 691,
					Lng: 1244,
				},
				{
					Lat: 726,
					Lng: 1542,
				},
				{
					Lat: 485,
					Lng: 1551,
				},
			},
		},
		Marker: LeafletLatLng{
			Lat: 595,
			Lng: 1415,
		},
	},
	"bathrooms-sued-west": {
		Id:        3,
		LiteralId: "bathrooms-sued-west",
		Name:      "Bathrooms south west",
		Details:   "Wc",
		Type:      Bathroom,
		Shape: LeafletPolygon{
			Coordinates: []LeafletLatLng{
				{
					Lat: 379,
					Lng: 643,
				},
				{
					Lat: 417,
					Lng: 940,
				},
				{
					Lat: 654,
					Lng: 914,
				},
				{
					Lat: 612,
					Lng: 615,
				},
			},
		},
		Marker: LeafletLatLng{
			Lat: 517,
			Lng: 776,
		},
	},
	"A.06.02-08": {
		Id:        4,
		LiteralId: "A.06.02-08",
		Name:      "Lounge",
		Details:   "Kicker",
		Type:      Lounge,
		Shape: LeafletPolygon{
			Coordinates: []LeafletLatLng{
				{
					Lat: 2074,
					Lng: 55,
				},
				{
					Lat: 2088,
					Lng: 176,
				},
				{
					Lat: 2402,
					Lng: 171,
				},
				{
					Lat: 2428,
					Lng: 57,
				},
			},
		},
		Marker: LeafletLatLng{
			Lat: 2241,
			Lng: 117,
		},
	},
	"A.06.07-08": {
		Id:        5,
		LiteralId: "A.06.07-08",
		Name:      "Storage room",
		Details:   "Lager",
		Type:      Misc,
		Shape: LeafletPolygon{
			Coordinates: []LeafletLatLng{
				{
					Lat: 480,
					Lng: 1558,
				},
				{
					Lat: 671,
					Lng: 1558,
				},
				{
					Lat: 680,
					Lng: 1665,
				},
				{
					Lat: 465,
					Lng: 1664,
				},
			},
		},
		Marker: LeafletLatLng{
			Lat: 568,
			Lng: 1607,
		},
	},
}
