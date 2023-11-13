package endpoint

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"src/src/api/leaflet_map"
)

func StartHttpServer(employees []leaflet_map.Employee, serverPort string) {
	endpointPrinter := mapLeafletPrinterToEndpointPrinter(leaflet_map.LeafletPrinters)
	endpointPrinterMap := mapLeafletPrintersToEndpointPrintersMap(leaflet_map.LeafletPrinters)

	endpointRooms := mapLeafletRoomToEndpointRoom(leaflet_map.LeafletRooms)
	endpointRoomsMap := mapLeafletRoomToEndpointRoomMap(leaflet_map.LeafletRooms)

	endpointEmployees := mapLeafletEmployeeToEndpointEmployee(employees)
	endpointEmployeesMap := mapLeafletEmployeeToEndpointEmployeeMap(employees)

	router := gin.Default()
	router.GET("/search", func(c *gin.Context) {
		search(c, endpointEmployees, endpointRooms, endpointPrinter)
	})
	router.GET("/employees", func(c *gin.Context) {
		getEmployees(c, endpointEmployees)
	})
	router.GET("/employee/:id", func(c *gin.Context) {
		id := c.Param("id")
		getEmployee(c, endpointEmployeesMap, id)
	})
	router.GET("/rooms", func(c *gin.Context) {
		getRooms(c, endpointRooms)
	})
	router.GET("/room/:id", func(c *gin.Context) {
		id := c.Param("id")
		getRoom(c, endpointRoomsMap, id)
	})
	router.GET("/printers", func(c *gin.Context) {
		getPrinters(c, endpointPrinter)
	})
	router.GET("/printer/:id", func(c *gin.Context) {
		id := c.Param("id")
		getPrinter(c, endpointPrinterMap, id)
	})
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	fmt.Println("Starting server ...")
	router.Run("localhost:" + serverPort)
}
