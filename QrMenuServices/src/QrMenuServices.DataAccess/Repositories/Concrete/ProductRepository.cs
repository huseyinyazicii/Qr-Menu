using CorePackages.DataAccess;
using QrMenuServices.DataAccess.Contexts;
using QrMenuServices.DataAccess.Repositories.Abstract;
using QrMenuServices.Models.Entities;

namespace QrMenuServices.DataAccess.Repositories.Concrete;

public class ProductRepository : RepositoryBase<Product, QrMenuDbContext>, IProductRepository
{
    public ProductRepository(QrMenuDbContext context) : base(context)
    {
    }
}
