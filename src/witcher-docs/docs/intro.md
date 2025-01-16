# Witcher API Documentation

## Overview
Witcher API is a service providing comprehensive management of witcher items, including [sword management](./swordManagement.md), [oil management](./oilManagement.md), and [decoction management](./decoctionManagement.md). The API is available in three different implementations: REST, GraphQL, and gRPC.

## Base Configuration
- **REST API Base URL**: `http://localhost:8080`
- **GraphQL Endpoint**: `http://localhost:3000/graphql`
- **gRPC Server**: `localhost:9191`

## Available Resources
- **Swords** - Witcher swords management (silver and steel)
- **Oils** - Blade oils management
- **Decoctions** - Witcher decoctions (potions) management

## Security & Headers
All responses include the following security headers:

```http
Content-Type: application/json
X-Content-Type-Options: nosniff
Cache-Control: no-cache
Content-Security-Policy: script-src 'self' 'unsafe-eval'