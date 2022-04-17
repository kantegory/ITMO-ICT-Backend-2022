.PHONY: run
run:
	npm run dev

.PHONY: build
build:
	npm i
	npm run tsc

.PHONY: migrate 
migrate:
	npx sequelize-cli db:migrate 

.DEFAULT_GOAL := init
