using System.ComponentModel.DataAnnotations;
using WaterZacht.API.Constants;
using WaterZacht.API.Enums;
using WaterZacht.API.Validation;

namespace WaterZacht.API.Commands;

public record AddSaltOrder
{
    [EnumDataType(typeof(DeliveryMethod))]
    public required DeliveryMethod Method { get; init; }

    [Length(1, SaltOrderConstants.BagSizeCount)]
    [DisallowNullItems]
    public required List<SaltOrderBag> Bags { get; init; }

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

    public required SaltOrderAddress? Address { get; init; }

    [MaxLength(1000)]
    [NoSurroundingWhitespace]
    public required string Note { get; init; }
}
