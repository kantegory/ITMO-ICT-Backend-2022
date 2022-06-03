.PHONY: init
init:
	npm i
	npm run build

.PHONY: run
run:
	npm start

.PHONY: lint
lint:
	npm run lint

.PHONY: sequelize
sequelize:
	npm i --save-dev sequelize-cli
	npx sequelize-cli init

.PHONY: migrate
migrate:
	npx sequelize-cli db:migrate  

.PHONY: seed
seed:
	npx sequelize-cli db:seed:all

.DEFAULT_GOAL := init