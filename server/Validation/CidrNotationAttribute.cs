using System.ComponentModel.DataAnnotations;
using System.Net;

namespace WaterZacht.API.Validation;

[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter)]
public sealed class CidrNotationAttribute : ValidationAttribute
{
    public CidrNotationAttribute()
        : base("The {0} field must contain networks in CIDR notation without host bits (10.0.0.0/8), and no /0.")
    {
    }

    public override bool IsValid(object? value)
    {
        return value switch
        {
            null => true,
            string network => IsValidNetwork(network),
            IEnumerable<string?> networks => networks.All(IsValidNetwork),
            _ => false,
        };
    }

    private static bool IsValidNetwork(string? network)
    {
        return IPNetwork.TryParse(network, out var parsed) && parsed.PrefixLength > 0;
    }
}
