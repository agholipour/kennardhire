using GraphQL;
using GraphQL.Types;
using ProductApproval.GraphQL.Business.Services;
using ProductApproval.GraphQL.Core.Domain;
using System;
using System.Linq;

namespace ProductApproval.GraphQL.Infrastructure.GraphQL
{
    public class ProductApprovalQuery : ObjectGraphType
    {
        public ProductApprovalQuery(
            IProductRequestService productRequestService
            )
        {
            // init repos

            Name = "root";
            #region Product Request queries

            Field<ListGraphType<ProductRequestSummaryType>>(
                "productRequestList",
                resolve: context =>
                {
                    return productRequestService.GetBaseProductRequests();
                });

            Field<ProductRequestType>(
            name: "productRequestDetails",
            arguments: new QueryArguments(new QueryArgument<NonNullGraphType<GuidGraphType>> { Name = "id" }),
            resolve: context => productRequestService.GetDetails(context.GetArgument<Guid>("id")));

            

            #endregion

        }
    }
}
