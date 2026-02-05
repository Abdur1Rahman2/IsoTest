# IsoTest AI - Backend

ASP.NET Core Web API built with **Clean Architecture** principles.

## Architecture Layers

- **IsoTestAI.Api**: Presentation layer (Controllers, Middleware)
- **IsoTestAI.Application**: Business logic, use cases, DTOs
- **IsoTestAI.Domain**: Core entities, interfaces, domain logic
- **IsoTestAI.Infrastructure**: Data access, external services, repositories

## Technology Stack

- .NET 8.0
- Entity Framework Core
- PostgreSQL
- Swagger/OpenAPI

## Setup

```bash
cd backend/src/IsoTestAI.Api
dotnet restore
dotnet run
```

API will be available at: `https://localhost:5001`

## Project Structure

```
backend/
??? src/
?   ??? IsoTestAI.Api/              # Web API entry point
?   ??? IsoTestAI.Application/      # Business logic & DTOs
?   ??? IsoTestAI.Domain/           # Domain entities & interfaces
?   ??? IsoTestAI.Infrastructure/   # Data access & external services
??? IsoTestAI.sln                   # Solution file
```

## Development

- API Documentation: `/swagger`
- Health Check: `/api/health`
