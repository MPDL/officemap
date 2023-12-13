package endpoint

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func getGroundfloorImage(c *gin.Context, image []byte) {
	// TODO only dev
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

	c.Header("Content-Type", "image/png")
	c.Header("Content-Disposition", "attachment; filename=groundfloor.png")
	c.Data(http.StatusOK, "application/octet-stream", image)
}
