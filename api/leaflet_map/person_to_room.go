package leaflet_map

import (
	"api/html_parser"
	"strings"
)

func MapPersonToRoom(employees []html_parser.Employee, rooms []Room) []Employee {
	mappedEmployees := []Employee{}

	for index, employee := range employees {

		var leafletRoom Room
		for _, roomItem := range rooms {
			if strings.Contains(employee.Room, roomItem.LiteralId) {
				leafletRoom = roomItem
				break
			}
		}

		if leafletRoom.LiteralId == "" {
			continue
		}

		mappedEmployees = append(mappedEmployees, Employee{
			Id:          index,
			Firstname:   employee.Firstname,
			Lastname:    employee.Lastname,
			Room:        employee.Room,
			Department:  employee.Department,
			LeafletRoom: leafletRoom,
			Phone:       employee.Phone,
			Email:       employee.Email,
		})
	}

	return mappedEmployees
}
