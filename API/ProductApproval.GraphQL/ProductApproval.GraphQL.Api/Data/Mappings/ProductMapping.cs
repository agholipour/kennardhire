using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ProductApproval.GraphQL.Core.Domain;

namespace ProductApproval.GraphQL.Api.Data.Mappings
{
    public class ProductMapping : IEntityTypeConfiguration<ProductRequest>
    {
        public void Configure(EntityTypeBuilder<ProductRequest> builder)
        {

            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Generic)
                .IsRequired()
                .HasMaxLength(255);

            builder.Property(x => x.Brand)
                .IsRequired()
               .HasMaxLength(40);

           
            builder.Ignore(x =>x.RequestPriorityId)
                .Property(typeof(int), "_requestPriority")
                .HasColumnType("int")
                .HasColumnName("RequestPriority")
                .HasDefaultValue(1)
                .IsRequired();

          
          
           
        }
}
}
