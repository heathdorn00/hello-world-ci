# Hello World CI/CD Production Deployment

A production-ready TypeScript application demonstrating Docker, Kubernetes, and security best practices with full CI/CD pipeline.

## 🎯 Features

### Application
- ✅ REST API with health/readiness/metrics endpoints
- ✅ TypeScript with strict type checking
- ✅ Express.js web framework
- ✅ Prometheus-compatible metrics
- ✅ Graceful shutdown handling

### Docker & Security
- ✅ Multi-stage Dockerfile (dependencies, build, production)
- ✅ Security hardening (non-root user, read-only root filesystem)
- ✅ Distroless-inspired production image
- ✅ Health checks built-in
- ✅ Minimal image size (~50MB)

### Kubernetes
- ✅ Complete K8s manifests (namespace, deployment, service, etc.)
- ✅ Pod Security Standards (restricted)
- ✅ Resource limits and requests
- ✅ Horizontal Pod Autoscaler (HPA)
- ✅ Network Policies (zero-trust)
- ✅ RBAC with least privilege
- ✅ Liveness and readiness probes

### CI/CD Pipeline
- ✅ 4-gate progressive pipeline
- ✅ Security scanning with Trivy
- ✅ Automated testing (unit + integration)
- ✅ Docker build caching (BuildKit)
- ✅ GitHub Container Registry (GHCR)
- ✅ Coverage reporting

### Testing
- ✅ 25 unit and integration tests
- ✅ 86%+ code coverage
- ✅ TypeScript type checking
- ✅ ESLint code quality checks

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build TypeScript
npm run build

# Start server
npm start

# Access endpoints
curl http://localhost:3000/health
curl http://localhost:3000/metrics
curl -X POST http://localhost:3000/greet -H "Content-Type: application/json" -d '{"name": "World"}'
```

### Docker

```bash
# Build image
docker build -t hello-world-ci:latest .

# Run container
docker run -p 3000:3000 hello-world-ci:latest

# Test
curl http://localhost:3000/health
```

### Kubernetes

```bash
# Deploy to Kubernetes
kubectl apply -f k8s/

# Check deployment
kubectl get pods -n hello-world-prod
kubectl get svc -n hello-world-prod

# View logs
kubectl logs -f deployment/hello-world-app -n hello-world-prod

# Port forward for local access
kubectl port-forward svc/hello-world-service 8080:80 -n hello-world-prod
```

## 📋 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | API information |
| `/health` | GET | Health check (liveness) |
| `/ready` | GET | Readiness check |
| `/metrics` | GET | Prometheus metrics |
| `/greet` | POST | Greeting endpoint |

### Example Requests

```bash
# Basic greeting
curl -X POST http://localhost:3000/greet \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice"}'

# Formal greeting
curl -X POST http://localhost:3000/greet \
  -H "Content-Type: application/json" \
  -d '{"name": "Bob", "style": "formal"}'

# Enthusiastic greeting
curl -X POST http://localhost:3000/greet \
  -H "Content-Type: application/json" \
  -d '{"name": "Charlie", "style": "enthusiastic"}'
```

## 🔒 Security Features

### Container Security
- Non-root user (UID 1001)
- Read-only root filesystem
- No privilege escalation
- Dropped all capabilities
- Security context enforced
- Trivy vulnerability scanning

### Kubernetes Security
- Pod Security Standards: restricted
- Network Policies: default deny
- RBAC: least privilege service account
- No service account token auto-mount
- Secure ConfigMaps for configuration

### CI/CD Security
- Automated security scanning (Trivy)
- Vulnerability reporting to GitHub Security
- Image signing ready (Cosign)
- SARIF format security reports

## 📊 CI/CD Pipeline

The pipeline has 4 progressive gates:

### Gate 1: Fast Feedback (< 2min)
- Linting
- Type checking
- Unit tests
- Coverage threshold check
- ❌ **BLOCKS** on failure

### Gate 2: Security & Build (< 10min)
- Docker build with caching
- Trivy security scan
- Push to GHCR
- SARIF security reports
- ❌ **BLOCKS** on CRITICAL vulnerabilities

### Gate 3: Integration Tests (< 15min)
- Integration test execution
- Application smoke tests
- Health check validation

### Gate 4: Deploy to Production (manual approval)
- Kubernetes deployment
- Rollout status monitoring
- Production smoke tests
- Automatic rollback on failure

## 🎯 Production Deployment

### Prerequisites
- Kubernetes cluster (1.28+)
- kubectl configured
- GitHub Container Registry access

### Deployment Steps

1. **Create namespace:**
```bash
kubectl apply -f k8s/namespace.yaml
```

2. **Deploy application:**
```bash
kubectl apply -f k8s/
```

3. **Verify deployment:**
```bash
kubectl get all -n hello-world-prod
kubectl rollout status deployment/hello-world-app -n hello-world-prod
```

4. **Access application:**
```bash
# Port forward
kubectl port-forward svc/hello-world-service 8080:80 -n hello-world-prod

# Test
curl http://localhost:8080/health
```

### Monitoring

```bash
# View logs
kubectl logs -f deployment/hello-world-app -n hello-world-prod

# Check metrics
kubectl port-forward svc/hello-world-service 8080:80 -n hello-world-prod
curl http://localhost:8080/metrics

# Watch HPA
kubectl get hpa -n hello-world-prod -w
```

### Scaling

```bash
# Manual scaling
kubectl scale deployment/hello-world-app --replicas=5 -n hello-world-prod

# HPA will auto-scale based on CPU/memory (3-10 replicas)
kubectl get hpa hello-world-hpa -n hello-world-prod
```

## 📈 Metrics

Application exposes Prometheus-compatible metrics:

```
http_requests_total  - Total HTTP requests
http_errors_total    - Total HTTP errors
app_uptime_seconds   - Application uptime
```

## 🛠️ Tech Stack

- **Language:** TypeScript 5.3
- **Runtime:** Node.js 20
- **Framework:** Express 4.18
- **Testing:** Jest 29.7
- **Linting:** ESLint 8.56
- **Container:** Docker with multi-stage build
- **Orchestration:** Kubernetes 1.28+
- **Registry:** GitHub Container Registry
- **CI/CD:** GitHub Actions
- **Security:** Trivy, Pod Security Standards

## 📚 Project Structure

```
hello-world-ci/
├── .github/
│   └── workflows/
│       ├── ci.yml                    # Original CI pipeline
│       └── production-deploy.yaml    # Production CI/CD with security
├── k8s/
│   ├── namespace.yaml               # Namespace with PSS
│   ├── deployment.yaml              # Deployment with security context
│   ├── service.yaml                 # ClusterIP service
│   ├── serviceaccount.yaml          # RBAC configuration
│   ├── configmap.yaml               # Application configuration
│   ├── hpa.yaml                     # Horizontal Pod Autoscaler
│   └── networkpolicy.yaml           # Network policies
├── src/
│   ├── __tests__/
│   │   ├── greeter.test.ts         # Greeter unit tests
│   │   └── server.test.ts          # Server integration tests
│   ├── greeter.ts                   # Greeter class
│   ├── server.ts                    # Express server
│   └── index.ts                     # Entry point
├── Dockerfile                       # Multi-stage Docker build
├── .dockerignore                    # Docker ignore patterns
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript config
├── jest.config.js                   # Jest test config
├── .eslintrc.js                     # ESLint config
└── README.md                        # This file
```

## 🏆 Best Practices Implemented

### From Docker/K8s Alignment Document

✅ Multi-stage Dockerfile (dev + production targets)
✅ Security hardening (non-root, read-only, no capabilities)
✅ Kubernetes manifests following restricted PSS
✅ Network Policies for zero-trust networking
✅ HPA for auto-scaling based on CPU/memory
✅ Health checks (liveness + readiness)
✅ Resource limits and requests
✅ RBAC with least privilege
✅ ConfigMaps for configuration
✅ 4-gate progressive CI/CD pipeline
✅ Security scanning with Trivy
✅ Container image caching (BuildKit)
✅ Prometheus-compatible metrics

## 📖 Related Documentation

- [Docker/K8s Alignment Document](https://github.com/heathdorn00/hello-world-ci/docs/alignment.md) - Complete team alignment
- [Security Best Practices](https://kubernetes.io/docs/concepts/security/)
- [Pod Security Standards](https://kubernetes.io/docs/concepts/security/pod-security-standards/)
- [Trivy Documentation](https://aquasecurity.github.io/trivy/)

## 🤝 Contributing

This project demonstrates production-ready patterns. Contributions welcome!

1. Fork the repository
2. Create a feature branch
3. Make changes with tests
4. Run full test suite
5. Submit PR (CI/CD will run automatically)

## 📝 License

MIT

## 🎓 Learning Resources

This project demonstrates concepts from:
- 🔐 Security domain alignment (10 questions)
- 🏗️ Architecture domain alignment (10 questions)
- 🧪 Testing domain alignment (10 questions)
- 💻 Development domain alignment (10 questions)

**Built by RefactorTeam - Demonstrating execution culture with production-ready code** 🚀
