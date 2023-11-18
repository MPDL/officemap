package endpoint

import (
	"api/leaflet_map"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

func getRooms(c *gin.Context, rooms []room) {
	// TODO only dev
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

	c.IndentedJSON(http.StatusOK, rooms)
}

func getRoom(c *gin.Context, rooms map[int]room, id string) {
	// TODO only dev
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

	idNumeric, err := strconv.Atoi(id)
	if err != nil {
		c.IndentedJSON(http.StatusOK, nil)
		fmt.Println(err.Error())
		return
	}

	if idNumeric < 0 || idNumeric >= len(rooms) {
		c.IndentedJSON(http.StatusOK, nil)
		return
	}

	c.IndentedJSON(http.StatusOK, rooms[idNumeric])
}

func mapLeafletRoomToEndpointRoomMap(leafletRooms []leaflet_map.Room) map[int]room {
	endpointRooms := map[int]room{}
	for _, leafletRoom := range leafletRooms {
		endpointRooms[leafletRoom.Id] = roomMapHelper(leafletRoom)
	}
	return endpointRooms
}

func roomMapHelper(leafletRoom leaflet_map.Room) room {
	return room{
		Name:    leafletRoom.Name,
		Details: leafletRoom.Details,
		Type:    leafletRoom.Type.String(),
		Shape:   mapLeafletPolygonToEndpointPolygon(leafletRoom.Shape),
		Marker: leafletLatLng{
			Lat: leafletRoom.Marker.Lat,
			Lng: leafletRoom.Marker.Lng,
		},
	}
}

func mapLeafletRoomToEndpointRoom(leafletRooms []leaflet_map.Room) []room {
	endpointRooms := []room{}
	for _, leafletRoom := range leafletRooms {
		endpointRooms = append(endpointRooms, roomMapHelper(leafletRoom))
	}
	return endpointRooms
}

func mapLeafletPolygonToEndpointPolygon(lfPolygon leaflet_map.LeafletPolygon) leafletPolygon {
	var coordinates []leafletLatLng = make([]leafletLatLng, 0)

	for _, coordinate := range lfPolygon.Coordinates {
		coordinates = append(coordinates, leafletLatLng{
			Lat: coordinate.Lat,
			Lng: coordinate.Lng,
		})
	}

	return leafletPolygon{
		Coordinates: coordinates,
	}
}

type room struct {
	Id      int            `json:"id"`
	Name    string         `json:"name"`
	Details string         `json:"details"`
	Type    string         `json:"type"`
	Shape   leafletPolygon `json:"shape"`
	Marker  leafletLatLng  `json:"marker"`
}
