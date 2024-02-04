using CorePackages.Models;

namespace QrMenuServices.Models.Entities;

#nullable disable
public class Company : BaseEntity
{
    public string UserId { get; set; }

    public string Name { get; set; }
    public bool IsPay { get; set; }
    public bool IsActive { get; set; }
    public DateTimeOffset DismissalDate { get; set; }

    public virtual User User { get; set; }
    public virtual ICollection<Category> Categories { get; set; }
}
