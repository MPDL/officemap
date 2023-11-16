package main

import (
	"api/config"
	"api/endpoint"
	"api/gateway"
	"api/leaflet_map"
	"api/static_assets_loader"
	"flag"
	"fmt"
)

func main() {
	// TODO: move map image to a vpn closed server

	fmt.Println("Get program arguments ...")
	arguments := GetProgramArguments()
	fmt.Println(arguments.ProgramArgsToString())

	rooms := static_assets_loader.LoadRoomJson(arguments.RoomsJsonUrl)
	convertedRooms := leaflet_map.JsonRoomToLeaflet(rooms)

	fmt.Println("Get employees from gateway ...")
	employees := gateway.GetEmployees(arguments.GatewayBaseUrl + ":" + arguments.GatewayPort + arguments.GatewayUrlPath)
	mappedEmployess := leaflet_map.MapPersonToRoom(employees, convertedRooms)

	printers := static_assets_loader.LoadPrinterJson(arguments.PrintersJsonUrl)
	mappedPrinters := leaflet_map.MapPrintersToRoom(printers, convertedRooms)

	image := static_assets_loader.LoadGroundfloorImage(arguments.GroundfloorImageUrl)

	fmt.Println("Init api ...")
	endpoint.StartHttpServer(mappedEmployess, convertedRooms, mappedPrinters, image, "8080")

}

func GetProgramArguments() config.ProgramArguments {
	gatewayPort := flag.String("gatewayPort", "8181", "The port of the gateway.")
	gatewayBaseUrl := flag.String("gatewayBaseUrl", "http://localhost", "The base url of the gateway.")
	gatewayUrlPath := flag.String("gatewayUrlPath", "/index.html", "The url path of the gateway.")
	roomsJsonUrl := flag.String("roomsJsonUrl", "http://example:2222/example/data.json", "The url to the rooms json file.")
	printersJsonUrl := flag.String("printersJsonUrl", "http://example:2222/example/data.json", "The url to the printers json file.")
	groundfloorImageUrl := flag.String("groundfloorImageUrl", "http://example:2222/data.png", "The url to the groundfloor image file.")

	flag.Parse()

	return config.ProgramArguments{
		GatewayPort:         *gatewayPort,
		GatewayBaseUrl:      *gatewayBaseUrl,
		GatewayUrlPath:      *gatewayUrlPath,
		RoomsJsonUrl:        *roomsJsonUrl,
		PrintersJsonUrl:     *printersJsonUrl,
		GroundfloorImageUrl: *groundfloorImageUrl,
	}
}
