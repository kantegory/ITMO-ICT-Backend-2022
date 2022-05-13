.DEFAULT_GOAL: start-fresh

.PHONY: start-fresh
start-fresh:
	make lint
	make ci
	make run

.PHONY: run
run:
	npm start

.PHONY: lint
lint:
	npm run lint

.PHONY: build
build:
	npm run build

.PHONY: rme
rme:
	npm run rme

.PHONY: ci
ci:
	npm ci
