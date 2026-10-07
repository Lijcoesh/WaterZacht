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
        if (command.Method == DeliveryMethod.Delivery)
        {
            ValidateDelivery(command);
            return;
        }

        if (command.Address is not null)
            throw new BadRequestException("A pickup order has no address");

        if (command.Bags.DistinctBy(b => b.Size).Count() != command.Bags.Count)
            throw new BadRequestException("Each bag size may occur only once");
    }

    private static void ValidateDelivery(AddSaltOrder command)
    {
        if (command.Address is null)
            throw new BadRequestException("A delivery order needs an address");

        if (command.Bags is not [var bag] || !SaltOrderConstants.DeliveryPackages.Contains((bag.Size, bag.Count)))
            throw new BadRequestException("A delivery order must be exactly one of the delivery packages");
    }
}
