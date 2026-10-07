using WaterZacht.API.Validation;

namespace WaterZacht.API.Configuration;

public class ApiOptions
{
    [CidrNotation]
    public string[] TrustedProxyNetworks { get; set; } = [];
}
