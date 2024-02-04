namespace CorePackages.Security;
#nullable disable
public class JwtSettingsModel
{
    public string ValidIssuer { get; init; }
    public string ValidAudience { get; init; }
    public string SecretKey { get; init; }
    public int AccessTokenExpiration { get; init; }
}
