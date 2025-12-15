using System.IO;
using DefenceCrm.Api.Contracts.Requests;
using DefenceCrm.Api.Data;
using DefenceCrm.Api.Models;
using DefenceCrm.Api.Validators;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.DataProtection;

var builder = WebApplication.CreateBuilder(args);

var dataDir = Path.Combine(AppContext.BaseDirectory, "data");
Directory.CreateDirectory(dataDir);
var dataProtectionDir = Path.Combine(dataDir, "keys");
Directory.CreateDirectory(dataProtectionDir);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
if (string.IsNullOrWhiteSpace(connectionString))
{
  connectionString = $"Data Source={Path.Combine(dataDir, "defence-crm.db")}";
}

builder.Services.AddDbContext<ApplicationDbContext>(options =>
  options.UseSqlite(connectionString));

builder.Services.AddDataProtection()
  .PersistKeysToFileSystem(new DirectoryInfo(dataProtectionDir));

builder.Services.AddIdentityCore<ApplicationUser>(options =>
  {
    options.User.RequireUniqueEmail = true;
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequiredLength = 12;
  })
  .AddEntityFrameworkStores<ApplicationDbContext>()
  .AddSignInManager()
  .AddDefaultTokenProviders();

builder.Services.AddSingleton(TimeProvider.System);
builder.Services.AddCors(options =>
{
  options.AddPolicy("FrontendCors", policy =>
  {
    policy
      .WithOrigins(
        "http://localhost:3000",
        "http://localhost:5173",
        "https://localhost:3000",
        "https://localhost:5173",
        "https://localhost:5001")
      .AllowAnyHeader()
      .AllowAnyMethod();
  });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
  options.SwaggerDoc("v1", new OpenApiInfo { Title = "Defence CRM API", Version = "v1" });
});

builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<SignupRequestValidator>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
  var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
  dbContext.Database.EnsureCreated();
}

if (app.Environment.IsDevelopment())
{
  app.UseDeveloperExceptionPage();
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("FrontendCors");
app.UseAuthorization();
app.MapControllers();
app.Run();
