using CSharpFunctionalExtensions;
using GraphQL;
using GraphQL.Types;
using ProductApproval.GraphQL.Business.Models;
using ProductApproval.GraphQL.Business.Services;
using ProductApproval.GraphQL.Core.Domain;
using ProductApproval.GraphQL.Infrastructure.GraphQL.Types.Input;
using System;
using System.Linq;

namespace ProductApproval.GraphQL.Infrastructure.GraphQL
{
    public class ProductApprovalMutation : ObjectGraphType
    {
        public ProductApprovalMutation(
            IProductRequestService productRequestService
            )
        {
            Name = nameof(ProductApprovalMutation);

            #region commercial group product request 

            FieldAsync<ProductRequestSummaryType>(
               "createProductRequest",
                arguments: new QueryArguments(new QueryArgument<NonNullGraphType<ProductRequestInput>> { Name = "input" }),
                     resolve: async context =>
                     {
                         var requestDto = context.GetArgument<ProductRequestDto>("input");

                         var validator = new ProductRequestValidator();
                         var results = validator.Validate(requestDto);
                         if (!results.IsValid)
                         {
                             var errors = results.Errors.Select(x => new ExecutionError(x.ErrorMessage)).ToList();
                             context.Errors.AddRange(errors);
                         }

                         
                                     if (context.Errors.Any())
                                     {
                                         return null;
                                     }

                                     var result = await productRequestService.Create(requestDto);
                                     if (result.IsSuccess)
                                         return result.Value;
                                     context.Errors.Add(new ExecutionError(result.Error));
                                     return null;

                     }
               );



            FieldAsync<ProductRequestSummaryType>(
                name: "updateProductRequest",
                arguments: new QueryArguments(
                        new QueryArgument<NonNullGraphType<GuidGraphType>> { Name = "id" },
                        new QueryArgument<NonNullGraphType<ProductRequestInput>> { Name = "input" }),
                resolve: async context =>
                {
                    var productRequestId = context.GetArgument<Guid>("id");
                    var requestDto = context.GetArgument<ProductRequestDto>("input");
                    var validator = new ProductRequestValidator();
                    var results = validator.Validate(requestDto);
                    if (!results.IsValid)
                    {
                        var errors = results.Errors.Select(x => new ExecutionError(x.ErrorMessage)).ToList();
                        context.Errors.AddRange(errors);
                    }
                    if (context.Errors.Any())
                                {
                                    return null;
                                }

                                var result = await productRequestService.Update(requestDto, productRequestId);
                                if (result.IsSuccess)
                                    return result.Value;
                                context.Errors.Add(new ExecutionError(result.Error));
                                return null;
            
                });

            #endregion

           
        }

       
    }
}
