package endpoint

import (
	"api/leaflet_map"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

func getEmployees(c *gin.Context, employees []employee) {
	// TODO only dev
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

	c.IndentedJSON(http.StatusOK, employees)
}

func getEmployee(c *gin.Context, employees map[int]employee, id string) {
	// TODO only dev
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

	idNumeric, err := strconv.Atoi(id)
	if err != nil {
		c.IndentedJSON(http.StatusOK, nil)
		fmt.Println(err.Error())
		return
	}

	if idNumeric < 0 || idNumeric >= len(employees) {
		c.IndentedJSON(http.StatusOK, nil)
		return
	}

	c.IndentedJSON(http.StatusOK, employees[idNumeric])
}

func mapLeafletEmployeeToEndpointEmployee(leafletEmployees []leaflet_map.Employee) []employee {
	endpointEmployees := []employee{}
	for _, leafletEmployee := range leafletEmployees {
		endpointEmployees = append(endpointEmployees, employeeMapHelper(leafletEmployee))
	}
	return endpointEmployees
}

func mapLeafletEmployeeToEndpointEmployeeMap(leafletEmployees []leaflet_map.Employee) map[int]employee {
	endpointEmployees := map[int]employee{}
	for _, leafletEmployee := range leafletEmployees {
		endpointEmployees[leafletEmployee.Id] = employeeMapHelper(leafletEmployee)
	}
	return endpointEmployees
}

func employeeMapHelper(leafletEmployee leaflet_map.Employee) employee {
	return employee{
		Id:         leafletEmployee.Id,
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
	Firstname  string        `json:"firstname"`
	Lastname   string        `json:"lastname"`
	Department string        `json:"department"`
	Room       string        `json:"room"`
	Phone      string        `json:"phone"`
	Email      string        `json:"email"`
	Marker     leafletLatLng `json:"marker"`
}
