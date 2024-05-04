## Milestone 2: Containerise REST API

References:

1. Docker multi-stage builds for typescript + express: https://dev.to/raunakgurud09/mastering-docker-multistage-builds-1e0m#:~:text=Docker%20multistage%20builds%20are%20a,runtime%20in%20the%20final%20stage.

## Steps to run:

1. Run the postgres container using Docker
   `docker run -d -e POSTGRES_DB=mydb -e POSTGRES_PASSWORD=testpass123 -e POSTGRES_USER=postgres -p "6500:5432" postgres`

2. Build the api image
   `docker build --no-cache -t api-1.0.0 . `

3. Run the api container
   `docker run -it -p 3000:3000 api-1.0.0`
