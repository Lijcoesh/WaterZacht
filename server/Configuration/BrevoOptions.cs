using System.ComponentModel.DataAnnotations;

namespace WaterZacht.API.Configuration;

public class BrevoOptions
{
    [Required]
    [Url]
    public required string BaseUrl { get; set; }

    [Required]
    public required string ApiKey { get; set; }

    [Required]
    [EmailAddress]
    public required string SenderEmail { get; set; }

    [Required]
    public required string SenderName { get; set; }

    [Range(1, 60)]
    public required int AttemptTimeoutSeconds { get; set; }

    [Range(1, 300)]
    public required int TotalTimeoutSeconds { get; set; }

    [Range(1, 10)]
    public required int MaxRetryAttempts { get; set; }

    [Range(1, 60000)]
    public required int RetryBaseDelayMilliseconds { get; set; }
}
