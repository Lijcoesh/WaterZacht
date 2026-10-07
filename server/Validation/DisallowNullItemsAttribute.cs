using System.Collections;
using System.ComponentModel.DataAnnotations;

namespace WaterZacht.API.Validation;

[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter)]
public sealed class DisallowNullItemsAttribute : ValidationAttribute
{
    public DisallowNullItemsAttribute()
        : base("The {0} field must not contain null values.")
    {
    }

    public override bool IsValid(object? value)
    {
        if (value is not IEnumerable items)
        {
            return true;
        }

        return items.Cast<object?>().All(item => item is not null);
    }
}
