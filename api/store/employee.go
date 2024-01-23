package store

import (
	"api/gateway"
	"api/leaflet_map"
	"api/mail"
	"fmt"
	"log"
	"strings"
	"time"
)

type EmployeeStore struct {
	employeeHtmlUrl        string
	updateInSeconds        int
	EmployeesMapOld        map[string]leaflet_map.Employee
	Employees              *[]leaflet_map.Employee
	EmployeesMap           *map[string]leaflet_map.Employee
	rooms                  []leaflet_map.Room
	ticker                 *time.Ticker
	done                   chan bool
	onEmployeeUpdateMailer *mail.Mailer
}

func (idc *EmployeeStore) Init(employeeHtmlUrl string, updateInSeconds int, rooms []leaflet_map.Room, onEmployeeUpdateMailer *mail.Mailer) {
	idc.employeeHtmlUrl = employeeHtmlUrl
	idc.updateInSeconds = updateInSeconds
	idc.onEmployeeUpdateMailer = onEmployeeUpdateMailer
	idc.rooms = rooms
	idc.loadData()
}

func (idc *EmployeeStore) loadData() {
	employees := gateway.GetEmployees(idc.employeeHtmlUrl)

	// when employee store is initialised the employee data is empty.
	// when method GetEmployees returns an empty array the employee data assignment is skipped. This will preserve the last
	// successful data load.
	if len(employees) > 0 {
		idc.Employees = leaflet_map.MapPersonToRoom(employees, idc.rooms)

		EmployeesMapNew := createEmployeesMap(idc.Employees)

		// this check will prevent sending an email when the back end is starting
		if idc.EmployeesMap != nil {
			idc.prepareAndSendEmail(idc.EmployeesMap, EmployeesMapNew)
		}

		idc.EmployeesMap = EmployeesMapNew
	}
}

func (idc *EmployeeStore) StartPeriodicSync() *chan bool {
	if idc.updateInSeconds <= 0 {
		log.Println("EmployeeUpdater disabled.")
		return nil
	}
	idc.ticker = time.NewTicker(time.Duration(idc.updateInSeconds) * time.Second)
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

func createEmployeesMap(employees *[]leaflet_map.Employee) *map[string]leaflet_map.Employee {
	endpointEmployees := map[string]leaflet_map.Employee{}
	for _, employee := range *employees {
		endpointEmployees[employee.StringId] = employee
	}
	return &endpointEmployees
}

func (idc *EmployeeStore) prepareAndSendEmail(oldEmployees *map[string]leaflet_map.Employee, newEmployees *map[string]leaflet_map.Employee) {
	addedEmployees, removedEmployees, modifiedEmployees := getModifiedEmployees(oldEmployees, newEmployees)

	// only send mail when there are changes
	if len(addedEmployees) != 0 || len(removedEmployees) != 0 || len(modifiedEmployees) != 0 {
		emailText := generateEmailText(addedEmployees, removedEmployees, modifiedEmployees)
		idc.onEmployeeUpdateMailer.SendMail(emailText)
	}
}

func generateEmailText(addedEmployees []leaflet_map.Employee, removedEmployees []leaflet_map.Employee, modifiedEmployees []leaflet_map.ModifiedEmployee) string {
	var mailText strings.Builder

	mailText.WriteString("<h1>Mimir Changes</h1>")
	mailText.WriteString("<h2>❇️ Added employees</h2>")
	for _, addedEmployee := range addedEmployees {
		mailText.WriteString(fmt.Sprint(addedEmployee.Firstname, ", ", addedEmployee.Lastname, ", ",
			addedEmployee.Email, ", ", addedEmployee.Room, ", ", addedEmployee.Department, ", ", addedEmployee.Phone, "<br>"))
	}
	mailText.WriteString("<br>")
	mailText.WriteString("<h2>🔄 Modified employees</h2>")
	for _, modifiedEmployee := range modifiedEmployees {
		mailText.WriteString(fmt.Sprint("Old: ", modifiedEmployee.Firstname.OldValue, ", ", modifiedEmployee.Lastname.OldValue, ", ",
			modifiedEmployee.Email.OldValue, ", ", modifiedEmployee.Room.OldValue, ", ", modifiedEmployee.Department.OldValue, ", ", modifiedEmployee.Phone.OldValue, "<br>"))

		mailText.WriteString("New: ")
		mailText.WriteString(printNewValue(modifiedEmployee.Firstname.Modified, modifiedEmployee.Firstname.NewValue))
		mailText.WriteString(printNewValue(modifiedEmployee.Lastname.Modified, modifiedEmployee.Lastname.NewValue))
		mailText.WriteString(printNewValue(modifiedEmployee.Email.Modified, modifiedEmployee.Email.NewValue))
		mailText.WriteString(printNewValue(modifiedEmployee.Room.Modified, modifiedEmployee.Room.NewValue))
		mailText.WriteString(printNewValue(modifiedEmployee.Department.Modified, modifiedEmployee.Department.NewValue))
		mailText.WriteString(printNewValue(modifiedEmployee.Phone.Modified, modifiedEmployee.Phone.NewValue))
		mailText.WriteString("<br><br>")
	}

	mailText.WriteString("<h2>❌ Removed employees</h2>")
	for _, removedEmployee := range removedEmployees {
		mailText.WriteString(fmt.Sprint(removedEmployee.Firstname, ", ", removedEmployee.Lastname, ", ",
			removedEmployee.Email, ", ", removedEmployee.Room, ", ", removedEmployee.Department, ", ", removedEmployee.Phone, "<br>"))
	}

	return mailText.String()
}

func printNewValue(modified bool, value string) string {
	var printedString strings.Builder

	if modified {
		printedString.WriteString("<b>*")
	}
	printedString.WriteString(value)
	if modified {
		printedString.WriteString("</b>")
	}
	printedString.WriteString(", ")

	return printedString.String()
}

func getModifiedEmployees(oldEmployees *map[string]leaflet_map.Employee, newEmployees *map[string]leaflet_map.Employee) (addedEmployees []leaflet_map.Employee, removedEmployees []leaflet_map.Employee, modifiedEmployees []leaflet_map.ModifiedEmployee) {
	for oldEmployeeStringId, oldEmployee := range *oldEmployees {
		if newEmployee, exists := (*newEmployees)[oldEmployeeStringId]; exists {
			firstnameModified := checkModifiedString(oldEmployee.Firstname, newEmployee.Firstname)
			lastnameModified := checkModifiedString(oldEmployee.Lastname, newEmployee.Lastname)
			departmentModified := checkModifiedString(oldEmployee.Department, newEmployee.Department)
			roomModified := checkModifiedString(oldEmployee.Room, newEmployee.Room)
			phoneModified := checkModifiedString(oldEmployee.Phone, newEmployee.Phone)
			emailModified := checkModifiedString(oldEmployee.Email, newEmployee.Email)

			if firstnameModified.Modified || lastnameModified.Modified || departmentModified.Modified || roomModified.Modified ||
				phoneModified.Modified || emailModified.Modified {
				modifiedEmployees = append(modifiedEmployees, leaflet_map.ModifiedEmployee{
					Firstname:  firstnameModified,
					Lastname:   lastnameModified,
					Department: departmentModified,
					Room:       roomModified,
					Phone:      phoneModified,
					Email:      emailModified,
				},
				)
			}
		} else {
			removedEmployees = append(removedEmployees, oldEmployee)
		}
	}

	for newEmployeeStringId, newEmployee := range *newEmployees {
		if _, exists := (*oldEmployees)[newEmployeeStringId]; !exists {
			addedEmployees = append(addedEmployees, newEmployee)
		}
	}

	return addedEmployees, removedEmployees, modifiedEmployees
}

func checkModifiedString(oldValue string, newValue string) (modifiedStringValue leaflet_map.ModifiedStringValue) {
	modified := false
	if oldValue != newValue {
		modified = true
	}

	modifiedStringValue.Modified = modified
	modifiedStringValue.OldValue = oldValue
	modifiedStringValue.NewValue = newValue

	return modifiedStringValue
}
