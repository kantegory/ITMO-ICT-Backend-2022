include .env
export

.PHONY: init
init:
	npm i
	mkdir -p run
	docker volume create --name hotels_backend_db -d local

.PHONY: build
build:
	npm run build

.PHONY: migrate
migrate:
	npm run migrate

.PHONY: swagger
swagger:
	npm run swagger-autogen

.PHONY: dev
dev:
	npm start

.PHONY: run
run:
	NODE_ENV=production node dist/index.js

.PHONY: d-run
d-run:
	docker-compose -f docker-compose.yml -f docker-compose.db.yml up -d --build

.PHONY: d-stop
d-stop:
	docker-compose -f docker-compose.yml -f docker-compose.db.yml stop

.PHONY: d-down
d-down:
	docker-compose -f docker-compose.yml -f docker-compose.db.yml down

.PHONY: d-logs
d-logs:
	docker-compose logs --tail=1000 --follow

.PHONY: d-bash
d-bash:
	docker exec -it ${COMPOSE_PROJECT_NAME}_backend_1 bash

.PHONY: psql
psql:
	docker exec -it ${COMPOSE_PROJECT_NAME}_db_1 psql --username ${POSTGRES_USER}

.DEFAULT_GOAL: init
