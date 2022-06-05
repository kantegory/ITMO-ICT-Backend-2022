.PHONY: rebuild-run
rebuild-run:
	docker-compose up --build --force-recreate --no-deps

.PHONY: shut-down
shut-down:
	docker-compose down -v

.DEFAULT_GOAL := rebuild-run