# Udagram (Refactor monolith to microservices)
Udagram is a simple cloud application developed alongside the Udacity Cloud Engineering Nanodegree. It allows users to register and log into a web client, post photos to the feed, and process photos using an image filtering microservice.

The project is split into two parts:
- Frontend - Angular web application built with Ionic Framework
- Backend RESTful API - Node-Express application

## Usage
> _tip_: it's recommended that you start with getting the backend API running since the frontend web application depends on the API.

### Installation 
Please make sure the following applications are installed in the system.
- Node (version 13.12.0) > _tip_: You may use NVM to better control the node versions.
- Kubectl CLI
- AWS CLI
- Docker
- Ionic CLI
- Set up Amazon S3
- Set up RDS
- Set up Kubernetes Cluster and Node Group in AWS EKS

### Database
Create a PostgreSQL database either locally or on AWS RDS. Set the config values for environment variables prefixed with `POSTGRES_` in `set_env.sh`.

### S3
Create an AWS S3 bucket. Set the config values for environment variables prefixed with `AWS_` in `set_env.sh`.

### Kubernetes Cluster
Create a Kubernetes Cluster and Node Group in AWS EKS. Update kubeconfig with `aws eks --region <region-code> update-kubeconfig --name <cluster_name>` in your local terminal. 

### Backend API
* To download all the package dependencies, run the command from the directory `udacity-api-user/` and `udacity-api-feed`:
    ```bash
    npm install .
    ```
* To run the application locally, run:
    ```bash
    npm run dev
    ```
* You can visit `http://localhost:8080/api/v0/feed` in your web browser to verify that the application is running. You should see a JSON payload. Feel free to play around with Postman to test the API's.

### Frontend App
* To download all the package dependencies, run the command from the directory `udacity-frontend/`:
    ```bash
    npm install .
    ```
* Install Ionic Framework's Command Line tools for us to build and run the application:
    ```bash
    npm install -g ionic
    ```
* Prepare your application by compiling them into static files.
    ```bash
    ionic build
    ```
* Run the application locally using files created from the `ionic build` command.
    ```bash
    ionic serve
    ```
* You can visit `http://localhost:8100` in your web browser to verify that the application is running. You should see a web interface.

### Create Dockerhub Repositories
Create 4 public repositories in Dockerhub. 
- udacity-api-feed
- udacity-api-user
- udacity-frontend
- udacity-reverseproxy
You may use a different name for your repositories. 

### Build Docker Images
* To create a docker image for `udacity-api-feed`, run the command from the directory `udacity-api-feed/`:
    ```bash
    docker build -t udacity-api-feed .
    docker tag udacity-api-feed newtonlaw18/udacity-api-feed
    docker push newtonlaw18/udacity-api-feed
    ```
* To create a docker image for `udacity-api-user`, run the command from the directory `udacity-api-user/`:
    ```bash
    docker build -t udacity-api-user .
    docker tag udacity-api-user newtonlaw18/udacity-api-user
    docker push newtonlaw18/udacity-api-user
    ```
* To create a docker image for `udacity-frontend`, run the command from the directory `udacity-frontend/`:
    ```bash
    docker build -t udacity-frontend .
    docker tag udacity-frontend newtonlaw18/udacity-frontend
    docker push newtonlaw18/udacity-frontend
    ```   
* To create a docker image for `udacity-reverseproxy`, run the command from the directory `udacity-deployment/docker/`:
    ```bash
    docker build -t udacity-reverseproxy .
    docker tag udacity-reverseproxy newtonlaw18/udacity-reverseproxy
    docker push newtonlaw18/udacity-reverseproxy
    ```
* Once all images are pushed, run `docker-compose up` and visit `localhost:8100` to test
You may use a different name for your docker images. Run `docker images` to verify all images are there. 

### Kubernetes
* Set up the secret keys and configmaps for the project. These are the `aws-secret.yaml`, `env-configmap.yaml`, `env-secret.yaml` files in the `udacity-deployment/k8s/` directory.
* Link AWS EKS config by running
    ```bash
    aws eks --region your-aws-region update-kubeconfig --name your-eks-cluster-name

    # Example
    # aws eks --region us-east-2 update-kubeconfig --name Udagram
    ```
* Create the secret key and config map resources for Kubernetes cluster
    ```bash
    kubectl apply -f aws-secret.yaml
    kubectl apply -f env-secret.yaml
    kubectl apply -f env-configmap.yaml

    # run this to get aws secret credentials
    cat ~/.aws/credentials | head -n  3 | base64       
    ```
* Create the Kubernetes deployments and services resources by running the command below for the remaining .yaml files
    ```bash
    kubectl apply -f backend-feed-deployment.yaml
    kubectl apply -f backend-feed-service.yaml
    kubectl apply -f backend-user-deployment.yaml
    kubectl apply -f backend-user-service.yaml
    kubectl apply -f frontend-deployment.yaml
    kubectl apply -f frontend-service.yaml
    kubectl apply -f reverseproxy-deployment.yaml
    kubectl apply -f reverseproxy-service.yaml
    ```
* Verify pods status 
    ```bash
    kubectl get pods
    kubectl get deployment
    kubectl describe services
    ```
* Forward the deployment port to Localhost:8080 using 
    ```bash
    kubectl port-forward reverseproxy 8080:8080.
    ````
* Go to localhost:8100 to test

### Travis
* Set up a Travis account.
* Link your Github account to Travis.
* Ensure the .travis.yml is in the root directory of the Github repository.
* Commit and push to Github repository. This should trigger Travis build automatically. 
* Verify Travis build status.

### Set Up Kubernetes Horizontal Pod Autoscaler (HPA)
* Install the Kubernetes Metrics Server
    ```bash
    kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
    ```
* Verify that the metrics-server deployment is running the desired number of pods with the following command.
    ```
    kubectl get deployment metrics-server -n kube-system
    ```
* Create HPA for the `backend-feed` deployment (You may also create HPA for `backend-user` deployment by increasing the number of `replicas` in the `deployment.yaml` file.)
    ```bash
    kubectl autoscale deployment backend-feed --cpu-percent=50 --min=1 --max=5
    ```
* Verify HPA status
    ```bash
    kubectl describe hpa
    ```
