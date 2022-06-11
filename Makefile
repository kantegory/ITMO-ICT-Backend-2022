.PHONY: init
init:
	npm i
	mkdir -p run

.PHONY: build
build:
	npm run build

.PHONY: migrate
migrate:
	npm run migrate

.PHONY: swagger
swagger:
	npm run swagger-autogen

.PHONY: run
run:
	npm start

.DEFAULT_GOAL: init
