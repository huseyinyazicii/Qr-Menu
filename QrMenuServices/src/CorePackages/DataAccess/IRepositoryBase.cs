using System.Linq.Expressions;

namespace CorePackages.DataAccess;

#nullable disable
public interface IRepositoryBase<T> where T : class, new()
{
    // Read
    IQueryable<T> List(Expression<Func<T, bool>> method, bool tracking = false);
    IQueryable<T> ListAll(bool tracking = false);
    Task<T> SingleAsync(Expression<Func<T, bool>> method, bool tracking = false);
    Task<int> CountAsync(Expression<Func<T, bool>> method = null);

    // Write
    Task AddAsync(T entity);
    Task AddRangeAsync(ICollection<T> entities);
    void RemoveRange(ICollection<T> entity);
    void RemoveAsync(T entity);
    void Update(T model);
}
