namespace QrMenuServices.Business.Companies.Models;

#nullable disable
public class CompanyDto
{
    public string Id { get; set; }
    public string UserId { get; set; }
    public string Name { get; set; }
    public bool IsPay { get; set; }
    public bool IsActive { get; set; }
    public DateTimeOffset DismissalDate { get; set; }
}
