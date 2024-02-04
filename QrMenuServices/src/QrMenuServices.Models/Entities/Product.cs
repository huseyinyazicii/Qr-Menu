using CorePackages.Models;

namespace QrMenuServices.Models.Entities;

#nullable disable
public class Product : BaseEntity
{
    public string CategoryId { get; set; }

    public string Title { get; set; }
    public string Content { get; set; }
    public decimal Price { get; set; }
    public string ImagePath { get; set; }
    public bool IsActive { get; set; }

    public virtual Category Category { get; set; }
}
