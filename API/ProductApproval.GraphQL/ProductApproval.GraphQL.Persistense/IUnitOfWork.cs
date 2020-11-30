using Microsoft.EntityFrameworkCore;
using ProductApproval.GraphQL.Business.Models;
using ProductApproval.GraphQL.Core.Domain;
using ProductApproval.GraphQL.Persistense.Repository;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace ProductApproval.GraphQL.Persistense
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<TEntity> GetRepository<TEntity>() where TEntity : class;
        IRepositoryAsync<TEntity> GetRepositoryAsync<TEntity>() where TEntity : BaseEntity;
        IRepositoryReadOnly<TEntity> GetReadOnlyRepository<TEntity>() where TEntity : class;
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken));
        int SaveChanges();
    }

    public interface IUnitOfWork<TContext> : IUnitOfWork where TContext : DbContext
    {
        TContext Context { get; }
    }
}
