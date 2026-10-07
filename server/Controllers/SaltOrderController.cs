using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using WaterZacht.API.Commands;
using WaterZacht.API.Configuration;
using WaterZacht.API.Interfaces;

namespace WaterZacht.API.Controllers;

[ApiController]
[Route("api/salt-orders")]
public class SaltOrderController(ISaltOrderService saltOrderService) : ControllerBase
{
    [HttpPost]
    [EnableRateLimiting(RateLimitOptions.SaltOrderPolicy)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status429TooManyRequests)]
    public async Task AddSaltOrder(AddSaltOrder command, CancellationToken cancellationToken)
    {
        await saltOrderService.AddSaltOrderAsync(command, cancellationToken);
    }
}
