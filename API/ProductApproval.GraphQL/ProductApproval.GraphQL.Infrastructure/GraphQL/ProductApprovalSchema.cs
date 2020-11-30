using GraphQL;
using GraphQL.Types;
using System;

namespace ProductApproval.GraphQL.Infrastructure.GraphQL
{
    public class ProductApprovalSchema : Schema
    {
        public ProductApprovalSchema(IServiceProvider services) : base(services)
        {
            Query = services.GetService(typeof(ProductApprovalQuery)).As<IObjectGraphType>();
            Mutation = services.GetService(typeof(ProductApprovalMutation)).As<IObjectGraphType>();


        }
    }
}
