using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Query;
using ProductApproval.GraphQL.Core.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace ProductApproval.GraphQL.Persistense.Repository
{
    public interface IRepositoryAsync<T> where T : BaseEntity
    {
        Task<T> SingleAsync(Expression<Func<T, bool>> predicate = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null,
            bool disableTracking = true);

        Task<IEnumerable<T>> GetListAsync(Expression<Func<T, bool>> predicate = null,
         Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
         Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null,
         bool disableTracking = true,
         CancellationToken cancellationToken = default(CancellationToken));

        Task AddAsync(T entity, CancellationToken cancellationToken = default(CancellationToken));

        Task AddAsync(params T[] entities);

        Task AddAsync(IEnumerable<T> entities, CancellationToken cancellationToken = default(CancellationToken));

        void RemoveRange(IEnumerable<T> entities);
        void Remove(T entity);
        void Update(T entity);

    }
}