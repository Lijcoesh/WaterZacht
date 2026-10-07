using System.ComponentModel.DataAnnotations;
using WaterZacht.API.Constants;

namespace WaterZacht.API.Commands;

public record SaltOrderBag
{
    [AllowedValues(SaltOrderConstants.SmallBagSize, SaltOrderConstants.LargeBagSize)]
    public required int Size { get; init; }

    [Range(1, SaltOrderConstants.MaxBagsPerSize)]
    public required int Count { get; init; }
}
