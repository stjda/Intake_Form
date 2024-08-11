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
    --network=minio-net \
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
```bash
docker build -t my-express-app .

docker run -p 3000:3000 \
  --network=minio-net \
  --name my-express-server \
  -e MINIO_ROOT_USER='minioadmin' \
  -e MINIO_ROOT_PASSWORD='minioadmin' \
  -e MINIO_ENDPOINT='http://minio1:9000' \  # Using Docker DNS as they're on the same network
  -d my-express-app
```
* Configure Environment Variables: 
```javascript
  const s3Client = new S3Client({
    endpoint: process.env.MINIO_ENDPOINT,  // Now pulled from environment variables
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.MINIO_ROOT_USER,
      secretAccessKey: process.env.MINIO_ROOT_PASSWORD
    },
    forcePathStyle: true,
  });
```