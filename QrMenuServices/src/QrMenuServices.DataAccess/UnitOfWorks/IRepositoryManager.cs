using QrMenuServices.DataAccess.Repositories.Abstract;

namespace QrMenuServices.DataAccess.UnitOfWorks;

public interface IRepositoryManager
{
    ICategoryRepository Category { get; }
    ICompanyRepository Company { get; }
    IProductRepository Product { get; }

    Task SaveAsync();
}
