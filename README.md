```markdown
<p align="center">
  <img src="https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png" alt="Docker Logo" height="90">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Docker-Containerized-blue?logo=docker&logoColor=white" alt="Docker Badge"/>
  <img src="https://img.shields.io/badge/Kubernetes-Ready-blueviolet?logo=kubernetes"/>
  <img src="https://img.shields.io/badge/PostgreSQL-Persistent-brightgreen?logo=postgresql"/>
  <img src="https://img.shields.io/badge/Node.js-Backend-lightgrey?logo=node.js"/>
  <img src="https://img.shields.io/badge/Nginx-Frontend-009900?logo=nginx"/>
</p>

# DevOps Academy: Full-Stack Cloud-Native Demo

This is a hands-on, containerized DevOps Academy project featuring a Node.js backend, PostgreSQL database, and a modern Nginx frontend—all orchestrated with Docker Compose and Kubernetes.

---

## 📂 Project Structure

```

\|-- Dockerfile
\|-- README.md
\|-- backend
\|   |-- Dockerfile
\|   |-- package.json
\|   `-- server.js |-- backend-deployment.yaml |-- docker-compose.yml |-- frontend-deployment.yaml |-- nginx.conf |-- postgres-statefulset.yaml
`-- webapp
\|-- css
\|   `-- style.css     |-- index.html
    `-- js
\`-- script.js

````

---

## 🚀 Quick Start with Docker Compose

> **Requires:** [Docker](https://www.docker.com/get-started) & [Docker Compose](https://docs.docker.com/compose/install/)

1. **Clone this repository:**
   ```bash
   git clone https://github.com/m-pasima/nginx-web-page
   cd nginx-web-page/
````

2. **Start all services (frontend, backend, Postgres):**

   ```bash
   docker-compose up --build
   ```

3. **Access the site:**
   [http://localhost](http://localhost)

---

## ☸️ Kubernetes Quick Start (Optional, Advanced)

> Try real cloud-native deployments with [Minikube](https://minikube.sigs.k8s.io/) or any K8s cluster!

1. **Apply Postgres StatefulSet:**

   ```bash
   kubectl apply -f postgres-statefulset.yaml
   ```

2. **Apply Backend & Frontend Deployments:**

   ```bash
   kubectl apply -f backend-deployment.yaml
   kubectl apply -f frontend-deployment.yaml
   ```

3. **Access the frontend:**
   If using Minikube:

   ```bash
   minikube service devops-frontend
   ```

---

## 🛠️ Main Tech Stack

* **Frontend:** Nginx + HTML/CSS/JS (`webapp/`)
* **Backend:** Node.js (Express) API
* **Database:** PostgreSQL (persistent, with StatefulSet for K8s)
* **Containerization:** Docker, Docker Compose, Kubernetes (YAML)
* **Cloud-Native Concepts:** Persistent storage, headless service, StatefulSets

---

## 📖 What You’ll Learn

* Building, running, and connecting multi-container Docker applications
* Deploying stateful apps with persistent storage in Kubernetes
* Connecting frontend, backend, and database with clean networking
* Real DevOps workflow: build, test, deploy, scale

---

## 📦 Useful Commands

**Start everything with Compose:**

```bash
docker-compose up --build
```

**Stop everything:**

```bash
docker-compose down
```

**Deploy in Kubernetes:**

```bash
kubectl apply -f postgres-statefulset.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f frontend-deployment.yaml
```

---

## 🙌 Credits

* Project by **Pasima (Passy)**, DevOps Engineer & Mentor
* [Docker logo](https://www.docker.com/company/newsroom/media-resources/)

---

<p align="center">
  <img src="https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png" alt="Docker Moby Whale" height="60">
</p>
```

