using System.ComponentModel.DataAnnotations;

namespace WaterZacht.API.Configuration;

public class MailOptions
{
    [Required]
    [EmailAddress]
    public required string QuoteRequestRecipient { get; set; }

    [Required]
    [EmailAddress]
    public required string SaltOrderRecipient { get; set; }
}
