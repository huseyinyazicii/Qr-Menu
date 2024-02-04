namespace QrMenuServices.Business.Users.Models.Responses;

#nullable disable
public class UserInfoResponse
{
    public string Email { get; init; }
    public string Name { get; init; }
    public string Role { get; set; }
    public string AccessToken { get; set; }
}
