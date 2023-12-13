package html_parser

import (
	"errors"
	"golang.org/x/net/html"
)

func GetFirstTable(doc *html.Node) (*html.Node, error) {
	var table *html.Node

	var crawler func(*html.Node)
	crawler = func(node *html.Node) {
		// table == nil only the first table
		if node.Type == html.ElementNode && node.Data == "table" && table == nil {
			// no overwrite will occur
			table = node
			// no nested table tag will be processed, after that method will return
			return
		}
		for child := node.FirstChild; child != nil; child = child.NextSibling {
			crawler(child)
		}
	}
	crawler(doc)

	if table != nil {
		return table, nil
	}
	return nil, errors.New("Missing <table> in the node tree")
}

func RetrieveEmployeesFromTable(table *html.Node) []Employee {
	var employees []Employee

	var crawler func(*html.Node)
	crawler = func(node *html.Node) {
		// len(employees) == 0 only the first tbody, prevents adding more employees from other tbody tags
		if node.Type == html.ElementNode && node.Data == "tbody" && len(employees) == 0 {
			for row := node.FirstChild; row != nil; row = row.NextSibling {
				if row.Type == html.ElementNode && row.Data == "tr" {
					// getter row data
					var rowData []string
					for cell := row.FirstChild; cell != nil; cell = cell.NextSibling {
						if cell.Type == html.ElementNode && cell.Data == "td" {
							allText := retrieveAllTextFromCell(cell)
							rowData = append(rowData, allText)
						}
					}

					// assign row data to employee struct
					var employee Employee
					for i, data := range rowData {
						switch i {
						case 0:
							employee.Firstname = data
						case 1:
							employee.Lastname = data
						case 2:
							employee.Department = data
						case 3:
							employee.Room = data
						case 4:
							employee.Phone = data
						case 5:
							employee.Email = data
						}
					}
					if len(employee.Firstname) > 0 || len(employee.Lastname) > 0 {
						employees = append(employees, employee)
					}
				}
			}

			// no nested tbody tag will be processed, after that method will return
			return
		}
		for child := node.FirstChild; child != nil; child = child.NextSibling {
			crawler(child)
		}
	}
	crawler(table)

	return employees
}

func retrieveAllTextFromCell(cell *html.Node) string {
	var crawler func(*html.Node)

	var allText = ""
	crawler = func(node *html.Node) {
		if node.Type == html.TextNode {
			allText = allText + node.Data
		}
		for child := node.FirstChild; child != nil; child = child.NextSibling {
			crawler(child)
		}
	}
	crawler(cell)

	return allText
}

type Employee struct {
	Firstname  string
	Lastname   string
	Department string
	Room       string
	Phone      string
	Email      string
}
