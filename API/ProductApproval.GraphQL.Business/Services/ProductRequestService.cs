using CSharpFunctionalExtensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ProductApproval.GraphQL.Business.Models;
using ProductApproval.GraphQL.Core.Domain;
using ProductApproval.GraphQL.Persistense;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace ProductApproval.GraphQL.Business.Services
{
    public interface IProductRequestService
    {
        ICollection<ProductRequest> GetBaseProductRequests();
        ProductRequest GetDetails(Guid id);
        Task<Result<ProductRequest>> Create(ProductRequestDto productRequest);
        Task<Result<ProductRequest>> Update(ProductRequestDto productRequest, Guid id);
    }

    public class ProductRequestService : IProductRequestService
    {
        private readonly IUnitOfWork _uow;
        private readonly ILogger<ProductRequestService> _logger;
        public ProductRequestService(IUnitOfWork uow, ILogger<ProductRequestService> logger)
        {
            _uow = uow;
            _logger = logger;
        }
        public ICollection<ProductRequest> GetBaseProductRequests()
        {
           var repo = _uow.GetReadOnlyRepository<ProductRequest>();
            return repo.GetList().ToList();

        }
        public ProductRequest GetDetails(Guid id)
        {
            var repo = _uow.GetRepository<ProductRequest>();
            var productRequestEntity = repo.Single(x => x.Id == id);

            return productRequestEntity;
        }
        public async Task<Result<ProductRequest>> Create(ProductRequestDto productRequest)
        {
            var productRequestEntity = new ProductRequest(productRequest.Generic, productRequest.Brand, productRequest.Comment, productRequest.RequestPriorityId);
            var productRequestRepo = _uow.GetRepositoryAsync<ProductRequest>();
            // TODO: ----- check if the entity is valid -----
            await productRequestRepo.AddAsync(productRequestEntity);
            try
            {
                var result = await this._uow.SaveChangesAsync();
                if (result == 0)
                {
                    return Result.Failure<ProductRequest>("Sorry,an unexpected error has occurred. Please Contact Support If it continues.");
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"----ERROR----{nameof(ProductRequestService)}-{nameof(Create)}----ERROR----");

                return Result.Failure<ProductRequest>("Sorry,an unexpected error has occurred. Please Contact Support If it continues.");
            }
            _uow.GetRepositoryAsync<ProductRequest>();
            return Result.Success(productRequestEntity);
        }


        public async Task<Result<ProductRequest>> Update(ProductRequestDto productRequest, Guid id)
        {
            
            var productRequestRepo = _uow.GetRepositoryAsync<ProductRequest>();
            var productRequestEntity = await productRequestRepo.SingleAsync(x => x.Id == id);

            if (productRequestEntity == null)
            {
                return Result.Failure<ProductRequest>($"id is invalid {id} - product request not found! ");
            }
            productRequestEntity.Modify(productRequest.Generic, productRequest.Brand, productRequest.Comment, productRequest.RequestPriorityId);
            try
            {
                productRequestRepo.Update(productRequestEntity);
                var result = this._uow.SaveChanges();
                if (result == 0)
                {
                    return Result.Failure<ProductRequest>("Sorry,an unexpected error has occurred. Please Contact Support If it continues.");
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"----ERROR----{nameof(ProductRequestService)}-{nameof(Update)}----ERROR----");
                return Result.Failure<ProductRequest>("Sorry,an unexpected error has occurred. Please Contact Support If it continues.");
            }
            return Result.Success(productRequestEntity);
        }


    }
}
