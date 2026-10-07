using System.ComponentModel.DataAnnotations;
using WaterZacht.API.Validation;

namespace WaterZacht.API.Commands;

public record AddQuoteRequest
{
    [Length(1, 100)]
    [NoSurroundingWhitespace]
    [NoControlCharacters]
    public required string Name { get; init; }

    [Phone]
    [Length(6, 20)]
    [NoSurroundingWhitespace]
    public required string Phone { get; init; }

    [EmailAddress]
    [MaxLength(254)]
    [NoSurroundingWhitespace]
    [NoControlCharacters]
    public required string Email { get; init; }

    [Length(1, 2000)]
    [NoSurroundingWhitespace]
    public required string Message { get; init; }
}
