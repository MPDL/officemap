package leaflet_map

import "src/src/api/html_parser"

func MapPersonToRoom(employees []html_parser.Employee) []Employee {
	mappedEmployees := []Employee{}

	for index, employee := range employees {

		roomId := personRoomMapping[employee.Email]
		room := LeafletRooms[roomId]

		mappedEmployees = append(mappedEmployees, Employee{
			Id:          index,
			Firstname:   employee.Firstname,
			Lastname:    employee.Lastname,
			Room:        employee.Room,
			Department:  employee.Department,
			LeafletRoom: room,
			Phone:       employee.Phone,
			Email:       employee.Email,
		})
	}

	return mappedEmployees
}

var personRoomMapping = map[string]string{
	"leiminger@mpdl.mpg.de": "A.06.01-06",
	"ranger@mpdl.mpg.de":    "A.06.08-09",
	"yu@mpdl.mpg.de":        "A.06.08-09",
	"roeder@mpdl.mpg.de":    "A.06.08-09",
}
