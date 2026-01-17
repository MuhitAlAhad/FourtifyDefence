# Quick Reference Guide - Fourtify Defence

This is a quick reference for common tasks. For detailed documentation, see [HANDOVER_DOCUMENTATION.md](./HANDOVER_DOCUMENTATION.md).

## Common Commands

### Backend
```bash
# Navigate to backend
cd backend/DefenceCrm.Api

# Restore dependencies
dotnet restore

# Run development server
dotnet watch run

# Create migration
dotnet ef migrations add MigrationName

# Apply migrations
dotnet ef database update

# Build for production
dotnet publish -c Release
```

### Frontend
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Environment Variables Quick Setup

### Backend (appsettings.json or Environment Variables)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=...;Port=5432;Database=postgres;Username=...;Password=...;SslMode=Require"
  },
  "Resend": {
    "ApiKey": "re_...",
    "From": "Name <email@domain.com>"
  },
  "TwoCheckout": {
    "MerchantCode": "...",
    "WebhookSecret": "...",
    "Currency": "USD"
  },
  "Notifications": {
    "NewSignupRecipients": "admin@example.com"
  }
}
```

### Frontend (.env file)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## API Endpoints Quick Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/signin` | Sign in user |
| GET | `/api/auth/confirm-email` | Confirm email address |
| POST | `/api/auth/resend-confirmation` | Resend confirmation email |
| POST | `/api/questionnaires` | Submit questionnaire |
| POST | `/api/questionnaires/qualification` | Submit qualification |
| POST | `/api/questionnaires/webhook/2checkout` | 2Checkout webhook |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/abn/{abn}` | Lookup ABN |

## Key File Locations

### Backend
- Entry Point: `backend/DefenceCrm.Api/Program.cs`
- Controllers: `backend/DefenceCrm.Api/Controllers/`
- Models: `backend/DefenceCrm.Api/Models/`
- Services: `backend/DefenceCrm.Api/Services/`
- Database Context: `backend/DefenceCrm.Api/Data/ApplicationDbContext.cs`

### Frontend
- Entry Point: `src/main.tsx`
- Routes: `src/App.tsx`
- Services: `src/services/`
- Components: `src/components/`
- UI Components: `src/components/ui/`

## Development URLs

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000 or https://localhost:5001
- Swagger UI: http://localhost:5000/swagger (Development only)

## Troubleshooting Quick Fixes

### Backend won't start
1. Check connection string is set
2. Verify database is accessible
3. Check port is not in use

### Frontend can't connect to API
1. Verify `VITE_API_BASE_URL` is set correctly
2. Check backend is running
3. Verify CORS is configured

### Emails not sending
1. Check Resend API key is valid
2. Verify `Resend__From` format: `"Name <email@domain.com>"`
3. Check application logs

### Database errors
1. Verify connection string format
2. Check database user permissions
3. Run migrations: `dotnet ef database update`

## Testing Checklist

- [ ] User can sign up
- [ ] Confirmation email is received
- [ ] User can confirm email
- [ ] User can sign in after confirmation
- [ ] ABN lookup works
- [ ] Questionnaire submission works
- [ ] Payment URL is generated
- [ ] Contact form submission works
- [ ] Protected routes require authentication

## Deployment Checklist

### Backend
- [ ] Environment variables configured
- [ ] Database connection string set
- [ ] CORS origins updated
- [ ] Migrations applied
- [ ] Email service configured
- [ ] Payment gateway configured

### Frontend
- [ ] `VITE_API_BASE_URL` set to production API
- [ ] Build completes successfully
- [ ] Environment variables set in hosting platform
- [ ] Custom domain configured (if applicable)

