using System.Net;

namespace WaterZacht.API.Exceptions;

public class BadRequestException(string message) : DomainException(message)
{
    public override HttpStatusCode StatusCode => HttpStatusCode.BadRequest;
}
