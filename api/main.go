package main

import (
	"api/config"
	"api/endpoint"
	"api/leaflet_map"
	"flag"
	"fmt"
	"log"
	"os"
	"os/signal"
	"api/static_assets_loader"
	"syscall"
)

func main() {
	// TODO: move map image to a vpn closed server

	fmt.Println("Get program arguments ...")
	arguments := GetProgramArguments()
	fmt.Println(arguments.ProgramArgsToString())

	rooms := static_assets_loader.LoadRoomJson(arguments.RoomsJsonUrl)
	convertedRooms := leaflet_map.JsonRoomToLeaflet(rooms)

	fmt.Println("Get employees from gateway ...")
	employeeUrl := arguments.GatewayBaseUrl + ":" + arguments.GatewayPort + arguments.GatewayUrlPath
	employeeStore := leaflet_map.EmployeeStore{}
	employeeStore.Init(employeeUrl, 1, convertedRooms)
	employeeStore.StartPeriodicSync()

	printers := static_assets_loader.LoadPrinterJson(arguments.PrintersJsonUrl)
	mappedPrinters := leaflet_map.MapPrintersToRoom(printers, convertedRooms)

	image := static_assets_loader.LoadGroundfloorImage(arguments.GroundfloorImageUrl)

	// Listen to system signals
	log.Println("Listening to system signals ...")
	ListenToSystemSignals(&employeeStore)

	fmt.Println("Init api ...")
	endpoint.StartHttpServer(&employeeStore, convertedRooms, mappedPrinters, image)
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

func ListenToSystemSignals(employeeStore *leaflet_map.EmployeeStore) *chan bool {
	sigs := make(chan os.Signal, 1)
	signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM)
	done := make(chan bool, 1)

	go func() {
		sig := <-sigs

		if sig == syscall.SIGTERM || sig == syscall.SIGINT {
			log.Println(fmt.Sprintf("Received system signal: %s", sig.String()))
			employeeStore.StopPeriodicSync()
			logMessage := "employeeStore sync stopped."
			log.Println(logMessage)
			os.Exit(0)
		}

		done <- true
	}()

	return &done
}
