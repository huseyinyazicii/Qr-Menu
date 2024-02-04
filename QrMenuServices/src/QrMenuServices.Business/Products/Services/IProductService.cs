using CorePackages.Utilities.Results;
using QrMenuServices.Business.Products.Models.Requests;

namespace QrMenuServices.Business.Products.Services;

public interface IProductService
{
    Task<ResponseModel> AddProduct(AddProductRequest request);
    Task<ResponseModel> DeleteProduct(string productId, string userId);
    Task<ResponseModel> UpdateProduct(UpdateProductRequest request, string userId);
}
