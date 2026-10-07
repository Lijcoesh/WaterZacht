namespace WaterZacht.API.Tests.Fixtures;

public sealed class FakeHttpMessageHandler(Func<string, CancellationToken, Task<HttpResponseMessage>> respond) : HttpMessageHandler
{
    public FakeHttpMessageHandler(Func<string, HttpResponseMessage> respond)
        : this((body, _) => Task.FromResult(respond(body)))
    {
    }

    public List<string> RequestBodies { get; } = [];

    protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
    {
        var body = request.Content is null ? string.Empty : await request.Content.ReadAsStringAsync(cancellationToken);
        RequestBodies.Add(body);

        return await respond(body, cancellationToken);
    }
}
