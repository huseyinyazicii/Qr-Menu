using System.Security.Claims;

namespace CorePackages.Security;

public interface ITokenHandler<TUser>
{
    Task<string> CreateToken(TUser user);

    ClaimsPrincipal GetPrincipalFromExpiredToken(string accessToken);
}
