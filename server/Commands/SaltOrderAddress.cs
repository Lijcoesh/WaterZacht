using System.ComponentModel.DataAnnotations;
using WaterZacht.API.Validation;

namespace WaterZacht.API.Commands;

public record SaltOrderAddress
{
    [Length(1, 100)]
    [NoSurroundingWhitespace]
    [NoControlCharacters]
    public required string Street { get; init; }

    [Length(4, 10)]
    [NoSurroundingWhitespace]
    [NoControlCharacters]
    public required string PostalCode { get; init; }

    [Length(1, 100)]
    [NoSurroundingWhitespace]
    [NoControlCharacters]
    public required string City { get; init; }
}
