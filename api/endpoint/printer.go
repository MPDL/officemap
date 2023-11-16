package endpoint

import (
	"api/leaflet_map"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

func getPrinters(c *gin.Context, printers []printer) {
	// TODO only dev
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

	c.IndentedJSON(http.StatusOK, printers)
}

func getPrinter(c *gin.Context, printers map[int]printer, id string) {
	// TODO only dev
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

	idNumeric, err := strconv.Atoi(id)
	if err != nil {
		c.IndentedJSON(http.StatusOK, nil)
		fmt.Println(err.Error())
		return
	}

	if idNumeric < 0 || idNumeric >= len(printers) {
		c.IndentedJSON(http.StatusOK, nil)
		return
	}

	c.IndentedJSON(http.StatusOK, printers[idNumeric])
}

func mapLeafletPrintersToEndpointPrintersMap(leafletPrinters []leaflet_map.Printer) map[int]printer {
	endpointPrinters := map[int]printer{}
	for _, leafletPrinter := range leafletPrinters {
		endpointPrinters[leafletPrinter.Id] = printerMapHelper(leafletPrinter)
	}
	return endpointPrinters
}

func printerMapHelper(leafletPrinter leaflet_map.Printer) printer {
	return printer{
		Id:    leafletPrinter.Id,
		Name:  leafletPrinter.Name,
		Model: leafletPrinter.Model,
		Marker: leafletLatLng{
			Lat: leafletPrinter.Marker.Lat,
			Lng: leafletPrinter.Marker.Lng,
		},
	}
}

func mapLeafletPrinterToEndpointPrinter(leafletPrinter []leaflet_map.Printer) []printer {
	endpointPrinter := []printer{}
	for _, leafletPrinter := range leafletPrinter {
		endpointPrinter = append(endpointPrinter, printerMapHelper(leafletPrinter))
	}
	return endpointPrinter
}

type printer struct {
	Id     int           `json:"id"`
	Name   string        `json:"name"`
	Model  string        `json:"model"`
	Marker leafletLatLng `json:"marker"`
}
