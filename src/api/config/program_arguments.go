package config

import (
	"fmt"
	"strings"
)

type ProgramArguments struct {
	ApiPort        string
	GatewayPort    string
	GatewayBaseUrl string
	GatewayUrlPath string
}

func (programArgs ProgramArguments) ProgramArgsToString() string {
	var sb strings.Builder
	sb.WriteString("\n")
	sb.WriteString("Program arguments:\n")
	sb.WriteString(fmt.Sprintln("  ApiPort: ", programArgs.ApiPort))
	sb.WriteString(fmt.Sprintln("  GatewayPort: ", programArgs.GatewayPort))
	sb.WriteString(fmt.Sprintln("  GatewayBaseUrl: ", programArgs.GatewayBaseUrl))
	sb.WriteString(fmt.Sprintln("  GatewayUrlPath: ", programArgs.GatewayUrlPath))
	return sb.String()
}
