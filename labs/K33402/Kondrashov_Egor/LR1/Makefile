.PHONY: up
up:
	npm run start

.PHONY: init
init:
	npm i

.PHONY: lint
lint:
	npm run lint

.PHONY: build
build:
	npm run build

.PHONY: migrations
migrations:
	npm run migration:generate $(ARGS)

.PHONY: migrate
migrate:
	npm run migration:run

.DEFAULT_GOAL: up
