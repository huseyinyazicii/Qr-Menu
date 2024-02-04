using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QrMenuServices.Models.Entities;

namespace QrMenuServices.DataAccess.Configurations;

public class CategoryConfiguration : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.HasKey(x => x.Id);
        builder.ToTable("Categories");

        builder
            .Property(x => x.Name)
            .HasMaxLength(100);

        builder
           .Property(x => x.CompanyId)
           .IsRequired();


        builder.HasOne(x => x.Company)
           .WithMany(x => x.Categories)
           .HasForeignKey(x => x.CompanyId)
           .OnDelete(DeleteBehavior.Cascade);
        //.OnDelete(DeleteBehavior.ClientSetNull);
    }
}
