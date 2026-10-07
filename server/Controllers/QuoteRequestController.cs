using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using WaterZacht.API.Commands;
using WaterZacht.API.Configuration;
using WaterZacht.API.Interfaces;

namespace WaterZacht.API.Controllers;

[ApiController]
[Route("api/quote-requests")]
public class QuoteRequestController(IQuoteRequestService quoteRequestService) : ControllerBase
{
    [HttpPost]
    [EnableRateLimiting(RateLimitOptions.QuoteRequestPolicy)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status429TooManyRequests)]
    public async Task AddQuoteRequest(AddQuoteRequest command, CancellationToken cancellationToken)
    {
        await quoteRequestService.AddQuoteRequestAsync(command, cancellationToken);
    }
}
