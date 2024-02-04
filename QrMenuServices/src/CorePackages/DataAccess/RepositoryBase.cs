using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace CorePackages.DataAccess;
#nullable disable
public abstract class RepositoryBase<TEntity, TContext> : IRepositoryBase<TEntity>
    where TEntity : class, new()
    where TContext : DbContext
{
    protected readonly TContext _context;

    public RepositoryBase(TContext context)
    {
        _context = context;
    }

    // Read
    public IQueryable<TEntity> List(Expression<Func<TEntity, bool>> method, bool tracking = false)
        => tracking ? _context.Set<TEntity>().Where(method) : _context.Set<TEntity>().Where(method).AsNoTracking();

    public IQueryable<TEntity> ListAll(bool tracking = false)
        => tracking ? _context.Set<TEntity>() : _context.Set<TEntity>().AsNoTracking();

    public async Task<TEntity> SingleAsync(Expression<Func<TEntity, bool>> method, bool tracking = false)
        => tracking
            ? await _context.Set<TEntity>().SingleOrDefaultAsync(method)
            : await _context.Set<TEntity>().AsNoTracking().SingleOrDefaultAsync(method);

    public Task<int> CountAsync(Expression<Func<TEntity, bool>> method = null)
        => method is not null
            ? _context.Set<TEntity>().CountAsync(method)
            : _context.Set<TEntity>().CountAsync();

    // Write
    public async Task AddAsync(TEntity model) => await _context.AddAsync(model);

    public Task AddRangeAsync(ICollection<TEntity> datas) => _context.AddRangeAsync(datas);

    public void RemoveRange(ICollection<TEntity> entities) => _context.RemoveRange(entities);

    public void Update(TEntity entity) => _context.Update(entity);

    public void RemoveAsync(TEntity entity) => _context.Remove(entity);
}
