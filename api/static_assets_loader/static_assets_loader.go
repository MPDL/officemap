package static_assets_loader

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
)

func LoadPrinterJson(jsonUrl string) PrintersJson {
	jsonFile, err := downloadFile(jsonUrl)
	if err != nil {
		fmt.Println(err)
		return PrintersJson{}
	}

	var printersJson PrintersJson
	err = json.Unmarshal(jsonFile, &printersJson)
	if err != nil {
		fmt.Println(err)
		return PrintersJson{}
	}

	return printersJson
}

func LoadRoomJson(jsonUrl string) RoomsJson {
	jsonFile, err := downloadFile(jsonUrl)
	if err != nil {
		fmt.Println(err)
		return RoomsJson{}
	}

	var roomsJson RoomsJson
	err = json.Unmarshal(jsonFile, &roomsJson)
	if err != nil {
		fmt.Println(err)
		return RoomsJson{}
	}

	return roomsJson
}

func LoadGroundfloorImage(imageUrl string) []byte {
	image, err := downloadFile(imageUrl)
	if err != nil {
		fmt.Println(err)
		return []byte{}
	}

	return image
}

func downloadFile(url string) (byteArray []byte, err error) {
	// Get the data
	resp, err := http.Get(url)
	if err != nil {
		fmt.Println(fmt.Sprint("Could not get file. Error: ", err))
		err = errors.New("could not download file")
		return
	}
	defer resp.Body.Close()

	// Check response code
	if resp.StatusCode != 200 {
		fmt.Println("Request for file returned status:  " + resp.Status + ".")
		err = errors.New("could not download file")
		return
	}

	// Read content of response body
	var readErr error
	byteArray, readErr = io.ReadAll(resp.Body)
	if readErr != nil {
		fmt.Println("Could not read file.", readErr)
		err = errors.New("could not get json string from file")
	}

	return
}

type PrintersJson struct {
	Printers []PrinterJson `json:"printers"`
}

type PrinterJson struct {
	Id    int    `json:"id"`
	Name  string `json:"name"`
	Model string `json:"model"`
	Room  string `json:"room"`
}

type RoomsJson struct {
	Rooms []RoomJson `json:"rooms"`
}

type RoomJson struct {
	Id       int              `json:"id"`
	StringId string           `json:"string_id"`
	Name     string           `json:"name"`
	Details  string           `json:"details"`
	Area     float64          `json:"area"`
	Type     string           `json:"type"`
	Keywords []string         `json:"keywords"`
	Shape    []CoordinateJson `json:"shape"`
	Marker   CoordinateJson   `json:"marker"`
}

type CoordinateJson struct {
	Lat float64 `json:"lat"`
	Lng float64 `json:"lng"`
}
