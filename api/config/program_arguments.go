package config

import (
	"fmt"
	"strings"
	"time"
)

type ProgramArguments struct {
	GatewayPort                string
	GatewayBaseUrl             string
	GatewayUrlPath             string
	RoomsJsonUrl               string
	PrintersJsonUrl            string
	GroundfloorImageUrl        string
	EmailTo                    string
	OnEmployeeUpdateEmailTitle string
	SendEmailOnEmployeeUpdate  bool
	ApiPort                    int
	EmployeeRefreshRate        time.Duration
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
	sb.WriteString(fmt.Sprintln("  EmailTo: ", programArgs.EmailTo))
	sb.WriteString(fmt.Sprintln("  OnEmployeeUpdateEmailTitle: ", programArgs.OnEmployeeUpdateEmailTitle))
	sb.WriteString(fmt.Sprintln("  SendEmailOnEmployeeUpdate: ", programArgs.SendEmailOnEmployeeUpdate))
	sb.WriteString(fmt.Sprintln("  ApiPort: ", programArgs.ApiPort))
	sb.WriteString(fmt.Sprintln("  EmployeeRefreshRate: ", programArgs.EmployeeRefreshRate))
	return sb.String()
}
