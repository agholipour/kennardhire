using FluentValidation;
using ProductApproval.GraphQL.Core.Domain;
using System;
using System.Collections.Generic;

namespace ProductApproval.GraphQL.Business.Models
{
    public  class ProductRequestDto
    {
        public int RequestPriorityId { get; set; }
        public string Generic { get; set; }
        public string Brand { get; set; }
        public string Comment { get; set; }

        public ProductRequestDto()
        {
     
        }

    }
    public class ProductRequestValidator : AbstractValidator<ProductRequestDto>
    {
        public ProductRequestValidator()
        {
            RuleFor(d => d.Brand)
                .NotEmpty().WithMessage("Brand field can't be null.")
                .MaximumLength(40).WithMessage("Brand field length should be less than 40 characters.");
            RuleFor(d=>d.Comment)
                .MaximumLength(500).WithMessage("Comment field length should be less than 500 characters.");
            RuleFor(d => d.Generic)
                .NotEmpty().WithMessage("Generic field can't be null")
                .MaximumLength(255).WithMessage("Generic field length should be less than 255 characters.");
            RuleFor(d => d.RequestPriorityId)
                .NotEmpty().WithMessage("Request Priority can't be null");

        }
    }

}
