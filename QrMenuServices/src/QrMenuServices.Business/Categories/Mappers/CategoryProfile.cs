using AutoMapper;
using QrMenuServices.Business.Categories.Models.Requests;
using QrMenuServices.Models.Entities;

namespace QrMenuServices.Business.Categories.Mappers;

public class CategoryProfile : Profile
{
    public CategoryProfile()
    {
        CreateMap<Category, AddCategoryRequest>();
        CreateMap<AddCategoryRequest, Category>();
    }
}
