package leaflet_map

import (
	"log"
	"api/gateway"
	"time"
)

type EmployeeStore struct {
	employeeHtmlUrl string
	updateInDays    int
	Employees       *[]Employee
	EmployeesMap    *map[string]Employee
	rooms           []Room
	ticker          *time.Ticker
	done            chan bool
}

func (idc *EmployeeStore) Init(employeeHtmlUrl string, updateInDays int, rooms []Room) {
	idc.employeeHtmlUrl = employeeHtmlUrl
	idc.updateInDays = updateInDays
	idc.rooms = rooms
	idc.loadData()
}

func (idc *EmployeeStore) loadData() {
	employees := gateway.GetEmployees(idc.employeeHtmlUrl)

	// when employee store is initialised the employee data is empty.
	// when method GetEmployees returns an empty array the employee data assignment is skipped. This will preserve the last
	// successful data load.
	if len(employees) > 0 {
		idc.Employees = MapPersonToRoom(employees, idc.rooms)
		idc.EmployeesMap = createEmployeesMap(idc.Employees)
	}
}

func (idc *EmployeeStore) StartPeriodicSync() *chan bool {
	if idc.updateInDays <= 0 {
		log.Println("EmployeeUpdater disabled.")
		return nil
	}
	oneDayInHours := 24
	idc.ticker = time.NewTicker(time.Duration(idc.updateInDays*oneDayInHours) * time.Hour)
	idc.done = make(chan bool)

	go func() {
		for {
			select {
			case <-idc.done:
				return
			case <-idc.ticker.C:
				log.Println("Syncing employee data ...")
				idc.loadData()
			}
		}
	}()

	return &idc.done
}

func (idc *EmployeeStore) StopPeriodicSync() {
	if idc.ticker != nil {
		log.Println("Stopping periodic employee data sync.")
		idc.ticker.Stop()
	}
	if idc.done != nil {
		idc.done <- true
	}
}

func createEmployeesMap(employees *[]Employee) *map[string]Employee {
	endpointEmployees := map[string]Employee{}
	for _, employee := range *employees {
		endpointEmployees[employee.StringId] = employee
	}
	return &endpointEmployees
}
