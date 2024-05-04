all: start_db check_db_migrations run_migrations build_api run_api 

.PHONY: start_db
start_db:
	if [ -z $$(docker ps -q -f name=postgres_container) ]; then \
		docker run -d \
			-e POSTGRES_DB=mydb \
			-e POSTGRES_PASSWORD=testpass123 \
			-e POSTGRES_USER=postgres \
			-p 6500:5432 \
			-v postgres_data:/var/lib/postgresql/data \
			--name postgres_container \
			postgres:15.2; \
		sleep 5; \
		docker cp ./api/prisma/migrations postgres_container:/var/lib/postgresql/data/; \
		echo "PostgreSQL container started."; \
	else \
        echo "PostgreSQL container is already running."; \
    fi

.PHONY: stop_db
stop_db:
	docker stop postgres_container
	docker container rm postgres_container

.PHONY: check_db_migrations
check_db_migrations:
	echo "not implemented yet"
	
.PHONY: run_migrations
run_migrations:
	docker exec -i postgres_container psql -U postgres mydb -c 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
	docker exec -i postgres_container psql -U postgres mydb -c 'CREATE TABLE IF NOT EXISTS migration_history ( \
																id SERIAL PRIMARY KEY, \
																migration_name VARCHAR(255) NOT NULL, \
																applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP \
																);'

	docker exec -i postgres_container /bin/bash -c 'for file in /var/lib/postgresql/data/migrations/*/*.sql; do \
        migration_name=$$(basename "$$(dirname "$$file")"); \
        echo "Applying migration $$migration_name"; \
        psql -U postgres mydb < "$$file"; \
        psql -U postgres mydb -c "INSERT INTO migration_history (migration_name) VALUES ('\''$$migration_name'\'');"; \
    done'

.PHONY: build_api
build_api:
	docker-compose build --no-cache

.PHONY: run_api
run_api:
	make start_db 
	make run_migrations
	make build_api
	docker compose up -d
