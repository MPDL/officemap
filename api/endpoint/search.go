package endpoint

import (
	"api/leaflet_map"
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"strings"
)

func search(c *gin.Context, allEmployees *[]leaflet_map.Employee, allRooms []leaflet_map.Room, allPrinter []leaflet_map.Printer) {
	// config variables
	const SearchStringLimit = 40
	const SearchKeywordLimit = 4

	// TODO only dev
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

	// get search string
	searchString := c.Query("input")

	// no empty strings allowed
	if len(searchString) == 0 {
		c.IndentedJSON(http.StatusOK, []SearchResultItem{})
		return
	}

	// limit the query string
	stringLimit := len(searchString)
	if stringLimit > SearchStringLimit {
		stringLimit = SearchStringLimit
	}
	truncatedSearchString := searchString[:stringLimit]

	// remove separators characters
	transformedSearchString := strings.ReplaceAll(truncatedSearchString, ",", " ")
	transformedSearchString = strings.TrimSpace(transformedSearchString)

	// retrieve keywords of query string
	allKeywords := strings.Split(transformedSearchString, " ")

	// limit the number of keywords
	limitedKeywords := make([]string, 0)
	for index, keyword := range allKeywords {
		if index == SearchKeywordLimit {
			break
		}

		if len(keyword) > 0 {
			limitedKeywords = append(limitedKeywords, keyword)
		}
	}

	// search for keywords in the data
	var searchResult []SearchResultItem = make([]SearchResultItem, 0)
	var priority = 0

	matchingEmployees := *allEmployees
	for _, keyword := range limitedKeywords {
		var employeeCandidates []leaflet_map.Employee
		for _, employee := range matchingEmployees {
			var hasFound = false
			// TODO maybe replace contains with regex with flag i and g
			if hasFound = strings.Contains(strings.ToLower(employee.Firstname), strings.ToLower(keyword)); hasFound {
				employeeCandidates = append(employeeCandidates, employee)
				continue
			}
			if hasFound = strings.Contains(strings.ToLower(employee.Lastname), strings.ToLower(keyword)); hasFound {
				employeeCandidates = append(employeeCandidates, employee)
				continue
			}
			if hasFound = strings.Contains(strings.ToLower(employee.Email), strings.ToLower(keyword)); hasFound {
				employeeCandidates = append(employeeCandidates, employee)
				continue
			}
			if hasFound = strings.Contains(strings.ToLower(employee.Department), strings.ToLower(keyword)); hasFound {
				employeeCandidates = append(employeeCandidates, employee)
				continue
			}
			if hasFound = strings.Contains(strings.ToLower(employee.Room), strings.ToLower(keyword)); hasFound {
				employeeCandidates = append(employeeCandidates, employee)
				continue
			}
			if hasFound = strings.Contains(strings.ToLower(employee.Phone), strings.ToLower(keyword)); hasFound {
				employeeCandidates = append(employeeCandidates, employee)
				continue
			}
		}
		matchingEmployees = employeeCandidates
		employeeCandidates = []leaflet_map.Employee{}
	}
	for _, employee := range matchingEmployees {
		searchResult, priority = addSearchResultItem(employeeMapHelper(employee), SearchTypeEmployee, searchResult, limitedKeywords, priority)
	}

	matchingRooms := allRooms
	for _, keyword := range limitedKeywords {
		var roomCandidates []leaflet_map.Room
		for _, room := range matchingRooms {
			var hasFound = false
			if hasFound = strings.Contains(strings.ToLower(room.Name), strings.ToLower(keyword)); hasFound {
				roomCandidates = append(roomCandidates, room)
				continue
			}
			if hasFound = strings.Contains(strings.ToLower(room.StringId), strings.ToLower(keyword)); hasFound {
				roomCandidates = append(roomCandidates, room)
				continue
			}
			for _, roomKeyword := range room.Keywords {
				if hasFound = strings.Contains(roomKeyword, strings.ToLower(keyword)); hasFound {
					roomCandidates = append(roomCandidates, room)
					break
				}
			}
			if hasFound {
				continue
			}
			if hasFound = strings.Contains(strings.ToLower(room.Type.String()), strings.ToLower(keyword)); hasFound {
				roomCandidates = append(roomCandidates, room)
				continue
			}
		}
		matchingRooms = roomCandidates
		roomCandidates = []leaflet_map.Room{}
	}
	for _, room := range matchingRooms {
		searchResult, priority = addSearchResultItem(roomMapHelper(room), SearchTypeRoom, searchResult, limitedKeywords, priority)
	}

	matchingPrinter := allPrinter
	for _, keyword := range limitedKeywords {
		var printerCandidates []leaflet_map.Printer
		for _, printer := range matchingPrinter {
			var hasFound = false
			if hasFound = strings.Contains(strings.ToLower(printer.Name), strings.ToLower(keyword)); hasFound {
				printerCandidates = append(printerCandidates, printer)
				continue
			}
			if hasFound = strings.Contains(strings.ToLower(printer.Model), strings.ToLower(keyword)); hasFound {
				printerCandidates = append(printerCandidates, printer)
				continue
			}
		}
		matchingPrinter = printerCandidates
		printerCandidates = []leaflet_map.Printer{}
	}
	for _, printer := range matchingPrinter {
		searchResult, priority = addSearchResultItem(printerMapHelper(printer), SearchTypePrinter, searchResult, limitedKeywords, priority)
	}

	// send the result
	c.IndentedJSON(http.StatusOK, searchResult)
}

func addSearchResultItem[V SearchResultItem, T employee | room | printer](searchItem T, searchType SearchType,
	searchResult []V, keywords []string, priority int) ([]V, int) {
	searchItemJson, err := json.Marshal(searchItem)
	if err != nil {
		fmt.Println("Could not marshal employee.")
		return searchResult, priority
	}

	searchResultItem := V{
		Type:     searchType.String(),
		Data:     string(searchItemJson),
		Keywords: keywords,
		Priority: priority,
	}
	priority = +1
	searchResult = append(searchResult, searchResultItem)

	return searchResult, priority
}

type SearchType int64

const (
	Undefined SearchType = iota
	SearchTypeEmployee
	SearchTypeRoom
	SearchTypePrinter
)

func (s SearchType) String() string {
	switch s {
	case SearchTypeEmployee:
		return "employee"
	case SearchTypeRoom:
		return "room"
	case SearchTypePrinter:
		return "printer"
	}
	return "unknown"
}

func keywordMatch(keywords []string, inString string) bool {
	for _, keyword := range keywords {
		if strings.Contains(strings.ToLower(inString), strings.ToLower(keyword)) {
			return true
		}
	}

	return false
}

type SearchResultItem struct {
	Type     string   `json:"type"`
	Data     string   `json:"data"`
	Keywords []string `json:"keywords"`
	Priority int      `json:"priority"`
}
