package config

import (
	"fmt"
	"strings"
)

type ProgramArguments struct {
	GatewayPort         string
	GatewayBaseUrl      string
	GatewayUrlPath      string
	RoomsJsonUrl        string
	PrintersJsonUrl     string
	GroundfloorImageUrl string
}

func (programArgs ProgramArguments) ProgramArgsToString() string {
	var sb strings.Builder
	sb.WriteString("\n")
	sb.WriteString("Program arguments:\n")
	sb.WriteString(fmt.Sprintln("  GatewayPort: ", programArgs.GatewayPort))
	sb.WriteString(fmt.Sprintln("  GatewayBaseUrl: ", programArgs.GatewayBaseUrl))
	sb.WriteString(fmt.Sprintln("  GatewayUrlPath: ", programArgs.GatewayUrlPath))
	sb.WriteString(fmt.Sprintln("  RoomsJsonUrl: ", programArgs.RoomsJsonUrl))
	sb.WriteString(fmt.Sprintln("  PrintersJsonUrl: ", programArgs.PrintersJsonUrl))
	sb.WriteString(fmt.Sprintln("  GroundfloorImageUrl: ", programArgs.GroundfloorImageUrl))
	return sb.String()
}
