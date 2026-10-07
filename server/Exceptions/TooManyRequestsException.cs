using System.Net;

namespace WaterZacht.API.Exceptions;

public class TooManyRequestsException(string message) : DomainException(message)
{
    public override HttpStatusCode StatusCode => HttpStatusCode.TooManyRequests;
}
