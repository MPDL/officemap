package main

import (
	"flag"
	"fmt"
	"src/src/api/config"
	"src/src/api/endpoint"
	"src/src/api/gateway"
	"src/src/api/leaflet_map"
)

func main() {
	// TODO: move map image to a vpn closed server

	fmt.Println("Get program arguments ...")
	arguments := GetProgramArguments()
	fmt.Println(arguments.ProgramArgsToString())

	fmt.Println("Get employees from gateway ...")
	employees := gateway.GetEmployees(arguments.GatewayBaseUrl + ":" + arguments.GatewayPort + arguments.GatewayUrlPath)

	mappedEmployess := leaflet_map.MapPersonToRoom(employees)

	fmt.Println("Init api ...")
	endpoint.StartHttpServer(mappedEmployess, arguments.ApiPort)

}

func GetProgramArguments() config.ProgramArguments {
	apiPort := flag.String("apiPort", "8484", "The port of the api server")
	gatewayPort := flag.String("gatewayPort", "8181", "The port of the gateway.")
	gatewayBaseUrl := flag.String("gatewayBaseUrl", "http://localhost", "The base url of the gateway.")
	gatewayUrlPath := flag.String("gatewayUrlPath", "/index.html", "The url path of the gateway.")

	flag.Parse()

	return config.ProgramArguments{ApiPort: *apiPort, GatewayPort: *gatewayPort,
		GatewayBaseUrl: *gatewayBaseUrl, GatewayUrlPath: *gatewayUrlPath}
}
