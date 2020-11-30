using CSharpFunctionalExtensions;
using System.Collections.Generic;
using System.Linq;

namespace ProductApproval.GraphQL.Core.Domain
{
    public class Priority : ValueObject<Priority>
    {
        public static int Low = 3;
        public static int Medium = 2;
        public static int High = 1;

        public static IDictionary<int, Priority> RequestPriorities
            = new Dictionary<int, Priority>
        {
                {Low,new Priority(Low,"Low", true) },
                {Medium,new Priority(Medium,"Medium", true) },
                {High,new Priority(High, "High", true) }
        };
        public int Code { get; private set; }
        public string Description { get; private set; }
        public bool Enabled { get; private set; }
        private Priority() { }
        public Priority(int code, string desc, bool enabled = true)
        {
            Code = code;
            Description = desc;
            Enabled = enabled;
        }
        protected override bool EqualsCore(Priority other)
        {
            return Code == other.Code;
        }

        protected override int GetHashCodeCore()
        {
            unchecked
            {
                int hashCode = Code.GetHashCode();
                hashCode = (hashCode * 397) ^ Description.GetHashCode();
                return hashCode;
            }
        }

        public static implicit operator int(Priority priority)
        {
            return priority.Code;
        }

        public static explicit operator Priority(int priority)
        {
            return Create(priority).Value;
        }
        public static Result<Priority> Create(int code )
        {
           if (!RequestPriorities.ContainsKey(code))
            {
                return Result.Failure<Priority>("Priority code doesn't exists");
            }
            return Result.Ok(RequestPriorities.Single(x => x.Key == code).Value);
        }

    }
}
