using System.ComponentModel.DataAnnotations;
using System.Threading.RateLimiting;

namespace WaterZacht.API.Configuration;

public class RateLimitOptions
{
    public const string QuoteRequestPolicy = "QuoteRequest";
    public const string SaltOrderPolicy = "SaltOrder";

    public const int MaxPermitLimit = 10_000;

    [Range(1, MaxPermitLimit)]
    public required int QuoteRequestPermitLimit { get; set; }

    [Range(1, int.MaxValue)]
    public required int QuoteRequestWindowSeconds { get; set; }

    [Range(1, MaxPermitLimit)]
    public required int SaltOrderPermitLimit { get; set; }

    [Range(1, int.MaxValue)]
    public required int SaltOrderWindowSeconds { get; set; }

    [Range(1, MaxPermitLimit)]
    public required int SaltOrderPerEmailPermitLimit { get; set; }

    [Range(1, int.MaxValue)]
    public required int SaltOrderPerEmailWindowSeconds { get; set; }

    public static TokenBucketRateLimiterOptions CreateTokenBucket(int permitLimit, int windowSeconds)
    {
        return new TokenBucketRateLimiterOptions
        {
            TokenLimit = permitLimit,
            TokensPerPeriod = 1,

            // niet TimeSpan.FromSeconds(windowSeconds / permitLimit): dat is een integer-deling
            ReplenishmentPeriod = TimeSpan.FromSeconds(windowSeconds) / permitLimit,
            QueueLimit = 0,
        };
    }
}
