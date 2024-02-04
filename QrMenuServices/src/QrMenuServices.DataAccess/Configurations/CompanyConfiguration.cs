using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QrMenuServices.Models.Entities;

namespace QrMenuServices.DataAccess.Configurations;

public class CompanyConfiguration : IEntityTypeConfiguration<Company>
{
    public void Configure(EntityTypeBuilder<Company> builder)
    {
        builder.HasKey(x => x.Id);
        builder.ToTable("Companies");

        builder
            .Property(x => x.Name)
            .HasMaxLength(100);

        builder
           .Property(x => x.UserId)
           .IsRequired();

        builder.HasOne(x => x.User)
           .WithOne(x => x.Company)
           .HasForeignKey<Company>(x => x.UserId)
           .OnDelete(DeleteBehavior.NoAction);
    }
}
