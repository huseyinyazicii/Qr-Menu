using CorePackages.Models;

namespace QrMenuServices.Models.Entities;

#nullable disable
public class Category : BaseEntity
{
    public string CompanyId { get; set; }

    public string Name { get; set; }
    public string ImagePath { get; set; }
    public bool IsActive { get; set; }

    public virtual Company Company { get; set; }
    public virtual ICollection<Product> Products { get; set; }
}
