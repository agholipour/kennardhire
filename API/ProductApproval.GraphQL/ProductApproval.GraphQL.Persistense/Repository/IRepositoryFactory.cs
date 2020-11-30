using ProductApproval.GraphQL.Core.Domain;

namespace ProductApproval.GraphQL.Persistense.Repository
{
    public interface IRepositoryFactory
    {
        IRepository<T> GetRepository<T>() where T : class;
        IRepositoryAsync<T> GetRepositoryAsync<T>() where T : BaseEntity;
        IRepositoryReadOnly<T> GetReadOnlyRepository<T>() where T : class;
    }
}