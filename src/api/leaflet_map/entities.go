package leaflet_map

type Room struct {
	Id        int
	LiteralId string
	Name      string
	Details   string
	Type      RoomType
	Shape     LeafletPolygon
	Marker    LeafletLatLng
}

type Employee struct {
	Id          int
	Firstname   string
	Lastname    string
	Department  string
	Room        string
	LeafletRoom Room
	Phone       string
	Email       string
}

type Printer struct {
	Id      int
	Name    string
	Address string
	Model   string
	Marker  LeafletLatLng
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
	return "unknown"
}
