
  # Defence SaaS CRM UI Design

  This is a code bundle for Defence SaaS CRM UI Design. The original project is available at https://www.figma.com/design/6T4QCiPudgufmFp6AypdX3/Defence-SaaS-CRM-UI-Design.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
  ## Backend (ASP.NET Core + Supabase Postgres)
  - Install .NET 8 SDK.
  - Provision a Supabase Postgres instance and grab the full connection string (e.g., `Host=...supabase.co;Port=5432;Database=postgres;Username=postgres;Password=...;SslMode=Require;Trust Server Certificate=true`).
  - Set the connection string via `ConnectionStrings__DefaultConnection` **or** `SUPABASE_DB_CONNECTION_STRING`.  
    - Local run: `ConnectionStrings__DefaultConnection="your-connection-string" dotnet watch run` from `backend/DefenceCrm.Api` (Swagger at `/swagger` in Development).
    - Render: add the same env var in the Render service dashboard so the API uses Supabase instead of SQLite.
  - The app will create the schema on first run. To apply migrations manually instead, install `dotnet-ef` and run `dotnet ef database update` with the connection string set.
  - Email confirmation uses Resend (recommended):  
    - `Resend__ApiKey`, `Resend__From` (e.g., `Your Name <noreply@yourdomain.com>`), optional `Resend__ConfirmationLinkBaseUrl` (e.g., `https://your-api.onrender.com`).  
    - Optional path override for the link: `Resend__ConfirmationLinkPath` (e.g., `/confirm-email` if you proxy through the frontend).  
    - Optional redirect after confirming: `Resend__ConfirmationRedirectUrl` (e.g., `https://your-frontend.com/login`).
    - Optional admin notifications on new signup: `Notifications__NewSignupRecipients` (comma-separated list, e.g., `dani@fourd.com.au`).
    - Users can resend confirmation via `POST /api/auth/resend-confirmation` with `{ "email": "user@example.com" }`.
    - If you prefer SMTP instead, swap the email sender implementation and set the corresponding SMTP vars.
  
  ## Frontend ↔ API (Vercel → Render)
  - Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` to your Render API base (e.g., `https://your-api.onrender.com/api`).
  - Set the same `VITE_API_BASE_URL` environment variable in Vercel so client-side calls hit the Render backend (signup and ABN lookup use this).
  
