package leaflet_map

type Room struct {
	Id       int
	StringId string
	Name     string
	Details  string
	Area     float64
	Type     RoomType
	Keywords []string
	Shape    LeafletPolygon
	Marker   LeafletLatLng
}

type Employee struct {
	Id          int
	StringId    string
	Firstname   string
	Lastname    string
	Department  string
	Room        string
	LeafletRoom Room
	Phone       string
	Email       string
}

type Printer struct {
	Id     int
	Name   string
	Model  string
	Marker LeafletLatLng
}

type RoomType int64

const (
	Undefined RoomType = iota
	Workspace
	Bathroom
	Meeting
	Lounge
	Misc
)

func (s RoomType) String() string {
	switch s {
	case Workspace:
		return "workspace"
	case Bathroom:
		return "bathroom"
	case Meeting:
		return "meeting"
	case Lounge:
		return "lounge"
	case Misc:
		return "misc"
	}
	return "undefined"
}

func StringRoomTypeToEnum(roomType string) RoomType {
	switch roomType {
	case "workspace":
		return Workspace
	case "bathroom":
		return Bathroom
	case "meeting":
		return Meeting
	case "lounge":
		return Lounge
	case "misc":
		return Misc
	}
	return Undefined
}

func (s RoomType) Type(roomType string) RoomType {
	switch roomType {
	case "workspace":
		return Workspace
	case "bathroom":
		return Bathroom
	case "meeting":
		return Meeting
	case "lounge":
		return Lounge
	case "misc":
		return Misc
	}
	return Undefined
}
