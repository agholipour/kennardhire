using Autofac;
using GraphQL;
using GraphQL.Types;
using ProductApproval.GraphQL.Business.Services;
using ProductApproval.GraphQL.Infrastructure.GraphQL;
using ProductApproval.GraphQL.Infrastructure.GraphQL.Types.Input;

namespace ProductApproval.GraphQL.Infrastructure
{
    public class InfrastructureModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {


            // Types
            builder.RegisterType<ProductRequestType>().InstancePerDependency();
            builder.RegisterType<ProductRequestSummaryType>().InstancePerDependency();
            
           // Input Types
            builder.RegisterType<ProductRequestInput>().InstancePerDependency();
            // services
            builder.RegisterType<ProductRequestService>().As<IProductRequestService>().InstancePerDependency();

            builder.RegisterType<DocumentExecuter>().As<IDocumentExecuter>().InstancePerDependency();
            builder.RegisterType<ProductApprovalMutation>().InstancePerDependency();
            builder.RegisterType<ProductApprovalQuery>().InstancePerDependency();
            builder.RegisterType<ProductApprovalSchema>().As<ISchema>().InstancePerDependency();

        }
    }
}
