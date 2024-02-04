using CorePackages.DataAccess;
using QrMenuServices.DataAccess.Contexts;
using QrMenuServices.DataAccess.Repositories.Abstract;
using QrMenuServices.Models.Entities;

namespace QrMenuServices.DataAccess.Repositories.Concrete;

public class CompanyRepository : RepositoryBase<Company, QrMenuDbContext>, ICompanyRepository
{
    public CompanyRepository(QrMenuDbContext context) : base(context)
    {
    }
}
