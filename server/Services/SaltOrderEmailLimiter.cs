using System.Threading.RateLimiting;
using Microsoft.Extensions.Options;
using WaterZacht.API.Configuration;
using WaterZacht.API.Interfaces;

namespace WaterZacht.API.Services;

public sealed class SaltOrderEmailLimiter : ISaltOrderEmailLimiter, IDisposable
{
    private readonly PartitionedRateLimiter<string> _perEmailLimiter;

    public SaltOrderEmailLimiter(IOptions<RateLimitOptions> options)
    {
        _perEmailLimiter = PartitionedRateLimiter.Create<string, string>(email =>
            RateLimitPartition.GetTokenBucketLimiter(
                email,
                _ => RateLimitOptions.CreateTokenBucket(options.Value.SaltOrderPerEmailPermitLimit, options.Value.SaltOrderPerEmailWindowSeconds)));
    }

    public bool TryAcquire(string email)
    {
        using var lease = _perEmailLimiter.AttemptAcquire(email.ToLowerInvariant());
        return lease.IsAcquired;
    }

    public void Dispose()
    {
        _perEmailLimiter.Dispose();
    }
}
