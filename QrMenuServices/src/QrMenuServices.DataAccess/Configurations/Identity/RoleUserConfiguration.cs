using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace QrMenuServices.DataAccess.Configurations.Identity;

public class UserRoleConfiguration : IEntityTypeConfiguration<IdentityUserRole<string>>
{
    public void Configure(EntityTypeBuilder<IdentityUserRole<string>> builder)
    {
        builder.HasData(
            new IdentityUserRole<string>
            {
                RoleId = "b907b25f-ca68-41ea-ba7b-1a29face1f0c",
                UserId = "6cc8150f-e336-4204-9eb6-de9636c00765"
            });
    }
}