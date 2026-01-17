# Fourtify Defence - Handover Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Backend Setup & Configuration](#backend-setup--configuration)
5. [Frontend Setup & Configuration](#frontend-setup--configuration)
6. [Database Setup](#database-setup)
7. [Environment Variables](#environment-variables)
8. [API Endpoints](#api-endpoints)
9. [Authentication & Authorization](#authentication--authorization)
10. [Payment Integration](#payment-integration)
11. [Email Service](#email-service)
12. [Development Workflow](#development-workflow)
13. [Deployment](#deployment)
14. [Key Files & Their Purpose](#key-files--their-purpose)
15. [Troubleshooting](#troubleshooting)

---

## Project Overview

**Fourtify Defence** is a SaaS CRM platform designed for Defence Industry Security Program (DISP) members. The application helps organizations manage their DISP readiness, qualifications, and subscriptions.

### Key Features
- User authentication with email confirmation
- Company qualification questionnaire
- ABN (Australian Business Number) lookup and validation
- Payment processing via 2Checkout
- Contact form submissions
- Admin notifications
- Protected routes for authenticated users

### Architecture
- **Backend**: ASP.NET Core 8.0 Web API (C#)
- **Frontend**: React 18 with TypeScript, Vite
- **Database**: PostgreSQL (Supabase)
- **Email Service**: Resend API
- **Payment Gateway**: 2Checkout
- **Deployment**: 
  - Backend: Render (or Docker)
  - Frontend: Vercel

---

## Technology Stack

### Backend
- **.NET 8.0** - Framework
- **ASP.NET Core Web API** - Web framework
- **Entity Framework Core 8.0.8** - ORM
- **Npgsql.EntityFrameworkCore.PostgreSQL 8.0.8** - PostgreSQL provider
- **Microsoft.AspNetCore.Identity** - Authentication & authorization
- **FluentValidation.AspNetCore 11.3.1** - Request validation
- **Swashbuckle.AspNetCore 6.6.2** - Swagger/OpenAPI documentation

### Frontend
- **React 18.3.1** - UI library
- **TypeScript** - Type safety
- **Vite 6.3.5** - Build tool and dev server
- **React Router DOM** - Routing
- **React Hook Form 7.55.0** - Form management
- **Tailwind CSS** - Styling
- **Radix UI** - UI component primitives
- **Lucide React** - Icons
- **Sonner** - Toast notifications

---

## Project Structure

```
FourtifyDefence/
├── backend/
│   └── DefenceCrm.Api/
│       ├── Controllers/          # API endpoints
│       ├── Contracts/            # Request/Response DTOs
│       ├── Data/                 # DbContext and configurations
│       ├── Migrations/           # EF Core migrations
│       ├── Models/              # Domain models
│       ├── Services/             # Business logic services
│       ├── Validators/           # FluentValidation validators
│       ├── Program.cs            # Application entry point
│       ├── appsettings.json      # Configuration
│       └── Dockerfile            # Docker configuration
├── src/
│   ├── components/               # React components
│   │   ├── ui/                  # Reusable UI components
│   │   └── ...                  # Page components
│   ├── services/                # API service clients
│   ├── styles/                  # Global styles
│   ├── assets/                  # Static assets
│   ├── App.tsx                  # Root component
│   └── main.tsx                 # Entry point
├── public/                      # Public assets
├── package.json                 # Frontend dependencies
├── vite.config.ts               # Vite configuration
├── vercel.json                  # Vercel deployment config
└── global.json                  # .NET SDK version lock
```

---

## Backend Setup & Configuration

### Prerequisites
1. **.NET 8.0 SDK** - Install from [dotnet.microsoft.com](https://dotnet.microsoft.com/download)
2. **PostgreSQL Database** - Supabase instance or local PostgreSQL
3. **Resend API Key** - For email services ([resend.com](https://resend.com))
4. **2Checkout Account** - For payment processing

### Installation Steps

1. **Navigate to backend directory:**
   ```bash
   cd backend/DefenceCrm.Api
   ```

2. **Restore dependencies:**
   ```bash
   dotnet restore
   ```

3. **Configure connection string** (see [Environment Variables](#environment-variables))

4. **Run the application:**
   ```bash
   dotnet watch run
   ```
   
   Or for production:
   ```bash
   dotnet run
   ```

5. **Access Swagger UI** (Development only):
   - URL: `https://localhost:5001/swagger` or `http://localhost:5000/swagger`

### Database Migrations

The application uses Entity Framework Core migrations. The database schema is automatically created on first run via `EnsureCreated()`. For production, use migrations:

1. **Install EF Core tools** (if not already installed):
   ```bash
   dotnet tool install --global dotnet-ef
   ```

2. **Create a new migration:**
   ```bash
   dotnet ef migrations add MigrationName
   ```

3. **Apply migrations:**
   ```bash
   dotnet ef database update
   ```

### Docker Setup

The backend includes a `Dockerfile` for containerized deployment:

```bash
# Build the image
docker build -t defencecrm-api -f backend/DefenceCrm.Api/Dockerfile backend/DefenceCrm.Api

# Run the container
docker run -p 8080:8080 \
  -e ConnectionStrings__DefaultConnection="your-connection-string" \
  -e Resend__ApiKey="your-api-key" \
  defencecrm-api
```

---

## Frontend Setup & Configuration

### Prerequisites
1. **Node.js 18+** - Install from [nodejs.org](https://nodejs.org/)
2. **npm** or **yarn** - Package manager

### Installation Steps

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment file:**
   - Copy `.env.example` to `.env` (if exists) or create `.env`
   - Set `VITE_API_BASE_URL` (see [Environment Variables](#environment-variables))

3. **Start development server:**
   ```bash
   npm run dev
   ```
   
   The app will open at `http://localhost:3000`

4. **Build for production:**
   ```bash
   npm run build
   ```
   
   Output will be in the `build/` directory

### Vite Configuration

The frontend uses Vite with React. Key configuration in `vite.config.ts`:
- Development server runs on port 3000
- Path aliases configured for cleaner imports (`@/` maps to `src/`)
- Special handling for Figma asset imports

---

## Database Setup

### Database Provider
- **PostgreSQL** (via Supabase or self-hosted)

### Connection String Format
```
Host=your-host;Port=5432;Database=postgres;Username=your-username;Password=your-password;SslMode=Require;Trust Server Certificate=true
```

### Database Schema

#### Tables Created by EF Core Identity:
- `AspNetUsers` - User accounts
- `AspNetRoles` - User roles
- `AspNetUserRoles` - User-role mappings
- `AspNetUserClaims`, `AspNetRoleClaims` - Claims
- `AspNetUserLogins`, `AspNetUserTokens` - External auth tokens

#### Application Tables:
- `QuestionnaireSubmissions` - Qualification and subscription questionnaires
- `ContactSubmissions` - Contact form submissions

### Models

**ApplicationUser** (extends IdentityUser):
- `Id` (string) - User ID
- `Email` (string) - Email address
- `FullName` (string?) - User's full name
- `EmailConfirmed` (bool) - Email confirmation status

**QuestionnaireSubmission**:
- `Id` (Guid) - Unique identifier
- `CreatedAt` (DateTimeOffset) - Creation timestamp
- Company information: `CompanyName`, `Abn`, `CompanySize`, `Industry`
- Contact information: `ContactName`, `ContactEmail`, `ContactPhone`
- Defence-specific: `DefenceIndustry`, `DispMember`, `GovernmentPanels`
- CSO/SO: `NominatedCso`, `NominatedSo`, `CsoNotSure`, `SoNotSure`
- Admin: `AdminFirstName`, `AdminLastName`, `AdminEmail`, `AdminPhone`
- Subscription: `Plan`, `Status`, `SubmittedVia`

**ContactSubmission**:
- `Id` (Guid)
- `CreatedAt` (DateTimeOffset)
- `FirstName`, `LastName`, `CompanyName`
- `Email`, `Phone`
- `EmployeeRange` (optional)
- `Requirements` (text)
- `Consent` (bool)

---

## Environment Variables

### Backend Environment Variables

Set these via environment variables or `appsettings.json`:

#### Database
- `ConnectionStrings__DefaultConnection` - PostgreSQL connection string
- OR `SUPABASE_DB_CONNECTION_STRING` - Alternative connection string variable

#### Email (Resend)
- `Resend__ApiKey` - Resend API key
- `Resend__From` - Sender email (format: `"Name <email@domain.com>"`)
- `Resend__ConfirmationLinkBaseUrl` - Base URL for email confirmation links (optional)
- `Resend__ConfirmationLinkPath` - Path for confirmation endpoint (default: `/api/auth/confirm-email`)
- `Resend__ConfirmationRedirectUrl` - Redirect URL after email confirmation (optional)

#### Payment (2Checkout)
- `TwoCheckout__MerchantCode` - 2Checkout merchant code
- `TwoCheckout__WebhookSecret` - Secret for webhook validation
- `TwoCheckout__Currency` - Currency code (e.g., "USD")

#### Notifications
- `Notifications__NewSignupRecipients` - Comma-separated admin email addresses
- `Notifications__WebsiteLink` - Website URL (optional)
- `Notifications__DemoLink` - Demo page URL (optional)

#### Email Attachments
- `EmailDemoVideoAttachment__FileName` - Video filename (e.g., "workingFine.mp4")
- `EmailDemoVideoAttachment__VideoFormat` - MIME type (e.g., "video/mp4")

#### App Configuration
- `AppConfig__FrontendUrl` - Frontend URL for redirects

### Frontend Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://your-api.onrender.com/api
```

For local development:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

**Note**: Vite requires the `VITE_` prefix for environment variables to be exposed to the client.

---

## API Endpoints

### Authentication (`/api/auth`)

#### POST `/api/auth/signup`
Register a new user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "fullName": "John Doe"
}
```

**Response:** `201 Created`
```json
{
  "userId": "guid",
  "email": "user@example.com",
  "fullName": "John Doe"
}
```

#### POST `/api/auth/signin`
Sign in an existing user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response:** `200 OK`
```json
{
  "userId": "guid",
  "email": "user@example.com",
  "fullName": "John Doe"
}
```

**Errors:**
- `401 Unauthorized` - Invalid credentials
- `403 Forbidden` - Email not confirmed

#### GET `/api/auth/confirm-email`
Confirm email address.

**Query Parameters:**
- `userId` - User ID
- `token` - Confirmation token

**Response:** `200 OK` or redirects to `Resend__ConfirmationRedirectUrl`

#### POST `/api/auth/resend-confirmation`
Resend confirmation email.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:** `200 OK`

### Questionnaires (`/api/questionnaires`)

#### POST `/api/questionnaires`
Submit a questionnaire (subscription form).

**Request:** See `QuestionnaireSubmissionRequest` contract

**Response:** `201 Created`
```json
{
  "id": "guid",
  "paymentUrl": "https://secure.2checkout.com/..."
}
```

#### POST `/api/questionnaires/qualification`
Submit a qualification form.

**Request:** See `QualificationSubmissionRequest` contract

**Response:** `201 Created`
```json
{
  "id": "guid"
}
```

#### GET `/api/questionnaires/complete-qualification`
Get qualification details by entity ID.

**Query Parameters:**
- `entityId` - Questionnaire submission ID

**Response:** `200 OK` - QuestionnaireSubmission object

#### POST `/api/questionnaires/webhook/2checkout`
2Checkout payment webhook.

**Request:** TwoCheckoutWebhook payload

**Response:** `200 OK` or `401 Unauthorized` (invalid signature)

### Contact (`/api/contact`)

#### POST `/api/contact`
Submit a contact form.

**Request:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "companyName": "Acme Corp",
  "email": "john@acme.com",
  "phone": "+1234567890",
  "employeeRange": "10-50",
  "requirements": "Looking for DISP compliance solution",
  "consent": true
}
```

**Response:** `201 Created`
```json
{
  "id": "guid"
}
```

### ABN Lookup (`/api/abn`)

#### GET `/api/abn/{abn}`
Lookup Australian Business Number.

**Parameters:**
- `abn` - 11-digit ABN (can include spaces/dashes)

**Response:** `200 OK`
```json
{
  "abn": "12345678901",
  "entityName": "Company Name",
  "status": "Active"
}
```

**Errors:**
- `400 Bad Request` - Invalid ABN format
- `404 Not Found` - ABN not found

**Note**: Currently returns mocked data. Replace with actual ABN lookup service.

---

## Authentication & Authorization

### Authentication Flow

1. **Signup:**
   - User registers with email, password, and full name
   - Password must meet requirements (12+ chars, uppercase, lowercase, digit, special char)
   - Confirmation email sent automatically
   - User cannot sign in until email is confirmed

2. **Email Confirmation:**
   - User clicks link in email
   - Backend validates token and confirms email
   - Verification email sent
   - Admin notification sent (if configured)
   - User redirected to login or specified URL

3. **Sign In:**
   - User provides email and password
   - Backend validates credentials
   - Returns user information if successful
   - Frontend stores authentication state in `localStorage`

### Password Requirements

Configured in `Program.cs`:
- Minimum length: 12 characters
- Require digit: Yes
- Require lowercase: Yes
- Require uppercase: Yes
- Require non-alphanumeric: Yes

### Frontend Authentication

- Authentication state stored in `localStorage` as `isAuthenticated`
- Protected routes use `ProtectedRoute` component
- Routes can require subscription: `<ProtectedRoute requireSubscription>`

### Protected Routes

Frontend routes that require authentication:
- `/dashboard`
- `/disp-readiness`
- `/account`
- `/coming-soon`

---

## Payment Integration

### 2Checkout Integration

The application uses 2Checkout for payment processing.

#### Configuration
- Merchant Code: Set via `TwoCheckout__MerchantCode`
- Currency: Set via `TwoCheckout__Currency` (default: "USD")
- Webhook Secret: Set via `TwoCheckout__WebhookSecret`

#### Payment Flow

1. **Initiate Payment:**
   - User submits questionnaire
   - Backend creates payment URL via `Checkout2PaymentGateway.SendPaymentAsync()`
   - Returns URL to frontend
   - User redirected to 2Checkout payment page

2. **Payment Return:**
   - After payment, user redirected to `/checkout2PaymentReturn`
   - Frontend component `Checkout2Payment` handles return

3. **Webhook Processing:**
   - 2Checkout sends webhook to `/api/questionnaires/webhook/2checkout`
   - Backend validates webhook signature using HMAC-SHA256
   - Updates questionnaire status:
     - `PAYMENT_COMPLETED` → Status = "Paid"
     - `PAYMENT_FAILED` → Status = "Failed"

#### Webhook Security

Webhook signature validation:
```csharp
HMACSHA256(EntityId + Status, WebhookSecret) == Signature
```

#### Payment Amount

Currently hardcoded to `2099.00` in `QuestionnairesController.Submit()`. Update as needed.

---

## Email Service

### Resend Integration

The application uses Resend API for sending emails.

#### Email Types

1. **Confirmation Email:**
   - Sent after user signup
   - Contains confirmation link
   - Link format: `{BaseUrl}/api/auth/confirm-email?userId={userId}&token={token}`

2. **Verification Email:**
   - Sent after email confirmation
   - Contains welcome message and links

3. **Admin Notifications:**
   - New user signup
   - New questionnaire submission
   - New contact submission
   - Can include video attachments (for qualification submissions)

4. **Qualification Completion Email:**
   - Sent when user confirms email from qualification form
   - Contains subscription completion link

#### Email Configuration

Configure in `appsettings.json` or environment variables:
```json
{
  "Resend": {
    "ApiKey": "re_...",
    "From": "Fourtify Defence <noreply@yourdomain.com>",
    "ConfirmationLinkBaseUrl": "https://your-api.onrender.com",
    "ConfirmationLinkPath": "/api/auth/confirm-email",
    "ConfirmationRedirectUrl": "https://your-frontend.com/login"
  }
}
```

#### Video Attachments

For qualification submissions, a demo video can be attached:
- Configure filename and MIME type in `appsettings.json`
- Video file must be in the backend root directory
- Attached to admin notification emails

---

## Development Workflow

### Backend Development

1. **Start Development Server:**
   ```bash
   cd backend/DefenceCrm.Api
   dotnet watch run
   ```

2. **Access Swagger:**
   - Navigate to `/swagger` endpoint
   - Test API endpoints interactively

3. **Database Changes:**
   - Modify models in `Models/` directory
   - Create migration: `dotnet ef migrations add MigrationName`
   - Apply: `dotnet ef database update`

4. **Add New Endpoint:**
   - Create controller in `Controllers/`
   - Add route: `[Route("api/your-endpoint")]`
   - Define request/response contracts in `Contracts/`
   - Add validation in `Validators/` (if needed)

### Frontend Development

1. **Start Development Server:**
   ```bash
   npm run dev
   ```

2. **Create New Component:**
   - Add to `src/components/`
   - Use TypeScript for type safety
   - Follow existing component patterns

3. **Add New Route:**
   - Update `src/App.tsx`
   - Import component
   - Add `<Route>` entry

4. **API Integration:**
   - Add service function in `src/services/`
   - Use `request<T>()` helper from `auth.ts`
   - Handle errors appropriately

### Code Style

- **Backend**: Follow C# conventions, use dependency injection
- **Frontend**: Use functional components with hooks, TypeScript strict mode
- **Naming**: PascalCase for C#, camelCase for TypeScript/JavaScript

---

## Deployment

### Backend Deployment (Render)

1. **Connect Repository:**
   - Link GitHub/GitLab repository to Render

2. **Create Web Service:**
   - Runtime: `.NET`
   - Build Command: `cd backend/DefenceCrm.Api && dotnet publish -c Release -o ./publish`
   - Start Command: `cd backend/DefenceCrm.Api && dotnet ./publish/DefenceCrm.Api.dll`

3. **Set Environment Variables:**
   - Add all required environment variables (see [Environment Variables](#environment-variables))
   - Set `ASPNETCORE_ENVIRONMENT=Production`

4. **Database:**
   - Use Supabase PostgreSQL connection string
   - Ensure migrations are applied

### Backend Deployment (Docker)

1. **Build Image:**
   ```bash
   docker build -t defencecrm-api -f backend/DefenceCrm.Api/Dockerfile backend/DefenceCrm.Api
   ```

2. **Run Container:**
   ```bash
   docker run -d -p 8080:8080 \
     -e ConnectionStrings__DefaultConnection="..." \
     -e Resend__ApiKey="..." \
     -e Resend__From="..." \
     defencecrm-api
   ```

### Frontend Deployment (Vercel)

1. **Connect Repository:**
   - Import project from GitHub/GitLab

2. **Configure Build:**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `build`

3. **Set Environment Variables:**
   - `VITE_API_BASE_URL` - Your backend API URL

4. **Deploy:**
   - Vercel automatically deploys on push to main branch

### CORS Configuration

Backend CORS is configured in `Program.cs`. Add your frontend domain to allowed origins:
```csharp
.WithOrigins(
  "https://your-frontend.com",
  "https://www.your-frontend.com"
)
```

---

## Key Files & Their Purpose

### Backend

#### `Program.cs`
- Application entry point
- Service registration (DI)
- Middleware configuration
- CORS setup
- Database initialization

#### `ApplicationDbContext.cs`
- EF Core database context
- DbSet definitions
- Model configurations

#### Controllers
- `AuthController.cs` - Authentication endpoints
- `QuestionnairesController.cs` - Questionnaire and payment handling
- `ContactController.cs` - Contact form submissions
- `AbnController.cs` - ABN lookup and validation

#### Services
- `ResendEmailSender.cs` - Email sending via Resend API
- `Checkout2PaymentGateway.cs` - 2Checkout payment URL generation

#### Models
- `ApplicationUser.cs` - User model (extends IdentityUser)
- `QuestionnaireSubmission.cs` - Questionnaire data model
- `ContactSubmission.cs` - Contact form data model
- `TwoCheckoutWebhook.cs` - Webhook payload model

### Frontend

#### `App.tsx`
- Root component
- Route definitions
- Authentication routing logic

#### `main.tsx`
- Application entry point
- React root rendering

#### Services (`src/services/`)
- `auth.ts` - Authentication API calls
- `questionnaire.ts` - Questionnaire API calls
- `contact.ts` - Contact form API calls

#### Components
- `LoginPage.tsx` - User login
- `RegisterPage.tsx` - User registration
- `QualificationPage.tsx` - Qualification form
- `SubscribePage.tsx` - Subscription form
- `PaymentPage.tsx` - Payment processing
- `ContactPage.tsx` - Contact form
- `ProtectedRoute.tsx` - Route protection wrapper
- `Dashboard.tsx` - User dashboard
- `DISPReadiness.tsx` - DISP readiness page
- `AccountBilling.tsx` - Account and billing

#### UI Components (`src/components/ui/`)
- Reusable Radix UI components
- Tailwind CSS styled
- Follow shadcn/ui patterns

---

## Troubleshooting

### Backend Issues

#### Database Connection Failed
- **Symptom**: Application fails to start, connection string error
- **Solution**: 
  - Verify connection string format
  - Check database server is accessible
  - Ensure SSL settings are correct for Supabase

#### Email Not Sending
- **Symptom**: No emails received
- **Solution**:
  - Verify `Resend__ApiKey` is set correctly
  - Check `Resend__From` format: `"Name <email@domain.com>"`
  - Check application logs for email errors
  - Verify Resend API key has proper permissions

#### Migration Errors
- **Symptom**: Database schema not created or migration fails
- **Solution**:
  - Ensure connection string is correct
  - Check database user has CREATE TABLE permissions
  - Try `dotnet ef database update` manually
  - Check migration files for errors

#### CORS Errors
- **Symptom**: Frontend cannot call API
- **Solution**:
  - Add frontend URL to CORS allowed origins in `Program.cs`
  - Ensure CORS middleware is before `UseAuthorization()`
  - Check browser console for specific CORS error

### Frontend Issues

#### API Calls Failing
- **Symptom**: Network errors or 404s
- **Solution**:
  - Verify `VITE_API_BASE_URL` is set correctly
  - Check backend is running and accessible
  - Verify CORS is configured on backend
  - Check browser network tab for actual request URL

#### Build Errors
- **Symptom**: `npm run build` fails
- **Solution**:
  - Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
  - Check TypeScript errors: `npx tsc --noEmit`
  - Verify all dependencies are compatible

#### Authentication Not Persisting
- **Symptom**: User logged out on page refresh
- **Solution**:
  - Check `localStorage` is not being cleared
  - Verify authentication state is saved after login
  - Check browser console for errors

### Payment Issues

#### Payment URL Not Generated
- **Symptom**: No payment URL returned
- **Solution**:
  - Verify `TwoCheckout__MerchantCode` is set
  - Check `TwoCheckout__Currency` is valid
  - Review `Checkout2PaymentGateway` logs

#### Webhook Not Working
- **Symptom**: Payment status not updating
- **Solution**:
  - Verify webhook URL is correct in 2Checkout dashboard
  - Check `TwoCheckout__WebhookSecret` matches 2Checkout configuration
  - Review webhook signature validation logic
  - Check application logs for webhook requests

### General Issues

#### Port Already in Use
- **Symptom**: Cannot start server, port in use
- **Solution**:
  - Backend: Change port in `launchSettings.json` or use `--urls` flag
  - Frontend: Change port in `vite.config.ts` server.port

#### Environment Variables Not Loading
- **Symptom**: Configuration values are null
- **Solution**:
  - Verify environment variable names (case-sensitive, double underscores for nested)
  - Check `.env` file is in correct location
  - Restart development server after changing `.env`
  - For production, verify environment variables are set in hosting platform

---

## Additional Resources

### Documentation Links
- [ASP.NET Core Documentation](https://docs.microsoft.com/aspnet/core)
- [Entity Framework Core](https://docs.microsoft.com/ef/core)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Resend API Documentation](https://resend.com/docs)
- [2Checkout Documentation](https://knowledgecenter.2checkout.com)

### Support Contacts
- **Project Repository**: [Add repository URL]
- **Issue Tracker**: [Add issue tracker URL]
- **Team Contact**: [Add contact information]

---

## Quick Start Checklist

For a new developer starting on this project:

- [ ] Install .NET 8.0 SDK
- [ ] Install Node.js 18+
- [ ] Clone the repository
- [ ] Set up PostgreSQL database (Supabase recommended)
- [ ] Configure backend environment variables
- [ ] Run `dotnet restore` in `backend/DefenceCrm.Api`
- [ ] Run `dotnet watch run` to start backend
- [ ] Verify Swagger UI is accessible
- [ ] Run `npm install` in root directory
- [ ] Create `.env` file with `VITE_API_BASE_URL`
- [ ] Run `npm run dev` to start frontend
- [ ] Verify frontend loads at `http://localhost:3000`
- [ ] Test signup flow end-to-end
- [ ] Review API endpoints in Swagger
- [ ] Read through key component files
- [ ] Set up Resend API key for email testing
- [ ] Configure 2Checkout for payment testing (sandbox mode)

---

**Document Version**: 1.0  
**Last Updated**: [Current Date]  
**Maintained By**: [Team Name]

