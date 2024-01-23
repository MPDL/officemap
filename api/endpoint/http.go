package endpoint

import (
	"api/leaflet_map"
	"api/store"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func StartHttpServer(employeeStore *store.EmployeeStore, rooms []leaflet_map.Room, printers []leaflet_map.Printer, groundfloor []byte) {
	endpointPrinter := mapLeafletPrinterToEndpointPrinter(printers)
	endpointPrinterMap := mapLeafletPrintersToEndpointPrintersMap(printers)

	endpointRooms := mapLeafletRoomToEndpointRoom(rooms)
	endpointRoomsMap := mapLeafletRoomToEndpointRoomMap(rooms)

	router := gin.Default()
	router.GET("/search", func(c *gin.Context) {
		search(c, employeeStore.Employees, rooms, printers)
	})
	router.GET("/employees", func(c *gin.Context) {
		getEmployees(c, employeeStore.Employees)
	})
	router.GET("/employee/:id", func(c *gin.Context) {
		id := c.Param("id")
		getEmployee(c, employeeStore.EmployeesMap, id)
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
	router.GET("/groundfloor.png", func(c *gin.Context) {
		getGroundfloorImage(c, groundfloor)
	})
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	fmt.Println("Starting server ...")
	router.Run("0.0.0.0:8080")
}
