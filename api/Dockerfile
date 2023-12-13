# syntax=docker/dockerfile:1

FROM golang:1.20

# Set destination for COPY
WORKDIR /app

# Add source code
ADD . /app

# Download Go modules
RUN go mod download

# Build
RUN go build -o ./api

# Optional:
# To bind to a TCP port, runtime parameters must be supplied to the docker command.
# But we can document in the Dockerfile what ports
# the application is going to listen on by default.
# https://docs.docker.com/engine/reference/builder/#expose
EXPOSE 8080

# Run
CMD ./api -gatewayPort=$GATEWAY_PORT -gatewayBaseUrl=$GATEWAY_BASE_URL -gatewayUrlPath=$GATEWAY_URL_PATH -roomsJsonUrl=$ROOMS_JSON_URL -printersJsonUrl=$PRINTERS_JSON_URL -groundfloorImageUrl=$GROUNDFLOOR_IMAGE_URL