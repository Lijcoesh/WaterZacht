using WaterZacht.API.Commands;

namespace WaterZacht.API.Interfaces;

public interface IQuoteRequestService
{
    Task AddQuoteRequestAsync(AddQuoteRequest command, CancellationToken cancellationToken);
}
