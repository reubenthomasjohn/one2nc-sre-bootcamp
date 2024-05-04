all: start_db check_db_migrations run_migrations build_api run_api 

.PHONY: start_db
start_db:
	docker run -d \
		-e POSTGRES_DB=mydb \
		-e POSTGRES_PASSWORD=testpass123 \
		-e POSTGRES_USER=postgres \
		-p 6500:5432 \
		-v postgres_data:/var/lib/postgresql/data \
		--name postgres_container \
		postgres:15.2

	sleep 5 # Wait for the container to start, there must be a better way to do this. Wait until container is up maybe?

	docker cp ./api/prisma/migrations postgres_container:/var/lib/postgresql/data/

.PHONY: stop_db
stop_db:
	docker stop postgres_container

.PHONY: check_db_migrations
check_db_migrations:
	

.PHONY: run_migrations
run_migrations:
	docker exec -i postgres_container psql -U postgres mydb -c 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'

	docker exec -i postgres_container /bin/bash -c 'for file in /var/lib/postgresql/data/migrations/*/*.sql; do \
        echo "Applying migration $$file"; \
        psql -U postgres mydb < "$$file"; \
    done'

.PHONY: build_api
build_api:
	echo "building api"


.PHONY: run_api
run_api:
	make start_db 
	make 
