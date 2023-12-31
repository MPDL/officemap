package leaflet_map

import (
	"api/static_assets_loader"
)

func JsonRoomToLeaflet(jsonRooms static_assets_loader.RoomsJson) []Room {
	mappedRooms := []Room{}

	for _, roomItem := range jsonRooms.Rooms {
		if roomItem.Marker.Lat < 0 || roomItem.Marker.Lng < 0 {
			continue
		}

		shapeCoordinates := []LeafletLatLng{}
		for _, coordinate := range roomItem.Shape {
			shapeCoordinates = append(shapeCoordinates, LeafletLatLng{
				Lat: coordinate.Lat,
				Lng: coordinate.Lng,
			})
		}
		mappedRooms = append(mappedRooms, Room{
			Id:       roomItem.Id,
			StringId: roomItem.StringId,
			Name:     roomItem.Name,
			Details:  roomItem.Details,
			Type:     StringRoomTypeToEnum(roomItem.Type),
			Keywords: roomItem.Keywords,
			Shape: LeafletPolygon{
				Coordinates: shapeCoordinates,
			},
			Marker: LeafletLatLng{
				Lat: roomItem.Marker.Lat,
				Lng: roomItem.Marker.Lng,
			},
		})
	}

	return mappedRooms
}
