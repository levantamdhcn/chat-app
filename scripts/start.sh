#start.sh

#!/bin/sh
cd /home/ubuntu/chat-app

docker-compose build
docker-compose up -d