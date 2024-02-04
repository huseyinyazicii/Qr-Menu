using AutoMapper;
using CorePackages.Security;
using CorePackages.Utilities.Results;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QrMenuServices.Business.Users.Exceptions;
using QrMenuServices.Business.Users.Models.Requests;
using QrMenuServices.Business.Users.Models.Responses;
using QrMenuServices.DataAccess.UnitOfWorks;
using QrMenuServices.Models.Entities;

namespace QrMenuServices.Business.Users.Services;

public class UserService : IUserService
{
    private readonly IRepositoryManager _repositoryManager;
    private readonly IMapper _mapper;
    private readonly ITokenHandler<User> _tokenHandler;
    private readonly UserManager<User> _userManager;
    private readonly RoleManager<IdentityRole<string>> _roleManager;

    public UserService(
        IRepositoryManager repositoryManager, 
        IMapper mapper,
        ITokenHandler<User> tokenHandler,
        UserManager<User> userManager,
        RoleManager<IdentityRole<string>> roleManager)
    {
        _repositoryManager = repositoryManager;
        _mapper = mapper;
        _tokenHandler = tokenHandler;
        _userManager = userManager;
        _roleManager = roleManager; 
    }

    #region Endpoints Methods

    public async Task<ResponseModel> AddUser(AddUserRequest request)
    {
        var user = _mapper.Map<User>(request);

        user.Id = Guid.NewGuid().ToString();
        user.CreatedDate = DateTimeOffset.Now;
        user.IsActive = true;

        if(request.RoleName != "None" && !string.IsNullOrEmpty(request.RoleName))
        {
            var role = await _roleManager.Roles.FirstOrDefaultAsync(x => x.Name == request.RoleName);

            if (role is null)
                throw new Exception($"Role not found! Role name: {request.RoleName}");
        }

        var createUserResult = await _userManager.CreateAsync(user, request.Password);

        if (!createUserResult.Succeeded)
            return Response.Error(createUserResult.Errors.First().Description);

        if(request.RoleName != "None" && !string.IsNullOrEmpty(request.RoleName))
        {
            var addRoleResult = await _userManager.AddToRoleAsync(user, request.RoleName);

            if (!addRoleResult.Succeeded)
                return Response.Error(addRoleResult.Errors.First().Description);
        }

        return Response.Success("Created User!");
    }

    public async Task<ResponseModel> UpdateUser(UpdateUserRequest request)
    {
        var user = await _userManager.FindByIdAsync(request.Id);

        if (user is null)
            throw new UserNotFoundException(request.Id);

        if (request.RoleName != "None" && !string.IsNullOrEmpty(request.RoleName))
        {
            var role = await _roleManager.Roles.FirstOrDefaultAsync(x => x.Name == request.RoleName);

            if (role is null)
                throw new Exception($"Role not found! Role name: {request.RoleName}");

            var userRoles = await _userManager.GetRolesAsync(user);

            if(!userRoles.Contains(request.RoleName ?? ""))
            {
                foreach (var userRole in userRoles)
                {
                    await _userManager.RemoveFromRoleAsync(user, userRole);
                }

                var addRoleResult = await _userManager.AddToRoleAsync(user, request.RoleName);

                if (!addRoleResult.Succeeded)
                    return Response.Error(addRoleResult.Errors.First().Description);
            }
        }

        user.Name = request.Name;

        var updateUserResult = await _userManager.UpdateAsync(user);

        if (!updateUserResult.Succeeded)
            return Response.Error(updateUserResult.Errors.First().Description);

        return Response.Success("Updated User!");
    }

    public async Task<ResponseModel> DeleteUser(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);

        if (user is null)
            throw new UserNotFoundException(userId);

        user.IsActive = false;

        var updateUserResult = await _userManager.UpdateAsync(user);

        if (!updateUserResult.Succeeded)
            return Response.Error(updateUserResult.Errors.First().Description);

        return Response.Success("Deleted User!");
    }

    public async Task<ResponseModel<List<ListUserResponse>>> ListUsers()
    {
        var users = await _userManager.Users.ToListAsync();

        var response = new List<ListUserResponse>();

        foreach (var user in users)
        {
            var userRoles = await _userManager.GetRolesAsync(user);
            var userDetail = _mapper.Map<ListUserResponse>(user);
            userDetail.Role = userRoles.FirstOrDefault();
            response.Add(userDetail);
        }

        return Response.Success(response, "Listed users!");
    }

    public async Task<ResponseModel<LoginResponse>> Login(LoginRequest request)
    {
        var user = await _userManager.FindByEmailAsync(request.Email);

        var result = user is not null && await _userManager.CheckPasswordAsync(user, request.Password);

        if (!result || user is null || !user.IsActive)
            throw new UserNotFoundException(request.Email);

        var roles = await _userManager.GetRolesAsync(user);

        var response = new LoginResponse
        {
            AccessToken = await _tokenHandler.CreateToken(user),
            Role = roles.First(),
            Email = user.Email,
            Name = user.Name,
        };

        return Response.Success(response, "Successfully Login!");
    }

    public async Task<ResponseModel<UserInfoResponse>> GetUserInfoById(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);

        if (user is null)
            throw new UserNotFoundException(userId);

        var roles = await _userManager.GetRolesAsync(user);

        var userInfo = new UserInfoResponse
        {
            Role = roles.First(),
            Email = user.Email,
            Name = user.Name,
            AccessToken = await _tokenHandler.CreateToken(user),
        };

        return Response.Success(userInfo, "User information has been retrieved.");
    }

    #endregion
}

