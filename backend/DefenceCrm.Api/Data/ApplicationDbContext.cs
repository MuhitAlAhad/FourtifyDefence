using DefenceCrm.Api.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DefenceCrm.Api.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
  : IdentityDbContext<ApplicationUser>(options)
{
  public DbSet<QuestionnaireSubmission> QuestionnaireSubmissions => Set<QuestionnaireSubmission>();
  public DbSet<ContactSubmission> ContactSubmissions => Set<ContactSubmission>();

  protected override void OnModelCreating(ModelBuilder builder)
  {
    base.OnModelCreating(builder);
    builder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
  }
}
