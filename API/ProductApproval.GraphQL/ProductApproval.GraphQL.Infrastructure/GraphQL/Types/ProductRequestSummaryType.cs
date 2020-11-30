using GraphQL.Types;
using ProductApproval.GraphQL.Core.Domain;
using System.Globalization;

namespace ProductApproval.GraphQL.Infrastructure.GraphQL
{
    public class ProductRequestSummaryType : ObjectGraphType<ProductRequest>
    {
        public ProductRequestSummaryType()
        {
            Name = nameof(ProductRequestSummaryType);
            Field(x => x.Id);

            Field(x => x.Brand, nullable: true);
            Field(x => x.Generic, nullable: true);


            Field(x => x.RequestPriorityId);
            Field<StringGraphType>(
                name: "requestPriority",
                resolve: context =>
                {
                    return Priority.RequestPriorities[context.Source.RequestPriorityId].Description;
                });


        }
    }
}
