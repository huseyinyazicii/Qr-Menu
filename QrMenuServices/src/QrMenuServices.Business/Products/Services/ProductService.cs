using AutoMapper;
using CorePackages.Utilities.LocalStorage;
using CorePackages.Utilities.Results;
using QrMenuServices.Business.Products.Models.Requests;
using QrMenuServices.DataAccess.UnitOfWorks;
using QrMenuServices.Models.Constants;
using QrMenuServices.Models.Entities;

namespace QrMenuServices.Business.Products.Services;

public class ProductService : IProductService
{
    private readonly IRepositoryManager _repositoryManager;
    private readonly IMapper _mapper;
    private readonly ILocalStorage _localStorage;

    public ProductService(IRepositoryManager repositoryManager, IMapper mapper, ILocalStorage localStorage)
    {
        _repositoryManager = repositoryManager;
        _mapper = mapper;
        _localStorage = localStorage;
    }

    #region Endpoints Methods

    public async Task<ResponseModel> AddProduct(AddProductRequest request)
    {
        var product = _mapper.Map<Product>(request);

        product.Id = Guid.NewGuid().ToString();
        product.CreatedDate = DateTimeOffset.Now;
        product.IsActive = true;

        var storageResponse = _localStorage.Upload(Files.ProductDirectory, request.ImageFile);
        product.ImagePath = storageResponse.Success ? storageResponse.Data : null;

        await _repositoryManager.Product.AddAsync(product);

        await _repositoryManager.SaveAsync();

        return Response.Success("Created Product!");
    }

    public async Task<ResponseModel> DeleteProduct(string productId, string userId)
    {
        var product = await _repositoryManager.Product
            .SingleAsync(x => x.Category.Company.UserId == userId && x.Id == productId, true);

        if (product is null)
            throw new Exception("Product not found");

        product.IsActive = false;

        await _repositoryManager.SaveAsync();

        return Response.Success("Deleted product");
    }

    public async Task<ResponseModel> UpdateProduct(UpdateProductRequest request, string userId)
    {
        var product = await _repositoryManager.Product
            .SingleAsync(x => x.Category.Company.UserId == userId && x.Id == request.Id, true);

        if (product is null)
            throw new Exception("Product not found");

        product.Title = request.Title;
        product.Price = request.Price;
        product.Content = request.Content;

        if (request.ImageFile is not null)
        {
            if (product.ImagePath is not null)
            {
                _localStorage.Delete(product.ImagePath);
            }

            var storageResponse = _localStorage.Upload(Files.CategoryDirectory, request.ImageFile);
            product.ImagePath = storageResponse.Success ? storageResponse.Data : null;
        }

        await _repositoryManager.SaveAsync();

        return Response.Success("Updated product");
    }

    #endregion
}

