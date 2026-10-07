using System.Net;

namespace WaterZacht.API.Exceptions;

public abstract class DomainException(string message) : Exception(message)
{
    public abstract HttpStatusCode StatusCode { get; }
}
