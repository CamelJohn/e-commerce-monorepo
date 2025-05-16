#!/bin/bash


trap 'echo "Stopping..."; docker compose -f docker-compose.dev.yml down -v; exit 0' SIGINT

docker compose -f docker-compose.dev.yml up --build