using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

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

    var connectionString = configuration.GetConnectionString("DefaultConnection");
    if (string.IsNullOrWhiteSpace(connectionString))
    {
      var dataDir = Path.Combine(Directory.GetCurrentDirectory(), "data");
      Directory.CreateDirectory(dataDir);
      connectionString = $"Data Source={Path.Combine(dataDir, "defence-crm.db")}";
    }

    var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
    optionsBuilder.UseSqlite(connectionString);

    return new ApplicationDbContext(optionsBuilder.Options);
  }
}
