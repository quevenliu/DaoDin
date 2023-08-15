echo "setup docker working on $PWD"
docker compose down --remove-orphans
docker-compose -f ./docker-compose.yaml up -d
docker system prune -af