using Microsoft.AspNetCore.Identity;

namespace QrMenuServices.Models.Entities;

#nullable disable
public class User : IdentityUser<string>
{
    public string Name { get; set; }
    public bool IsActive { get; set; }
    public DateTimeOffset CreatedDate { get; set; }

    public virtual Company Company { get; set; }
}