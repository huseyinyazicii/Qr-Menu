using QrMenuServices.DataAccess.Contexts;
using QrMenuServices.DataAccess.Repositories.Abstract;
using QrMenuServices.DataAccess.Repositories.Concrete;

namespace QrMenuServices.DataAccess.UnitOfWorks;

public class RepositoryManager : IRepositoryManager
{
    private readonly QrMenuDbContext _context;
    private readonly Lazy<ICategoryRepository> _categoryRepository;
    private readonly Lazy<ICompanyRepository> _companyRepository;
    private readonly Lazy<IProductRepository> _productRepository;

    public RepositoryManager(QrMenuDbContext context)
    {
        _context = context;
        _categoryRepository = new Lazy<ICategoryRepository>(() => new CategoryRepository(_context));
        _companyRepository = new Lazy<ICompanyRepository>(() => new CompanyRepository(_context));
        _productRepository = new Lazy<IProductRepository>(() => new ProductRepository(_context));
    }

    public ICategoryRepository Category => _categoryRepository.Value;
    public ICompanyRepository Company => _companyRepository.Value;
    public IProductRepository Product => _productRepository.Value;

    public Task SaveAsync() => _context.SaveChangesAsync();
}