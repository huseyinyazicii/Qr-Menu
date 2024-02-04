using CorePackages.Security;
using CorePackages.Utilities.LocalStorage;
using Microsoft.Extensions.DependencyInjection;
using QrMenuServices.Business.Categories.Mappers;
using QrMenuServices.Business.Categories.Services;
using QrMenuServices.Business.Companies.Mappers;
using QrMenuServices.Business.Companies.Services;
using QrMenuServices.Business.Products.Mappers;
using QrMenuServices.Business.Products.Services;
using QrMenuServices.Business.Users.Mappers;
using QrMenuServices.Business.Users.Services;
using QrMenuServices.Models.Entities;

namespace QrMenuServices.Business;

public static class ServiceRegistration
{
    public static void AddBusinessServices(this IServiceCollection services)
    {
        services.AddScoped<ITokenHandler<User>, TokenHandler<User>>();
        services.AddScoped<ILocalStorage, LocalStorage>();

        services.AddScoped<ICategoryService, CategoryService>();
        services.AddScoped<ICompanyService, CompanyService>();
        services.AddScoped<IProductService, ProductService>();
        services.AddScoped<IUserService, UserService>();

        services.AddAutoMapper(
           typeof(CategoryProfile),
           typeof(CompanyProfile),
           typeof(ProductProfile),
           typeof(UserProfile));
    }
}