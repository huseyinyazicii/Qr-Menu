namespace QrMenuServices.Business.Users.Models.Responses;

#nullable disable
public class ListUserResponse
{
    public string Id { get; init; }
    public string Email { get; init; }
    public string Name { get; init; }
    public string UserName { get; init; }
    public DateTimeOffset CreatedDate { get; init; }
    public bool IsActive { get; init; }
    public string Role { get; set; }
}
