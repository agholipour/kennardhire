namespace ProductApproval.GraphQL.Persistense.Repository
{
    public interface IRepositoryReadOnly<T> : IReadRepository<T> where T : class
    {
       
    }
}