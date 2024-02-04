using AutoMapper;
using CorePackages.Utilities.LocalStorage;
using CorePackages.Utilities.Results;
using Microsoft.EntityFrameworkCore;
using QrMenuServices.Business.Categories.Models.Requests;
using QrMenuServices.Business.Categories.Models.Responses;
using QrMenuServices.Business.Companies.Services;
using QrMenuServices.Business.Products.Models;
using QrMenuServices.DataAccess.UnitOfWorks;
using QrMenuServices.Models.Constants;
using QrMenuServices.Models.Entities;

namespace QrMenuServices.Business.Categories.Services;

public class CategoryService : ICategoryService
{
    private readonly IRepositoryManager _repositoryManager;
    private readonly IMapper _mapper;
    private readonly ILocalStorage _localStorage;
    private readonly ICompanyService _companyService;

    public CategoryService(IRepositoryManager repositoryManager, IMapper mapper, ILocalStorage localStorage, ICompanyService companyService)
    {
        _repositoryManager = repositoryManager;
        _mapper = mapper;
        _localStorage = localStorage;
        _companyService = companyService;
    }

    #region Endpoints Methods

    public async Task<ResponseModel> AddCategory(AddCategoryRequest request, string userId)
    {
        var company = await _companyService.GetCompanyDtoByUserId(userId);

        var category = _mapper.Map<Category>(request);

        category.Id = Guid.NewGuid().ToString();
        category.CreatedDate = DateTimeOffset.Now;
        category.IsActive = true;
        category.CompanyId = company.Id;

        var storageResponse = _localStorage.Upload(Files.CategoryDirectory, request.ImageFile);
        category.ImagePath = storageResponse.Success ? storageResponse.Data : null;

        await _repositoryManager.Category.AddAsync(category);

        await _repositoryManager.SaveAsync();

        return Response.Success("Created Category!");
    }

    public async Task<ResponseModel> UpdateCategory(UpdateCategoryRequest request, string userId)
    {
        var category = await _repositoryManager.Category
            .SingleAsync(x => x.Id == request.Id && x.Company.UserId == userId, true);

        if (category is null)
            throw new Exception("Category not found");

        category.Name = request.Name;

        if(request.ImageFile is not null)
        {
            if(category.ImagePath is not null)
            {
                _localStorage.Delete(category.ImagePath);
            }

            var storageResponse = _localStorage.Upload(Files.CategoryDirectory, request.ImageFile);
            category.ImagePath = storageResponse.Success ? storageResponse.Data : null;
        }

        await _repositoryManager.SaveAsync();

        return Response.Success("Updated Category!");
    }

    public async Task<ResponseModel<List<ListCategoriesByUserIdResponse>>> ListCategoriesByUserId(string userId)
    {
        var company = await _companyService.GetCompanyDtoByUserId(userId);

        var categories = await _repositoryManager.Category
            .List(x => x.CompanyId == company.Id && x.IsActive)
            .Select(x => new ListCategoriesByUserIdResponse
            {
                Id = x.Id,
                Name = x.Name,
                IsActive = x.IsActive,
                ImagePath = x.ImagePath,
                Products = _mapper.Map<List<ProductDto>>(x.Products.Where(y => y.IsActive).ToList()),
            })
            .ToListAsync();

        return Response.Success(categories, "Listed categories");
    }

    public async Task<ResponseModel<List<ListCategoriesByUserIdResponse>>> ListCategoriesByCompanyId(string companyId)
    {
        var categories = await _repositoryManager.Category
            .List(x => x.CompanyId == companyId && x.IsActive)
            .Select(x => new ListCategoriesByUserIdResponse
            {
                Id = x.Id,
                Name = x.Name,
                IsActive = x.IsActive,
                ImagePath = x.ImagePath,
                Products = _mapper.Map<List<ProductDto>>(x.Products.Where(y => y.IsActive).ToList()),
            })
            .ToListAsync();

        return Response.Success(categories, "Listed categories");
    }

    public async Task<ResponseModel> DeleteCategory(string categoryId, string userId)
    {
        var category = await _repositoryManager.Category
            .SingleAsync(x => x.Company.UserId == userId && x.Id == categoryId, true);

        if(category is null)
            throw new Exception("Category not found");

        category.IsActive = false;

        await _repositoryManager.SaveAsync();

        return Response.Success("Deleted cataegory");
    }

    #endregion
}
