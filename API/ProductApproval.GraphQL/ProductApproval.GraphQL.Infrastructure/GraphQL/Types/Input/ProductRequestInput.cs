using GraphQL.Types;
using ProductApproval.GraphQL.Business.Models;

namespace ProductApproval.GraphQL.Infrastructure.GraphQL.Types.Input
{
    public class ProductRequestInput : InputObjectGraphType<ProductRequestDto>
    {
        public ProductRequestInput()
        {
            Name = nameof(ProductRequestInput);

            Field(x => x.Generic);
            Field(x => x.Brand);
            Field(x => x.RequestPriorityId);
            Field(x => x.Comment, nullable: true);

        }
    }
}
