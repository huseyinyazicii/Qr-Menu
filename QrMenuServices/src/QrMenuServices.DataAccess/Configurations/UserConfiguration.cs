using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QrMenuServices.Models.Entities;

namespace QrMenuServices.DataAccess.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder
            .Property(x => x.Name)
            .HasMaxLength(100)
            .IsRequired();

        var admin = new User
        {
            Id = "6cc8150f-e336-4204-9eb6-de9636c00765",
            Name = "Admin",
            UserName = "Admin",
            NormalizedUserName = "ADMIN",
            Email = "hy13081999@gmail.com",
            NormalizedEmail = "HY13081999@gmail.com",
            SecurityStamp = "6S5VFSXM26LTQENLK4DDZPTGQ742U436",
            EmailConfirmed = true,
            IsActive = true,
            CreatedDate = DateTimeOffset.Now,
        };

        PasswordHasher<User> ph = new();
        admin.PasswordHash = ph.HashPassword(admin, "Aa123321");

        builder.HasData(admin);
    }
}