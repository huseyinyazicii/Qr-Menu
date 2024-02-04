using CorePackages.Utilities.Results;
using QrMenuServices.Business.Users.Models.Requests;
using QrMenuServices.Business.Users.Models.Responses;

namespace QrMenuServices.Business.Users.Services;

public interface IUserService
{
    Task<ResponseModel> AddUser(AddUserRequest request);
    Task<ResponseModel> UpdateUser(UpdateUserRequest request);
    Task<ResponseModel<LoginResponse>> Login(LoginRequest request);
    Task<ResponseModel<List<ListUserResponse>>> ListUsers();
    Task<ResponseModel> DeleteUser(string userId);
    Task<ResponseModel<UserInfoResponse>> GetUserInfoById(string userId);
}
