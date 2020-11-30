using Microsoft.EntityFrameworkCore;
using ProductApproval.GraphQL.Business.Models;
using ProductApproval.GraphQL.Core.Domain;
using ProductApproval.GraphQL.Persistense.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ProductApproval.GraphQL.Persistense
{
    public class UnitOfWork<TContext> : IRepositoryFactory, IUnitOfWork<TContext>, IUnitOfWork
        where TContext : DbContext, IDisposable
    {
        private Dictionary<Type, object> _repositories;

        public UnitOfWork(TContext context)
        {
            Context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public IRepository<TEntity> GetRepository<TEntity>() where TEntity : class
        {
            if (_repositories == null) _repositories = new Dictionary<Type, object>();

            var type = typeof(TEntity);
            if (!_repositories.ContainsKey(type)) _repositories[type] = new Repository<TEntity>(Context);
            return (IRepository<TEntity>)_repositories[type];
        }

        public IRepositoryAsync<TEntity> GetRepositoryAsync<TEntity>() where TEntity : BaseEntity
        {
            if (_repositories == null) _repositories = new Dictionary<Type, object>();

            var type = typeof(TEntity);
            if (!_repositories.ContainsKey(type)) _repositories[type] = new RepositoryAsync<TEntity>(Context);
            return (IRepositoryAsync<TEntity>)_repositories[type];
        }

        public IRepositoryReadOnly<TEntity> GetReadOnlyRepository<TEntity>() where TEntity : class
        {
            if (_repositories == null) _repositories = new Dictionary<Type, object>();

            var type = typeof(TEntity);
            if (!_repositories.ContainsKey(type)) _repositories[type] = new RepositoryReadOnly<TEntity>(Context);
            return (IRepositoryReadOnly<TEntity>)_repositories[type];
        }

        public TContext Context { get; }

        public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
             return Context.SaveChangesAsync(cancellationToken);
        }

        public int SaveChanges()
        {
            using (var transaction = Context.Database.BeginTransaction())
            {
                try
                {
                    var result = Context.SaveChanges();
                    transaction.Commit();
                    return result;

                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    throw;
                }
            }
        }

        public void Dispose()
        {
            Context?.Dispose();
        }
    }
}