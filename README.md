# GitHub Repository Search App

This application allows you to search GitHub repositories using React, TypeScript, and Bootstrap. The app is containerized using Docker and docker-compose.

## Prerequisites

Make sure you have the following software installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Steps to Run the App

1. **Clone the repository:**
```shell
git clone https://github.com/etcmid/github-repo-search-app.git
cd github-repo-search-app
```

2. **Build and start the app container:**
```shell
docker-compose up --build app
```
This command will build the Docker image and start the container. The application will be accessible at `http://localhost:3000`.

3. **Run tests in the test container:**

Open a new terminal and navigate to the repository folder. Then, run:
```shell
docker-compose up --build test
```


This command will build the test image and run the tests in a separate container. You will see the test results in the terminal.

4. **Stop and remove containers:**

When you're done, stop the containers by pressing `Ctrl+C` in each terminal running `docker-compose up`. Then, run the following command to remove the containers and associated resources:

```shell
docker-compose down
```

That's it! You've successfully set up and run the GitHub Repository Search App and its tests in a new location.
