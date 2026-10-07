namespace WaterZacht.API.Interfaces;

public interface ISaltOrderEmailLimiter
{
    bool TryAcquire(string email);
}
