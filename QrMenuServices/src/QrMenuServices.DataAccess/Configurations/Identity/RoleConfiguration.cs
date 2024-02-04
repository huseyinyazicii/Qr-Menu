using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QrMenuServices.Models.Constants;

namespace QrMenuServices.DataAccess.Configurations.Identity;

public class RoleConfiguration : IEntityTypeConfiguration<IdentityRole>
{
    public void Configure(EntityTypeBuilder<IdentityRole> builder)
    {
        builder.HasData(
            new IdentityRole
            {
                Id = "b907b25f-ca68-41ea-ba7b-1a29face1f0c",
                Name = Roles.Admin,
                NormalizedName = "ADMIN"
            },
            new IdentityRole
            {
                Name = Roles.Customer,
                NormalizedName = "CUSTOMER"
            });
    }
}