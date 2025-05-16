
# 📦 E-Commerce System Architecture (MVP)

## Overview
This document outlines the architecture and service plan for building an Amazon-like e-commerce platform with real-time notifications, warehouse management, and an admin panel.

The system uses a combination of **Kubernetes pods** and **AWS serverless services**, developed locally with tools like **Testcontainers**, **LocalStack**, and **Docker**.

---

## 🧩 Core Microservices

| Service               | Responsibility                        | Runtime         | Notes                                  |
|-----------------------|----------------------------------------|------------------|----------------------------------------|
| **API Gateway / BFF** | Public-facing API (NestJS), routes to other services | K8s Pod         | REST/GraphQL                           |
| **Auth**              | Login, Signup, OAuth, Session Management | AWS Cognito     | Use Lambda triggers for custom flow   |
| **User Service**      | User profiles, addresses, preferences | K8s Pod          | PostgreSQL                             |
| **Product Catalog**   | Product CRUD, categories, filters     | K8s Pod          | PostgreSQL                             |
| **Search Service**    | Product search, filters, ranking      | Serverless / AWS OpenSearch | Optional for MVP      |
| **Inventory / Warehouse** | Track stock levels, warehouse logic | K8s Pod      | PostgreSQL                             |
| **Order Service**     | Cart, checkout, order lifecycle       | K8s Pod          | Orchestrates other services            |
| **Payment Service**   | Stripe/PayPal integration             | Serverless (Lambda) | Use Stripe CLI for local dev     |
| **Shipping Service**  | Label generation, tracking            | Serverless       | Use mock endpoints locally             |
| **Notification Service** | Emails, SMS, push notifications   | Serverless (Lambda + SNS/SQS) | LocalStack for dev        |
| **Admin Panel API**   | Admin dashboard APIs                  | K8s Pod          | Connected to Admin React frontend      |
| **Webhooks Gateway**  | Handles incoming webhooks             | Serverless       | Stripe, shipping, etc.                 |

---

## 🗄️ Databases

| Service              | DB Type     | Notes                              |
|----------------------|-------------|------------------------------------|
| Product, Inventory   | PostgreSQL  | Core relational data               |
| Orders, Payments     | PostgreSQL (DynamoDB later) | Transition later for scale |
| Notifications        | SNS/SQS     | Queued delivery                    |
| Search Index         | OpenSearch  | Optional MVP                       |
| Analytics            | Snowflake   | For event tracking, later phase   |

---

## 🌩 Serverless vs Pod Deployment Split

| Runtime        | Services                                                 |
|----------------|----------------------------------------------------------|
| **Pods**       | API Gateway, Product, Order, Inventory, Admin APIs       |
| **Serverless** | Payments, Notifications, Webhooks, Shipping              |
| **Managed AWS**| Cognito, SES, SNS, S3, CloudFront, DynamoDB              |

---

## ⚙️ Dev & Tooling

### Local Development Tools
- **Testcontainers**: Integration/E2E tests
- **LocalStack**: Simulate AWS services
- **Stripe CLI**: Mock payments
- **MailDev / Mailhog**: Mock email
- **Mock APIs**: Fake shipping, SMS, push

### Infrastructure
- **Terraform**: For K8s cluster, VPC, IAM, DBs
- **Serverless Framework**: For Lambda deployment
- **Docker**: Local dev environment

---

## 🔁 Sample Flow (Checkout)

1. User sends API call to `/checkout`
2. Order Service checks inventory
3. Payment Service triggers Stripe payment
4. On success, inventory is updated
5. Notification is sent (email/SMS)
6. Shipping label is generated

---

## 📦 Monorepo Setup

```
/apps
  /api-gateway
  /product
  /order
  /admin-api
  /user
  /inventory
  /frontend-admin
  /frontend-storefront
/packages
  /common
  /types
  /auth
  /notifications
/infrastructure
  /terraform
  /serverless
/docker
  /dev
  /test
```

---

## 📝 To-Do (Bootstrapping Phase)

- [ ] Setup Monorepo (Nx or Turbo)
- [ ] Bootstrap NestJS apps
- [ ] Setup Docker Compose + LocalStack
- [ ] Terraform scaffold for local + AWS
- [ ] Basic product + user APIs
- [ ] Simulate payments & shipping
- [ ] React admin panel + storefront

---

## 📈 Growth Path

- Add real-time analytics (Kinesis + Snowflake)
- Move high-throughput flows to DynamoDB
- Full-text search with OpenSearch
- CI/CD pipelines (GitHub Actions + CodeBuild)
- Real-time dashboard in admin (WebSocket or polling)
