using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using Npgsql.EntityFrameworkCore.PostgreSQL;

namespace DefenceCrm.Api.Data;

// Used by EF Core CLI to create the DbContext at design-time without needing the full host.
public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
{
  public ApplicationDbContext CreateDbContext(string[] args)
  {
    var configuration = new ConfigurationBuilder()
      .SetBasePath(Directory.GetCurrentDirectory())
      .AddJsonFile("appsettings.json", optional: true)
      .AddEnvironmentVariables()
      .Build();

    var connectionString = configuration.GetConnectionString("DefaultConnection")
      ?? configuration["SUPABASE_DB_CONNECTION_STRING"];

    if (string.IsNullOrWhiteSpace(connectionString))
    {
      throw new InvalidOperationException("Database connection string missing. Set ConnectionStrings__DefaultConnection or SUPABASE_DB_CONNECTION_STRING.");
    }

    var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
    optionsBuilder.UseNpgsql(connectionString);

    return new ApplicationDbContext(optionsBuilder.Options);
  }
}
