using Microsoft.EntityFrameworkCore;
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
    public class RepositoryAsync<T> : IRepositoryAsync<T> where T : BaseEntity
    {
        protected readonly DbContext _dbContext;
        protected readonly DbSet<T> _dbSet;

        public RepositoryAsync(DbContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = _dbContext.Set<T>();
        }

        public async Task<T> SingleAsync(Expression<Func<T, bool>> predicate = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null, bool disableTracking = true)
        {
            IQueryable<T> query = _dbSet;
            if (disableTracking) query = query.AsNoTracking();

            if (include != null) query = include(query);

            if (predicate != null) query = query.Where(predicate);

            if (orderBy != null)
                return await orderBy(query).FirstOrDefaultAsync();
            return await query.FirstOrDefaultAsync();
        }

       
        public async Task<IEnumerable<T>> GetListAsync(Expression<Func<T, bool>> predicate = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            Func<IQueryable<T>, IIncludableQueryable<T, object>> include = null,
            bool disableTracking = true, CancellationToken cancellationToken = default)
        {
            IQueryable<T> query = _dbSet;
            if (disableTracking) query = query.AsNoTracking();

            if (include != null) query = include(query);

            if (predicate != null) query = query.Where(predicate);

            if (orderBy != null)
                return await orderBy(query).ToListAsync(cancellationToken);

            return await query.ToListAsync(cancellationToken);
        }
        public Task AddAsync(T entity, CancellationToken cancellationToken = default(CancellationToken))
        {
            return _dbSet.AddAsync(entity, cancellationToken).AsTask();
        }

        public Task AddAsync(params T[] entities)
        {
            return _dbSet.AddRangeAsync(entities);
        }


        public Task AddAsync(IEnumerable<T> entities,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            return _dbSet.AddRangeAsync(entities, cancellationToken);
        }

        public void Update(T entity)
        {
            AttachEntity(entity);
            _dbSet.Update(entity);
        }
        public void Remove(T entity)
        {
            var local = _dbSet.Local.FirstOrDefault(c => c.Id == entity.Id);
            if (local != null)
            {
                _dbContext.Entry(local).State = EntityState.Detached;
            }

            _dbSet.Attach(entity);
            _dbContext.Entry(entity).State = EntityState.Deleted;
            _dbSet.Remove(entity);

        }
        public void RemoveRange(IEnumerable<T> entities)
        {
            foreach (var item in entities)
            {
                var local = _dbSet.Local.FirstOrDefault(c => c.Id == item.Id);
                if (local != null)
                {
                    _dbContext.Entry(local).State = EntityState.Detached;
                }

                _dbSet.Attach(item);
                _dbContext.Entry(item).State = EntityState.Deleted;
            }

            _dbSet.RemoveRange(entities);
        }
        private void AttachEntity(T entity)
        {
            var local = _dbSet.Local.FirstOrDefault(c => c.Id == entity.Id);
            if (local != null)
            {
                _dbContext.Entry(local).State = EntityState.Detached;
            }

            _dbSet.Attach(entity);
            _dbContext.Entry(entity).State = EntityState.Modified;
        }

       
    }
}