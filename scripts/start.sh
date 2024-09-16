#start-containers.sh

#!/bin/sh
cd /home/tamlv/chat-app

docker-compose build
docker-compose up -d