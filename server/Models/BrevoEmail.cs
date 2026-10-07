using System.Text.Json.Serialization;

namespace WaterZacht.API.Models;

public record BrevoEmail
{
    public required BrevoEmailAddress Sender { get; init; }

    public required List<BrevoEmailAddress> To { get; init; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public required BrevoEmailAddress? ReplyTo { get; init; }

    public required string Subject { get; init; }

    public required string TextContent { get; init; }
}
