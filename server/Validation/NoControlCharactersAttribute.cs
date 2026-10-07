using System.ComponentModel.DataAnnotations;

namespace WaterZacht.API.Validation;

[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter)]
public sealed class NoControlCharactersAttribute : ValidationAttribute
{
    public NoControlCharactersAttribute()
        : base("The {0} field may not contain line breaks or other control characters.")
    {
    }

    public override bool IsValid(object? value)
    {
        return value switch
        {
            null => true,
            string text => !text.Any(char.IsControl),
            _ => false,
        };
    }
}
