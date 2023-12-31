package endpoint

import (
	"api/leaflet_map"
	"github.com/gin-gonic/gin"
	"net/http"
)

func getEmployees(c *gin.Context, employees *[]leaflet_map.Employee) {
	// TODO only dev
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

	c.IndentedJSON(http.StatusOK, mapLeafletEmployeeToEndpointEmployee(*employees))
}

func getEmployee(c *gin.Context, employees *map[string]leaflet_map.Employee, stringId string) {
	// TODO only dev
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	c.IndentedJSON(http.StatusOK, employeeMapHelper((*employees)[stringId]))
}

func mapLeafletEmployeeToEndpointEmployee(leafletEmployees []leaflet_map.Employee) []employee {
	endpointEmployees := []employee{}
	for _, leafletEmployee := range leafletEmployees {
		endpointEmployees = append(endpointEmployees, employeeMapHelper(leafletEmployee))
	}
	return endpointEmployees
}

func employeeMapHelper(leafletEmployee leaflet_map.Employee) employee {
	return employee{
		Id:         leafletEmployee.Id,
		StringId:   leafletEmployee.StringId,
		Firstname:  leafletEmployee.Firstname,
		Lastname:   leafletEmployee.Lastname,
		Department: leafletEmployee.Department,
		Room:       leafletEmployee.Room,
		Phone:      leafletEmployee.Phone,
		Email:      leafletEmployee.Email,
		Marker: leafletLatLng{
			Lat: leafletEmployee.LeafletRoom.Marker.Lat,
			Lng: leafletEmployee.LeafletRoom.Marker.Lng,
		},
	}
}

type employee struct {
	Id         int           `json:"id"`
	StringId   string        `json:"stringId"`
	Firstname  string        `json:"firstname"`
	Lastname   string        `json:"lastname"`
	Department string        `json:"department"`
	Room       string        `json:"room"`
	Phone      string        `json:"phone"`
	Email      string        `json:"email"`
	Marker     leafletLatLng `json:"marker"`
}
