<div align="center">

# 🔮 Hybrid Tri-Protocol Mesh — GraphQL, REST & Socket.IO
### *Assignment 18 — Declarative GraphQL Queries, Real-Time WebSockets & Modular Express Core*

[![GraphQL](https://img.shields.io/badge/GraphQL-v17.0-E10098?style=for-the-badge&logo=graphql&logoColor=white)](https://graphql.org/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-Real--Time-010101?style=for-the-badge&logo=socketdotio&logoColor=white)](https://socket.io/)
[![Express](https://img.shields.io/badge/Express-REST%20API-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Redis](https://img.shields.io/badge/Redis-In--Memory-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)

<p align="center">
A sophisticated multi-protocol backend architecture unifying <b>Declarative GraphQL Queries</b>, <b>Event-Driven Socket.IO WebSockets</b>, and <b>RESTful CRUD Controllers</b> under an enterprise-grade TypeScript & Mongoose engine.
</p>

---

</div>

## 🌐 Tri-Protocol Communication Matrix

Assignment 18 implements a unified server where three distinct paradigms operate harmoniously:

| Protocol | Mount Point | Ideal Use Case | Tech / Handler |
| :--- | :--- | :--- | :--- |
| **GraphQL** | `/graphql` | Flexible data fetching, avoiding over/under-fetching on profiles & chats | `graphql-http` + `GraphQLSchema` |
| **WebSockets** | `ws://:port` | Sub-millisecond direct messages, typing broadcasts, status updates | `socket.io` Gateway |
| **REST API** | `/api/v1/*` | Strict CRUD operations, authentication, file handling, & webhooks | Express Routers + Zod |

---

## 📐 GraphQL Schema & Query Playground

The GraphQL endpoint supports token-based context passing (`req.raw.headers.authorization`) to protect private user queries and chat records.

### Sample User Query
```graphql
query GetUserProfile {
  getUser {
    id
    name
    email
    phone
    isOnline
    createdAt
  }
}
```

### Sample Chat History Query
```graphql
query GetChatHistory($conversationId: ID!) {
  getChat(conversationId: $conversationId) {
    id
    sender {
      id
      name
    }
    content
    createdAt
  }
}
```

---

## 🏗️ Architecture Blueprint

```
                      ┌───────────────────────────────┐
                      │          HTTP Request         │
                      └──────────────┬────────────────┘
                                     │
                     ┌───────────────▼───────────────┐
                     │   Global Morgan & CORS Layer  │
                     └───────────────┬───────────────┘
                                     │
           ┌─────────────────────────┼─────────────────────────┐
           ▼                         ▼                         ▼
┌────────────────────┐    ┌────────────────────┐    ┌────────────────────┐
│    REST Routers    │    │  GraphQL Endpoint  │    │  Socket.IO Gateway │
│  /auth, /user,     │    │     `/graphql`     │    │  `initializeIo()`  │
│  /post, /comment   │    │  (Schema Resolvers)│    │  (Bi-directional)  │
└──────────┬─────────┘    └──────────┬─────────┘    └──────────┬─────────┘
           │                         │                         │
           └─────────────────────────┼─────────────────────────┘
                                     │
                      ┌──────────────▼──────────────┐
                      │   DB & Persistence Fabric   │
                      │   • Redis Client (Cache)    │
                      │   • Mongoose 9 (MongoDB)    │
                      └─────────────────────────────┘
```

---

## 📁 Repository Organization

```bash
Assignment-18/
├── client/                      # Vanilla Chat Client
│   ├── index.html               # Multi-panel chat interface
│   ├── style.css                # Polished dark UI styling
│   └── script.js                # Integrated WebSocket client
└── server/                      # Tri-Protocol Node.js Server
    └── src/
        ├── DB/                  # Database connections (MongoDB & Redis)
        ├── middleware/          # Authentication & Zod validation
        ├── modules/
        │   ├── auth/            # Sign-up, Sign-in, OTP verification
        │   ├── chat/            # Chat models, sockets, AND GraphQL queries
        │   ├── comment/         # Comments engine
        │   ├── friendRequests/  # Social networking & requests
        │   ├── gateway/         # Socket.IO gateway initialization
        │   ├── graphQl/         # Root schema composition & GraphQL types
        │   ├── post/            # Post publications & media
        │   └── user/            # User model, controller, AND GraphQL resolver
        ├── utils/               # Encryption, hashing, tokens, & exceptions
        ├── bootstrap.ts         # Unified server mount (REST + GraphQL + WS)
        └── index.ts             # Application entry point
```

---

## 🚦 Quickstart & Testing

### 1. Configure Server
Ensure your environment file `server/config/.env` contains:
```env
PORT=3000
DB_URI=mongodb://127.0.0.1:27017/social_mesh_v3
REDIS_URL=redis://127.0.0.1:6379
JWT_SECRET=super_secret_jwt_key
ENCRYPTION_KEY=32_character_aes_secret_key
```

### 2. Start Server
```bash
cd Assignment-18/server
npm install

# Run compiler and development server
npm run start:build
npm run start:dev
```

### 3. Test GraphQL
Open Postman, Altair, or cURL and send a `POST` request to `http://localhost:3000/graphql` with your Bearer token in the `Authorization` header.

---

<div align="center">

### 👨‍💻 Designed & Developed By

<br/>

**Jason Hany**  
*Full-Stack & Systems Architecture Engineer*

[![GraphQL Specialist](https://img.shields.io/badge/Expertise-GraphQL%20%26%20WebSockets-E10098?style=flat-square)](#)

<sub>Constructed with clean separation of concerns, high throughput, and modern API standards.</sub>

</div>
