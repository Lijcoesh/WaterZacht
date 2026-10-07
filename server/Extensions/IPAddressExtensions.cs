using System.Net;
using System.Net.Sockets;

namespace WaterZacht.API.Extensions;

public static class IPAddressExtensions
{
    private const int IPv6PrefixBytes = 8;

    public static string ToRateLimitPartitionKey(this IPAddress? ip)
    {
        if (ip is null)
        {
            throw new InvalidOperationException("The remote IP address is unknown.");
        }

        if (ip.IsIPv4MappedToIPv6)
        {
            ip = ip.MapToIPv4();
        }

        if (ip.AddressFamily != AddressFamily.InterNetworkV6)
        {
            return ip.ToString();
        }

        var bytes = ip.GetAddressBytes();
        Array.Clear(bytes, IPv6PrefixBytes, bytes.Length - IPv6PrefixBytes);
        return $"{new IPAddress(bytes)}/64";
    }
}
