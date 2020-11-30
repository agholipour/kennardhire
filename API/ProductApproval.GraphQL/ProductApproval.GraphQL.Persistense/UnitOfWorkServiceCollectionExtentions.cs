using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ProductApproval.GraphQL.Persistense.Repository;

namespace ProductApproval.GraphQL.Persistense
{
    public static class  UnitOfWorkServiceCollectionExtentions
    {
          public static IServiceCollection AddUnitOfWork<TContext>(this IServiceCollection services)
            where TContext : DbContext
    {
        services.AddScoped<IRepositoryFactory, UnitOfWork<TContext>>();
        services.AddScoped<IUnitOfWork, UnitOfWork<TContext>>();
        services.AddScoped<IUnitOfWork<TContext>, UnitOfWork<TContext>>();
        return services;
    }
}
}
