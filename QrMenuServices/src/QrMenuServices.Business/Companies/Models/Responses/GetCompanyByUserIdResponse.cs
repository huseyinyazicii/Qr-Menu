namespace QrMenuServices.Business.Companies.Models.Responses;

public class GetCompanyByUserIdResponse
{
    public string Id { get; set; }
    public string UserId { get; set; }
    public string Name { get; set; }
    public bool IsPay { get; set; }
    public DateTimeOffset DismissalDate { get; set; }
}
