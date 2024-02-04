using CorePackages.Filters;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QrMenuServices.Business.Users.Models.Requests;
using QrMenuServices.Business.Users.Services;
using QrMenuServices.Models.Constants;
using System.Security.Claims;

namespace QrMenuServices.WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [ServiceFilter(typeof(ValidationFilterAttribute))]
    [HttpPost("Login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var result = await _userService.Login(request);

        return result.Success ? Ok(result) : BadRequest(result);
    }

    [ServiceFilter(typeof(ValidationFilterAttribute))]
    [Authorize(Roles = Roles.Admin)]
    [HttpPost("AddUser")]
    public async Task<IActionResult> AddUser([FromBody] AddUserRequest request)
    {
        var result = await _userService.AddUser(request);

        return result.Success ? Ok(result) : BadRequest(result);
    }

    [ServiceFilter(typeof(ValidationFilterAttribute))]
    [Authorize(Roles = Roles.Admin)]
    [HttpPut("UpdateUser")]
    public async Task<IActionResult> UpdateUser([FromBody] UpdateUserRequest request)
    {
        var result = await _userService.UpdateUser(request);

        return result.Success ? Ok(result) : BadRequest(result);
    }

    [ServiceFilter(typeof(ValidationFilterAttribute))]
    [Authorize(Roles = Roles.Admin)]
    [HttpDelete("DeleteUser/{userId}")]
    public async Task<IActionResult> DeleteUser([FromRoute(Name = "userId")] string userId)
    {
        var result = await _userService.DeleteUser(userId);

        return result.Success ? Ok(result) : BadRequest(result);
    }

    [Authorize(Roles = Roles.Admin)]
    [HttpGet("ListUsers")]
    public async Task<IActionResult> ListUsers()
    {
        var result = await _userService.ListUsers();

        return result.Success ? Ok(result) : BadRequest(result);
    }

    [Authorize]
    [HttpGet("GetUserInfoById")]
    public async Task<IActionResult> GetUserInfoById()
    {
        var result = await _userService.GetUserInfoById(User.FindFirst(ClaimTypes.NameIdentifier).Value);

        return result.Success ? Ok(result) : BadRequest(result);
    }
}
