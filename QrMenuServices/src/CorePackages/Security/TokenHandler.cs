using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CorePackages.Security;

public class TokenHandler<TUser> : ITokenHandler<TUser> where TUser : IdentityUser<string>
{
    private readonly UserManager<TUser> _userManager;
    private readonly JwtSettingsModel _jwtSettings;

    public TokenHandler(IOptions<JwtSettingsModel> jwtSettings, UserManager<TUser> userManager)
    {
        _jwtSettings = jwtSettings.Value;
        _userManager = userManager;
    }

    // AccessToken
    public async Task<string> CreateToken(TUser user)
    {
        var signinCredentials = GetSignInCredentials();
        var claims = await GetClaims(user);
        var tokenOptions = GenerateTokenOptions(signinCredentials, claims);

        var accessToken = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

        return accessToken;
    }

    private SigningCredentials GetSignInCredentials()
    {
        var key = Encoding.UTF8.GetBytes(_jwtSettings.SecretKey);
        var secret = new SymmetricSecurityKey(key);
        return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);
    }

    private async Task<List<Claim>> GetClaims(TUser user)
    {
        var claims = new List<Claim>()
        {
            new (ClaimTypes.Name, user.UserName),
            new (ClaimTypes.Email, user.Email),
            new (ClaimTypes.NameIdentifier, user.Id)
        };

        var roles = await _userManager.GetRolesAsync(user);

        foreach (var role in roles)
            claims.Add(new(ClaimTypes.Role, role));

        return claims;
    }

    private JwtSecurityToken GenerateTokenOptions(SigningCredentials signinCredentials, List<Claim> claims)
    {
        var tokenOptions = new JwtSecurityToken(
            issuer: _jwtSettings.ValidIssuer,
            audience: _jwtSettings.ValidAudience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(Convert.ToDouble(_jwtSettings.AccessTokenExpiration)),
            signingCredentials: signinCredentials
        );

        return tokenOptions;
    }

    public ClaimsPrincipal GetPrincipalFromExpiredToken(string accessToken)
    {
        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = false,
            ValidateIssuerSigningKey = true,
            ValidIssuer = _jwtSettings.ValidIssuer,
            ValidAudience = _jwtSettings.ValidAudience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey))
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        SecurityToken securityToken;

        var principal = tokenHandler.ValidateToken(accessToken, tokenValidationParameters, out securityToken);

        var jwtSecurityToken = securityToken as JwtSecurityToken;

        if (jwtSecurityToken is null ||
            !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256,
            StringComparison.InvariantCultureIgnoreCase))
        {
            throw new SecurityTokenException("Invalid token.");
        }
        return principal;
    }
}