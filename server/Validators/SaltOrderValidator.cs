using WaterZacht.API.Commands;
using WaterZacht.API.Constants;
using WaterZacht.API.Enums;
using WaterZacht.API.Exceptions;
using WaterZacht.API.Interfaces;

namespace WaterZacht.API.Validators;

public class SaltOrderValidator : ISaltOrderValidator
{
    public void ValidateAdd(AddSaltOrder command)
    {
        if (command.Bags.DistinctBy(b => b.Size).Count() != command.Bags.Count)
            throw new BadRequestException("Each bag size may occur only once");

        if (command.Method == DeliveryMethod.Delivery)
        {
            ValidateDelivery(command);
            return;
        }

        if (command.Address is not null)
            throw new BadRequestException("A pickup order has no address");
    }

    private static void ValidateDelivery(AddSaltOrder command)
    {
        if (command.Address is null)
            throw new BadRequestException("A delivery order needs an address");

        if (!command.Bags.TrueForAll(b => b.Count >= SaltOrderConstants.DeliveryMinimumCounts[b.Size]))
            throw new BadRequestException("A delivery order needs the minimum number of bags for each size");
    }
}
