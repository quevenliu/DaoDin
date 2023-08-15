echo "setup docker working on $PWD"
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
chmod +x ./CICD/write_secrets.sh
./write_secrets.sh
docker compose down --remove-orphans
docker-compose -f ./docker-compose.yaml up -d
docker system prune -af