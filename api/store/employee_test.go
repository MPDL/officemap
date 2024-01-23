package store

import (
	"api/leaflet_map"
	"testing"
)

func SetupEmployeeData() (oldEmployees *map[string]leaflet_map.Employee, newEmployees *map[string]leaflet_map.Employee) {
	oldEmployees = &map[string]leaflet_map.Employee{"a": {
		Id:          0,
		StringId:    "a",
		Firstname:   "a",
		Lastname:    "a",
		Department:  "q",
		Room:        "q",
		LeafletRoom: leaflet_map.Room{},
		Phone:       "1",
		Email:       "a",
	},
		"c": {
			Id:          1,
			StringId:    "c",
			Firstname:   "c",
			Lastname:    "c",
			Department:  "e",
			Room:        "e",
			LeafletRoom: leaflet_map.Room{},
			Phone:       "2",
			Email:       "c",
		}}

	newEmployees = &map[string]leaflet_map.Employee{"b": {
		Id:          2,
		StringId:    "b",
		Firstname:   "b",
		Lastname:    "b",
		Department:  "q",
		Room:        "q",
		LeafletRoom: leaflet_map.Room{},
		Phone:       "1",
		Email:       "b",
	},
		"c": {
			Id:          3,
			StringId:    "t",
			Firstname:   "c",
			Lastname:    "t",
			Department:  "e",
			Room:        "e",
			LeafletRoom: leaflet_map.Room{},
			Phone:       "2",
			Email:       "t",
		}}
	return
}

func SetupEmployeeData2() (oldEmployees *map[string]leaflet_map.Employee, newEmployees *map[string]leaflet_map.Employee) {
	oldEmployees = &map[string]leaflet_map.Employee{"a": {
		Id:          0,
		StringId:    "a",
		Firstname:   "a",
		Lastname:    "a",
		Department:  "q",
		Room:        "q",
		LeafletRoom: leaflet_map.Room{},
		Phone:       "1",
		Email:       "a",
	},
		"c": {
			Id:          1,
			StringId:    "c",
			Firstname:   "c",
			Lastname:    "c",
			Department:  "e",
			Room:        "e",
			LeafletRoom: leaflet_map.Room{},
			Phone:       "2",
			Email:       "c",
		},
		"y": {
			Id:          7,
			StringId:    "c",
			Firstname:   "c",
			Lastname:    "c",
			Department:  "e",
			Room:        "e",
			LeafletRoom: leaflet_map.Room{},
			Phone:       "2",
			Email:       "c",
		},
		"z": {
			Id:          7,
			StringId:    "z",
			Firstname:   "z",
			Lastname:    "z",
			Department:  "e",
			Room:        "e",
			LeafletRoom: leaflet_map.Room{},
			Phone:       "2",
			Email:       "z",
		}}

	newEmployees = &map[string]leaflet_map.Employee{"b": {
		Id:          2,
		StringId:    "b",
		Firstname:   "b",
		Lastname:    "b",
		Department:  "q",
		Room:        "q",
		LeafletRoom: leaflet_map.Room{},
		Phone:       "1",
		Email:       "b",
	},
		"c": {
			Id:          3,
			StringId:    "t",
			Firstname:   "c",
			Lastname:    "t",
			Department:  "e",
			Room:        "e",
			LeafletRoom: leaflet_map.Room{},
			Phone:       "2",
			Email:       "t",
		},
		"y": {
			Id:          7,
			StringId:    "c",
			Firstname:   "i",
			Lastname:    "c",
			Department:  "e",
			Room:        "e",
			LeafletRoom: leaflet_map.Room{},
			Phone:       "2",
			Email:       "c",
		},
		"x": {
			Id:          7,
			StringId:    "x",
			Firstname:   "x",
			Lastname:    "x",
			Department:  "e",
			Room:        "e",
			LeafletRoom: leaflet_map.Room{},
			Phone:       "2",
			Email:       "x",
		}}
	return
}

func TestPrepareAndSendEmail(t *testing.T) {
	oldEmployees, newEmployees := SetupEmployeeData()

	addedEmployees, removedEmployees, modifiedEmployees := getModifiedEmployees(oldEmployees, newEmployees)
	if "b" != addedEmployees[0].Email {
		t.Errorf("There should be an added employee. Expected: %v, Got: %v", "b", addedEmployees[0].Email)
	}
	if 1 != len(addedEmployees) {
		t.Errorf("There should be only one added employee. Expected: %v, Got: %v", 1, len(addedEmployees))
	}

	if "a" != removedEmployees[0].Email {
		t.Errorf("There should be an removed employee. Expected: %v, Got: %v", "a", addedEmployees[0].Email)
	}
	if 1 != len(removedEmployees) {
		t.Errorf("There should be only one removed employee. Expected: %v, Got: %v", 1, len(addedEmployees))
	}

	if "t" != modifiedEmployees[0].Email.NewValue {
		t.Errorf("There should be an modified employee. Expected: %v, Got: %v", "t", modifiedEmployees[0].Email.NewValue)
	}
	if 1 != len(modifiedEmployees) {
		t.Errorf("There should be only one modified employee. Expected: %v, Got: %v", 1, len(modifiedEmployees))
	}
}

func TestGenerateEmailText(t *testing.T) {
	oldEmployees, newEmployees := SetupEmployeeData()
	addedEmployees, removedEmployees, modifiedEmployees := getModifiedEmployees(oldEmployees, newEmployees)
	emailText := generateEmailText(addedEmployees, removedEmployees, modifiedEmployees)
	println(emailText)
}

func TestGenerateEmailText2(t *testing.T) {
	oldEmployees, newEmployees := SetupEmployeeData2()
	addedEmployees, removedEmployees, modifiedEmployees := getModifiedEmployees(oldEmployees, newEmployees)
	emailText := generateEmailText(addedEmployees, removedEmployees, modifiedEmployees)
	println(emailText)
}
