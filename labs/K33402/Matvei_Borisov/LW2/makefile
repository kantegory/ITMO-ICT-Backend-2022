.PHONY: init
init:
	npm i

.PHONY: run
run:
	docker compose up -d
	npm run start:dev

.PHONY: migrate
migrate:
	npm run migrate

.DEFAULT_GOAL: init
