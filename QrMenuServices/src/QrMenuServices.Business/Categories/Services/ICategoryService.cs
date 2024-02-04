using CorePackages.Utilities.Results;
using QrMenuServices.Business.Categories.Models.Requests;
using QrMenuServices.Business.Categories.Models.Responses;

namespace QrMenuServices.Business.Categories.Services;

public interface ICategoryService
{
    Task<ResponseModel> AddCategory(AddCategoryRequest request, string userId);
    Task<ResponseModel<List<ListCategoriesByUserIdResponse>>> ListCategoriesByUserId(string userId);
    Task<ResponseModel<List<ListCategoriesByUserIdResponse>>> ListCategoriesByCompanyId(string companyId);
    Task<ResponseModel> DeleteCategory(string categoryId, string userId);
    Task<ResponseModel> UpdateCategory(UpdateCategoryRequest request, string userId);
}
