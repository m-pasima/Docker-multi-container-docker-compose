<p align="center">
  <img src="https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png" alt="Docker Logo" height="90">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Docker-Containerized-blue?logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/Kubernetes-Ready-blueviolet?logo=kubernetes"/>
  <img src="https://img.shields.io/badge/PostgreSQL-Persistent-brightgreen?logo=postgresql"/>
  <img src="https://img.shields.io/badge/Node.js-Backend-lightgrey?logo=node.js"/>
  <img src="https://img.shields.io/badge/Nginx-Frontend-009900?logo=nginx"/>
</p>

# DevOps Academy: Full-Stack Cloud-Native Demo

This project features a Node.js backend, PostgreSQL database, and an Nginx frontend all containerized and orchestrated with Docker Compose and Kubernetes.

---

## 📂 Project Structure

```
|-- Dockerfile
|-- README.md
|-- backend
|   |-- Dockerfile
|   |-- package.json
|   `-- server.js
|-- backend-deployment.yaml
|-- docker-compose.yml
|-- frontend-deployment.yaml
|-- nginx.conf
|-- postgres-statefulset.yaml
`-- webapp
    |-- css
    |   `-- style.css
    |-- index.html
    `-- js
        `-- script.js
```

---

## 🚀 Quick Start (Docker Compose)

> **Requires:** [Docker](https://www.docker.com/get-started), [Docker Compose](https://docs.docker.com/compose/install/)

```bash
git clone https://github.com/m-pasima/Docker-multi-container-docker-compose.git
cd Docker-multi-container-docker-compose/

docker-compose up --build -d
```
## This will:

* Build the images

* Start the containers

* Run them in the background

* Free your terminal for other commands

**Access:** [http://localhost](http://localhost) or [http://EC2-PUBLIC-IP:PORT]

---

## 🐳 Building & Pushing Images

### 1. Build images locally

```bash
docker build -t <your-username>/devops-backend:latest ./backend
docker build -t <your-username>/devops-frontend:latest .
```

Replace `<your-username>` with your Docker Hub username or registry URL.

### 2. Log in and push images to a registry

#### Docker Hub:

```bash
docker login
docker push <your-username>/devops-backend:latest
docker push <your-username>/devops-frontend:latest
```

#### AWS ECR:

```bash
aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.<region>.amazonaws.com

docker tag devops-backend:latest <aws_account_id>.dkr.ecr.<region>.amazonaws.com/devops-backend:latest
docker push <aws_account_id>.dkr.ecr.<region>.amazonaws.com/devops-backend:latest
```

#### Google Container Registry (GCR):

```bash
gcloud auth configure-docker
docker tag devops-backend:latest gcr.io/<project-id>/devops-backend:latest
docker push gcr.io/<project-id>/devops-backend:latest
```

---

## ☸️ Kubernetes Deployment

### Update YAML Files

Before deploying, update your image references in:

* `backend-deployment.yaml`
* `frontend-deployment.yaml`

Example (`backend-deployment.yaml`):

```yaml
containers:
- name: backend
  image: yourusername/devops-backend:latest # Change this!
```

### Deploy to Kubernetes

```bash
kubectl apply -f postgres-statefulset.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f frontend-deployment.yaml
```

### Access the frontend:

If using Minikube:

```bash
minikube service devops-frontend
```

---

## 🚨 Common Errors & Fixes

### Pods stuck on `ErrImagePull` or `ImagePullBackOff`

Check pod details:

```bash
kubectl describe pod <pod-name>
```

**Cause:** Kubernetes can't pull your image.

**Fix:**

* Verify image name/tag in deployment YAML.
* Ensure image was pushed to registry.
* Authenticate cluster with your registry (ECR, Docker Hub, GCR).

### Postgres pod stuck in `ContainerCreating`

Check PVC status:

```bash
kubectl get pvc
```

If PVC remains `Pending`, ensure your cluster storage class supports dynamic provisioning.

---

## 📦 Useful Commands

| Command                           | Description           |
| --------------------------------- | --------------------- |
| `docker-compose up --build`       | Start all containers  |
| `docker-compose down`             | Stop containers       |
| `kubectl apply -f <file.yaml>`    | Apply Kubernetes YAML |
| `kubectl logs <pod-name>`         | View pod logs         |
| `kubectl describe pod <pod-name>` | Check pod events      |

---

## 📖 What You’ll Learn

* Building multi-container apps with Docker & Compose
* Deploying stateful apps in Kubernetes
* Container registries (Docker Hub, AWS ECR, GCR)
* Debugging common deployment issues
* DevOps workflow: build, deploy, test, debug

---

## 🛠️ Main Tech Stack

* **Frontend:** Nginx, HTML/CSS/JS
* **Backend:** Node.js (Express)
* **Database:** PostgreSQL
* **Containerization:** Docker, Docker Compose
* **Orchestration:** Kubernetes

---

## 🙌 Credits


* Project by  **Pasima (Passy)**, DevOps Engineer & Mentor
* [Docker Official Logo](https://www.docker.com/company/newsroom/media-resources/)

<p align="center">
  <img src="https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png" alt="Docker Moby Whale" height="60">
</p>

---

