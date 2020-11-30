using GraphQL.Types;
using ProductApproval.GraphQL.Core.Domain;
using ProductApproval.GraphQL.Infrastructure.GraphQL.Types;
using System.Globalization;

namespace ProductApproval.GraphQL.Infrastructure.GraphQL
{
    public class ProductRequestType : ObjectGraphType<ProductRequest>
    {
        public ProductRequestType()
        {
            Name = nameof(ProductRequestType);
            Field(x => x.Id);
            Field(x => x.Brand);
            Field(x => x.Comment, nullable: true);
            Field(x => x.Generic);
            Field(x => x.RequestPriorityId);
            Field<StringGraphType>(
            name: "RequestPriority",
            resolve: context =>
            {
                return Priority.RequestPriorities[context.Source.RequestPriorityId].Description;
            });
        }
       
    }
}
