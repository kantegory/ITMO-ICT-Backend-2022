.PHONY: init
init:
	npm i
	npm run build
	pip3 install -r requirement.txt

.PHONY: requirements
requirements:
	pip3 freeze | grep -v "pkg-resources" > requirement.txt

.PHONY: run
run:
	npm start

.PHONY: migrate
migrate:
	npx sequelize-cli db:migrate  

.DEFAULT_GOAL := init