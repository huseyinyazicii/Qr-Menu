using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QrMenuServices.Models.Entities;

namespace QrMenuServices.DataAccess.Configurations;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.HasKey(x => x.Id);
        builder.ToTable("Products");

        builder
            .Property(x => x.Title)
            .HasMaxLength(100);

        builder
            .Property(x => x.Content)
            .HasMaxLength(100);

        builder
           .Property(x => x.CategoryId)
           .IsRequired();


        builder.HasOne(x => x.Category)
           .WithMany(x => x.Products)
           .HasForeignKey(x => x.CategoryId)
           .OnDelete(DeleteBehavior.Cascade);
        //.OnDelete(DeleteBehavior.ClientSetNull);
    }
}
