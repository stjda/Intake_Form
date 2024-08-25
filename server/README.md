# South Texas Juvenile Diabetes Registration Intake System

 #### Link to the project board
 https://miro.com/app/board/uXjVKEp7qgo=/

# MinIO object Storage in Docker
## Overview
Prepare the Environment

- Setup of Google Cloud
  Setup a Google Cloud project
  Enable the Compute Engine API
  Enable the Compute Groups API
  Setup the VM with persitant storage
- Turn on a Virtual Machine instance
  Connect Via SSH with the Google SSH Browser tool

Note: You do not need to manually create the /data directory on the host system when using Docker volumes, especially when working with Container-Optimized OS. Docker will manage the directory within the container itself when you specify the volume in the docker run command

Setup Docker on the VM in Google Cloud
- We will setup a container network so our server can talk to the minIO database when running   on the same VM in production
- Google cloud uses Google COS (Container Operating System) optimized for containers
  Use Docker: 
  - Create a volume to persist the database
  - Pull the MinIO docker image via the SSH command line
  - Inspect the container
  - Enter into the containers command-line interface and view logs:

  ```bash
  docker volume create minio-data

  docker run -p 9000:9000 -p 9001:9001 \
    --network=minio-net \   # create the network
    --name minio1 \
    -e "MINIO_ROOT_USER=minioadmin" \
    -e "MINIO_ROOT_PASSWORD=minioadmin" \
    -v minio-data:/data \
    --restart always \
    -d minio/minio server /data --console-address ":9001"

    docker ps
    docker volume inspect minio-data

    docker exec -it minio1 /bin/sh

    docker logs minio1
  ```

* To rebuild, and restart MinIO with dynamic logging
  ```bash
#### Stop the running container
docker stop minio1

#### Remove the container
docker rm minio1

#### Remove the image (optional, as it's an official image)
docker rmi minio/minio

#### Pull the latest image (since we're not building it locally)
docker pull minio/minio

#### Run the container again with the same settings as before
docker run -p 9000:9000 -p 9001:9001 \
  --network=minio-net \
  --name minio1 \
  -e "MINIO_ROOT_USER=minioadmin" \
  -e "MINIO_ROOT_PASSWORD=minioadmin" \
  -v minio-data:/data \
  --restart always \
  -d minio/minio server /data --console-address ":9001"

#### View the logs
docker logs -f minio1


- Access the web interface for the MinIO Database via: http://<VM_EXTERNAL_IP>:9001

# Containerize the Express server to run in the cloud with Docker
##### Dockerize the custom server:
- Use the official Node.js 14 image as a parent image
FROM node:14

- Set the working directory inside the container
WORKDIR /usr/src/app

- Copy the package.json and package-lock.json (if available)
COPY package*.json ./

- Install dependencies
RUN npm install --only=production

- Copy the rest of your application's source code from your host to your image filesystem.
COPY . .

- Inform Docker that the container listens on the specified network ports at runtime.
EXPOSE 3000

- Command to run your app
CMD ["npm", "start"]

#### Navigate to the directory containing your Dockerfile and build it, then the Docker Container

#### Build for multiple archtectures
- Use buildx to manage varying architectures:
docker buildx create --name mybuilder --use
docker buildx inspect --bootstrap

- build the express-server for both arm64 and amd64 - this will replace existing images pushed to dockerhub
docker buildx build --platform linux/amd64,linux/arm64 -t gbeals1/api-servers:ExpressApi-v1.1 --push .

```bash
docker build -t my-express-app . # build the express api server

# Push the server image to your dockerhub
- docker login 
- docker tag my-express-app gbeals1/api-servers:ExpressApi-v1.1
- docker push gbeals1/api-servers:ExpressApi-v1.1
# Specify the platform type since we used buildx to build for multiple platforms
docker run -d --name my-express-server \
  -p 3000:3000 \
  --platform linux/amd64 \  
  --network minio-net \
  -e PORT=3000 \
  -e NODE_ENV=development \
  -e ENDPOINT=http://34.135.9.49:9000 \
  -e ACCESS_KEY_ID=minioadmin \
  -e SECRET_ACCESS_KEY=minioadmin \
  gbeals1/api-servers:ExpressApi-v1.1
```
# Stop cleanup and restart
#### Stop the running container
docker stop my-express-server

#### Remove the container
docker rm my-express-server

#### Remove the image
docker rmi my-express-app // run this on your local machine with the server code
docker images  // remove image from both machines
docker rmi [IMAGE ID]

#### Rebuild the image
docker build -t my-express-app .

# Tag and Push the server image to your dockerhub
- docker login 
docker tag my-express-app gbeals1/api-servers:ExpressApi-v1.5
docker push gbeals1/api-servers:ExpressApi-v1.5

#### build the express-server for both arm64 and amd64 - this will replace existing images pushed to dockerhub
docker buildx build --platform linux/amd64,linux/arm64 -t gbeals1/api-servers:ExpressApi-v1.5 --push .

#### Run the container again with the same settings as before
docker run -d --name my-express-server \
  -p 3000:3000 \
  --platform linux/amd64 \
  --network minio-net \
  -e PORT=3000 \
  -e NODE_ENV=development \
  -e ENDPOINT=http://minio1:9000 \
  -e ACCESS_KEY_ID=minioadmin \
  -e SECRET_ACCESS_KEY=minioadmin \
  gbeals1/api-servers:ExpressApi-v1.5


#### View the logs
docker logs -f my-express-server
#### Exec into the container
docker exec -it my-express-app /bin/bash



