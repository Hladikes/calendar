CONTAINER_ID="$(docker ps | grep "calendar" | cut -d " " -f 1)"
docker kill $CONTAINER_ID
docker rm $CONTAINER_ID

IMAGE_ID="$(docker images | grep "calendar" | xargs | cut -d " " -f 3 | xargs)"
docker rmi $IMAGE_ID

docker build . -t calendar
docker run -d -p31256:8080 --name "calendar" --restart unless-stopped calendar