using Microsoft.Extensions.Options;
using WaterZacht.API.Configuration;
using WaterZacht.API.Services;

namespace WaterZacht.API.Tests.Domain.Services;

public class SaltOrderEmailLimiterTests
{
    private const int PerEmailPermitLimit = 3;
    private const int WindowSeconds = 3600;

    [Fact]
    public void TryAcquire_WithinLimit_ReturnsTrue()
    {
        // Arrange
        using var limiter = CreateLimiter();

        // Act
        var acquired = limiter.TryAcquire("klant@example.com");

        // Assert
        Assert.True(acquired);
    }

    [Fact]
    public void TryAcquire_WithExhaustedLimit_ReturnsFalse()
    {
        // Arrange
        using var limiter = CreateLimiter();
        Exhaust(limiter, "klant@example.com");

        // Act
        var acquired = limiter.TryAcquire("klant@example.com");

        // Assert
        Assert.False(acquired);
    }

    [Fact]
    public void TryAcquire_WithEmailInDifferentCase_SharesLimit()
    {
        // Arrange
        using var limiter = CreateLimiter();
        Exhaust(limiter, "klant@example.com");

        // Act
        var acquired = limiter.TryAcquire("KLANT@example.com");

        // Assert
        Assert.False(acquired);
    }

    [Fact]
    public void TryAcquire_ForOtherEmail_UsesSeparateLimit()
    {
        // Arrange
        using var limiter = CreateLimiter();
        Exhaust(limiter, "klant@example.com");

        // Act
        var acquired = limiter.TryAcquire("ander@example.com");

        // Assert
        Assert.True(acquired);
    }

    private static SaltOrderEmailLimiter CreateLimiter()
    {
        return new SaltOrderEmailLimiter(Options.Create(new RateLimitOptions
        {
            QuoteRequestPermitLimit = 5,
            QuoteRequestWindowSeconds = 3600,
            SaltOrderPermitLimit = 5,
            SaltOrderWindowSeconds = 3600,
            SaltOrderPerEmailPermitLimit = PerEmailPermitLimit,
            SaltOrderPerEmailWindowSeconds = WindowSeconds,
        }));
    }

    private static void Exhaust(SaltOrderEmailLimiter limiter, string email)
    {
        for (var i = 0; i < PerEmailPermitLimit; i++)
        {
            Assert.True(limiter.TryAcquire(email));
        }
    }
}
