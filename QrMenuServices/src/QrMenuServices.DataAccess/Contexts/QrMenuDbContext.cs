using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using QrMenuServices.Models.Entities;
using System.Reflection;

namespace QrMenuServices.DataAccess.Contexts;

#nullable disable
public class QrMenuDbContext : IdentityDbContext<User, IdentityRole<string>, string>
{
    public QrMenuDbContext(DbContextOptions<QrMenuDbContext> options) : base(options)
    {

    }

    public DbSet<Category> Categories { get; set; }
    public DbSet<Company> Companies { get; set; }
    public DbSet<Product> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}