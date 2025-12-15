
  # Defence SaaS CRM UI Design

  This is a code bundle for Defence SaaS CRM UI Design. The original project is available at https://www.figma.com/design/6T4QCiPudgufmFp6AypdX3/Defence-SaaS-CRM-UI-Design.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
  ## Backend (ASP.NET Core)
  - Install .NET 8 SDK.
  - From `backend/DefenceCrm.Api`, run `dotnet watch run` (Swagger at `/swagger` in Development).
  - Local DB: SQLite file under `backend/DefenceCrm.Api/data/`.
  
  ## Frontend ↔ API
  - Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` (e.g., `http://localhost:5000/api`).
  - Signup and ABN lookup use that base URL.
  
