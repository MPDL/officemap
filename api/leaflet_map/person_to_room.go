package leaflet_map

import (
	"api/html_parser"
	"strings"
)

func MapPersonToRoom(employees []html_parser.Employee, rooms []Room) *[]Employee {
	mappedEmployees := []Employee{}

	for index, employee := range employees {

		var leafletRoom Room
		for _, roomItem := range rooms {
			if strings.Contains(employee.Room, roomItem.StringId) {
				leafletRoom = roomItem
				break
			}
		}

		if leafletRoom.StringId == "" {
			continue
		}

		// determine emailId
		emailSplit := strings.Split(employee.Email, "@")
		var emailId = ""
		if len(emailSplit) > 1 {
			emailId = emailSplit[0]
		}
		if len(emailId) == 0 {
			continue
		}

		mappedEmployees = append(mappedEmployees, Employee{
			Id:          index,
			StringId:    emailId,
			Firstname:   employee.Firstname,
			Lastname:    employee.Lastname,
			Room:        employee.Room,
			Department:  employee.Department,
			LeafletRoom: leafletRoom,
			Phone:       employee.Phone,
			Email:       employee.Email,
		})
	}

	return &mappedEmployees
}
