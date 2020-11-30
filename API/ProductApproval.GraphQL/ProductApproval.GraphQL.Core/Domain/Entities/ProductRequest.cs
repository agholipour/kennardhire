using System;
using System.ComponentModel.DataAnnotations;

namespace ProductApproval.GraphQL.Core.Domain
{
    public interface IBase<T>
    {
        [Key]
        public T Id { get; }
    }
    public abstract class BaseEntity : IBase<Guid>
    {

        protected virtual object Actual => this;
        [Key]
        public Guid Id { get; protected internal set; }

        public BaseEntity()
        {
        }

        public override bool Equals(object obj)
        {
            var other = obj as BaseEntity;

            if (other is null)
                return false;

            if (ReferenceEquals(this, other))
                return true;

            if (Actual.GetType() != other.Actual.GetType())
                return false;

            if (Id == Guid.Empty || other.Id == Guid.Empty)
                return false;

            return Id == other.Id;
        }

        public static bool operator ==(BaseEntity a, BaseEntity b)
        {
            if (a is null && b is null)
                return true;

            if (a is null || b is null)
                return false;

            return a.Equals(b);
        }

        public static bool operator !=(BaseEntity a, BaseEntity b)
        {
            return !(a == b);
        }

        public override int GetHashCode()
        {
            return (Actual.GetType().ToString() + Id).GetHashCode();
        }

    }
    

    public class ProductRequest : BaseEntity
    {
        [StringLength(255)]
        [Required]
        public string Generic { get; private set; }
        [Required]
        [StringLength(40)]
        public string Brand { get; private set; }
        [StringLength(500)]
        public string Comment { get; protected internal set; }

        private int _requestPriority;
        public virtual int RequestPriorityId
        {
            get => (Priority)_requestPriority;
            set => _requestPriority = value;
        }
        public ProductRequest(string generic,string brand, string comment,int requestPriorityId)
        {
            this.Modify(generic, brand, comment, requestPriorityId);
        }
        public ProductRequest()
        {

        }

        public void Modify(string generic, string brand, string comment, int requestPriorityId)
        {
            this.Generic = generic;
            this.Brand = brand;
            this.Comment = comment;
            this.RequestPriorityId = requestPriorityId;
        }
    }
}
