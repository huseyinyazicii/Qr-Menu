using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using QrMenuServices.DataAccess.Contexts;
using QrMenuServices.DataAccess.UnitOfWorks;

namespace QrMenuServices.DataAccess;

public static class ServiceRegistration
{
    public static void AddDataAccessServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<IRepositoryManager, RepositoryManager>();

        #region Database Context
        services.AddDbContext<QrMenuDbContext>(options =>
        {
            options.UseSqlServer(configuration.GetConnectionString("Context"));
        });
        #endregion
    }
}
