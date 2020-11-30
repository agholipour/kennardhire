using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ProductApproval.GraphQL.Persistense;

namespace ProductApproval.GraphQL.Api.Extensions
{
    public static class ServiceExtensions
    {
        public static void AddContext(this IServiceCollection services)
        {
            services.AddDbContext<AppDbContext>(options => {
                options.UseSqlite("Data Source=sqlitedemo.db");             
            },ServiceLifetime.Scoped).AddUnitOfWork<AppDbContext>();


        }
    }
}