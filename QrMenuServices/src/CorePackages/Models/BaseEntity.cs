namespace CorePackages.Models;

#nullable disable
public class BaseEntity
{
    public string Id { get; set; }
    public DateTimeOffset CreatedDate { get; set; }
}