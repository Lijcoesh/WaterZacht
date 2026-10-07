using WaterZacht.API.Commands;

namespace WaterZacht.API.Interfaces;

public interface ISaltOrderService
{
    Task AddSaltOrderAsync(AddSaltOrder command, CancellationToken cancellationToken);
}
