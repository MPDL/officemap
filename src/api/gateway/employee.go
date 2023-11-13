package gateway

import (
	"bytes"
	"encoding/binary"
	"fmt"
	"golang.org/x/net/html"
	"io"
	"net/http"
	"src/src/api/html_parser"
	"strings"
	"unicode/utf16"
)

func GetEmployees(gatewayUrl string) []html_parser.Employee {
	// Get the data
	resp, err := http.Get(gatewayUrl)
	if err != nil {
		fmt.Println("error: could not download file: " + err.Error())
		return []html_parser.Employee{}
	}
	defer resp.Body.Close()

	// Check response code
	if resp.StatusCode != 200 {
		fmt.Println("error code not 200: " + err.Error())
		return []html_parser.Employee{}
	}

	// Read content of response body
	var readErr error
	byteArray, readErr := io.ReadAll(resp.Body)
	if readErr != nil {
		fmt.Println("error: could not read body of http response: " + readErr.Error())
	}

	s, errDec := DecodeUtf16(byteArray, binary.LittleEndian)
	if errDec != nil {
		fmt.Println("error: could not read convert utf16 string to utf8: " + errDec.Error())
	}

	htmlNode, _ := html.Parse(strings.NewReader(s))
	tableNode, tableErr := html_parser.GetFirstTable(htmlNode)
	if tableErr != nil {
		fmt.Println("error: could not find table: " + tableErr.Error())
	}
	employees := html_parser.RetrieveEmployeesFromTable(tableNode)

	return employees
}

func DecodeUtf16(b []byte, order binary.ByteOrder) (string, error) {
	ints := make([]uint16, len(b)/2)
	if err := binary.Read(bytes.NewReader(b), order, &ints); err != nil {
		return "", err
	}
	return string(utf16.Decode(ints)), nil
}
