package leaflet_map

import (
	"api/static_assets_loader"
	"strings"
)

func MapPrintersToRoom(jsonPrinters static_assets_loader.PrintersJson, rooms []Room) []Printer {
	leafletPrinters := []Printer{}

	for _, printerItem := range jsonPrinters.Printers {
		for _, roomItem := range rooms {
			if strings.Contains(printerItem.Room, roomItem.LiteralId) {
				leafletPrinters = append(leafletPrinters, Printer{
					Id:     printerItem.Id,
					Name:   printerItem.Name,
					Model:  printerItem.Model,
					Marker: roomItem.Marker,
				})
				break
			}
		}
	}

	return leafletPrinters
}
