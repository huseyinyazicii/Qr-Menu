using CorePackages.DataAccess;
using QrMenuServices.DataAccess.Contexts;
using QrMenuServices.DataAccess.Repositories.Abstract;
using QrMenuServices.Models.Entities;

namespace QrMenuServices.DataAccess.Repositories.Concrete;

public class CategoryRepository : RepositoryBase<Category, QrMenuDbContext>, ICategoryRepository
{
    public CategoryRepository(QrMenuDbContext context) : base(context)
    {
    }
}
