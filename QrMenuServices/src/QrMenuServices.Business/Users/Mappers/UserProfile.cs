using AutoMapper;
using QrMenuServices.Business.Users.Models.Requests;
using QrMenuServices.Business.Users.Models.Responses;
using QrMenuServices.Models.Entities;

namespace QrMenuServices.Business.Users.Mappers;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<AddUserRequest, User>();
        CreateMap<User, AddUserRequest>();


        CreateMap<ListUserResponse, User>();
        CreateMap<User, ListUserResponse>();
    }
}
