using Microsoft.EntityFrameworkCore;
using ProductApproval.GraphQL.Api.Data.Mappings;
using ProductApproval.GraphQL.Core.Domain;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ProductApproval.GraphQL.Api
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<ProductRequest> ProductRequests { get; set; }
       

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfiguration(new ProductMapping());
            
        }
        public override int SaveChanges()
        {
            return base.SaveChanges();
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return await base.SaveChangesAsync();
        }

       

    }
}
