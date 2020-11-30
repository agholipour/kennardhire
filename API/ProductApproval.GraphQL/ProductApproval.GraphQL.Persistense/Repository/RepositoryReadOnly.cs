using Microsoft.EntityFrameworkCore;

namespace ProductApproval.GraphQL.Persistense.Repository
{
    public class RepositoryReadOnly<T> : BaseRepository<T>, IRepositoryReadOnly<T> where T : class
    {
        public RepositoryReadOnly(DbContext context) : base(context)
        {
        }
    }
}